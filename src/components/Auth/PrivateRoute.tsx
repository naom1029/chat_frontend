import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // sessionが存在すればtrue
      setLoading(false); // 認証チェック完了
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 認証チェック中の表示
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // ユーザーが未認証の場合はリダイレクト
  }

  return children; // 認証済みの場合は子コンポーネントを表示
};

export default PrivateRoute;
