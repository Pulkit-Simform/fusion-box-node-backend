import { Sender } from 'src/common/constant';

export interface ChatMessage {
  sender: Sender;
  message: string;
}
