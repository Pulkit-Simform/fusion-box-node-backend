import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TypeORMVectorStore } from '@langchain/community/vectorstores/typeorm';
import { DataSourceOptions } from 'typeorm';
import { logger } from 'src/utils/logger.service';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { AskPolicyReqDTO } from './dto';

@Injectable()
export class LangChainService {
  private llmInstance: ChatOpenAI;
  private postgresConnectionOptions: DataSourceOptions;

  constructor(private configService: ConfigService) {
    this.llmInstance = new ChatOpenAI({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      apiKey: this.configService.get('openAIKey'),
    });

    const dbConfig = this.configService.get('database');

    this.postgresConnectionOptions = {
      type: dbConfig.DB_TYPE,
      host: dbConfig.DB_HOST,
      port: +dbConfig.DB_PORT,
      username: dbConfig.DB_USER,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_NAME,
    };
  }

  private async getTypeORMRetriever() {
    try {
      const typeORMVectorStore = await TypeORMVectorStore.fromDataSource(
        new OpenAIEmbeddings({
          model: 'text-embedding-3-small',
          apiKey: this.configService.get('openAIKey'),
        }),
        { postgresConnectionOptions: this.postgresConnectionOptions },
      );

      await typeORMVectorStore.ensureTableInDatabase();

      return typeORMVectorStore.asRetriever({ k: 6, searchType: 'similarity' });
    } catch (error) {
      logger.error('Error in loading typeorm vector store', { error });
    }
  }

  async getPolicyExplanation(data: AskPolicyReqDTO) {
    const { input } = data;

    const retriever = await this.getTypeORMRetriever();

    const template = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Use three sentences maximum and keep the answer as concise as possible.

    {context}

    Question: {question}

    Helpful Answer:`;

    const customRagPrompt = PromptTemplate.fromTemplate(template);

    const ragChain = await createStuffDocumentsChain({
      llm: this.llmInstance,
      prompt: customRagPrompt,
      outputParser: new StringOutputParser(),
    });

    const context = await retriever.invoke(input);

    const res = await ragChain.invoke({
      question: input,
      context,
    });

    return res;
  }
}
