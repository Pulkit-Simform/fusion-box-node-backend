import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TypeORMVectorStore } from '@langchain/community/vectorstores/typeorm';
import { DataSourceOptions, Repository } from 'typeorm';
import { logger } from 'src/utils/logger.service';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { User } from 'src/database/entities';
import { ChatMessage } from 'src/core/interfaces/chatHistory';
import {
  ChatHistory,
  QueryType,
} from 'src/database/entities/chat.history.entity';
import {
  defaultPrompts,
  maxAllowedChatHistory,
  Sender,
} from 'src/common/constant';
import { handleError } from 'src/utils/handle.error';

@Injectable()
export class LangChainService {
  private llmInstance: ChatOpenAI;
  private postgresConnectionOptions: DataSourceOptions;

  constructor(
    private readonly configService: ConfigService,
    @Inject('CHAT_HISTORY')
    private readonly chatHistoryRepository: Repository<ChatHistory>,
  ) {
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
      handleError(error);
    }
  }

  async chat(question: string, user: User) {
    try {
      const userChatHistory = await this.chatHistoryRepository.findOneBy({
        user: { id: user.id },
        query_type: QueryType.DOC,
      });
      const chatHistory = userChatHistory?.messages?.map((m) => m.message);

      const qaPrompt = ChatPromptTemplate.fromMessages([
        ['system', defaultPrompts.qaSystemPrompt],
        new MessagesPlaceholder('chatHistory'),
        ['human', '{question}'],
      ]);

      const contextualizedQuestion = (input: Record<string, unknown>) => {
        if ('chatHistory' in input) {
          return this.getContextualizedChain();
        }
        return input.question as any;
      };

      const retriever = await this.getTypeORMRetriever();

      const ragChain = RunnableSequence.from([
        RunnablePassthrough.assign({
          context: (input: Record<string, unknown>) => {
            if ('chatHistory' in input) {
              const chain = contextualizedQuestion(input);
              return chain.pipe(retriever).pipe(formatDocumentsAsString);
            }
            return '';
          },
        }),
        qaPrompt,
        this.llmInstance,
        new StringOutputParser(),
      ]);

      const aiMessage = await ragChain.invoke({ question, chatHistory });

      const newMessages: ChatMessage[] = [
        {
          sender: Sender.HUMAN,
          message: question,
        },
        {
          sender: Sender.SYSTEM,
          message: aiMessage,
        },
      ];

      await this.updateChatHistory(user.id, QueryType.DOC, newMessages);

      return aiMessage;
    } catch (error) {
      logger.error('Error in chat API', { error });
      handleError(error);
    }
  }

  private getContextualizedChain() {
    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ['system', defaultPrompts.contextualizeQSystemPrompt],
      new MessagesPlaceholder('chatHistory'),
      ['human', '{question}'],
    ]);

    return contextualizeQPrompt
      .pipe(this.llmInstance)
      .pipe(new StringOutputParser());
  }

  async updateChatHistory(
    userId: number,
    queryType: QueryType,
    newMessages: ChatMessage[],
  ) {
    try {
      const chatHistory = await this.chatHistoryRepository.findOneBy({
        user: { id: userId },
        query_type: queryType,
      });

      chatHistory.messages.push(...newMessages);
      chatHistory.messages = chatHistory.messages.slice(-maxAllowedChatHistory);

      await this.chatHistoryRepository.save(chatHistory);
    } catch (error) {
      logger.error('Error while updating chat history', { error });
      handleError(error);
    }
  }

  async getChatHistory(userId: number, queryType: QueryType) {
    try {
      return await this.chatHistoryRepository.findOneBy({
        user: { id: userId },
        query_type: queryType,
      });
    } catch (error) {
      logger.error('Error in get chat history', { error });
      handleError(error);
    }
  }

  async deleteChatHistory(userId: number) {
    try {
      return await this.chatHistoryRepository.update(
        { user: { id: userId } },
        { messages: [] },
      );
    } catch (error) {
      logger.error('Error in delete chat history', { error });
      handleError(error);
    }
  }
}
