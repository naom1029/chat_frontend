import { useEffect, useRef, useState } from "react";
import { ReceiveMessage, SendMessage } from "../types/message";

// カスタムフックの定義
const useWebSocket = (url: string, room: string | null) => {
  const [messages, setMessages] = useState<ReceiveMessage[]>([]);
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
      const message: ReceiveMessage = JSON.parse(event.data);
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
  useEffect(() => {
    setMessages([]);
  }, [room]);

  // メッセージを送信する関数
  const sendMessage = (message: SendMessage) => {
    if (socketRef.current && isConnected) {
      console.log(JSON.stringify(message));
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, isConnected, sendMessage };
};

export default useWebSocket;
