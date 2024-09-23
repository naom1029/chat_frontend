// サーバーに送るメッセージの構造体
export interface SendMessage {
  type: "Command" | "Chat";
  command?: string;
  args?: string;
  text?: string; // Chatの場合はtextプロパティを直接持つ
}

export interface ClientChatMessage {
  text: string;
}

// サーバーから受信するメッセージの構造体
export interface ReceiveMessage {
  id: string;

  text: string;

  // Add other properties as needed
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}
