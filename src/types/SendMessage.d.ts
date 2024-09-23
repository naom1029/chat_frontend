// サーバーに送るメッセージの構造体
export interface SendMessage {
  type: "Command" | "Chat";
  command?: string;
  args?: string;
  text?: string;
}

export interface ClientChatMessage {
  text: string;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}
