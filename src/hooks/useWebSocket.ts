import { useEffect, useRef, useState } from "react";
import { Message } from "../types/chat";

// カスタムフックの定義
const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocketの接続を確立
    socketRef.current = new WebSocket(url);

    // 接続が開かれたときの処理
    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    // メッセージを受信したときの処理
    socketRef.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // 接続が閉じられたときの処理
    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    // クリーンアップ関数で接続を閉じる
    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  // メッセージを送信する関数
  const sendMessage = (message: Message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, isConnected, sendMessage };
};

export default useWebSocket;
