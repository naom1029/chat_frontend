// サーバーに送るメッセージの構造体
export interface SendMessage {
  text: string;
}

// サーバーから受信するメッセージの構造体
export interface ReceiveMessage {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}
