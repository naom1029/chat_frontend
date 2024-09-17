import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // 1秒遅延を追加
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const searchParams = new URLSearchParams(location.hash.slice(1));
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Error setting session:", error);
          setError("Failed to authenticate. Please try again.");
        } else {
          // Successfully authenticated
          navigate("/");
        }
      } else {
        setError(
          "No authentication tokens found. Please try signing in again."
        );
      }
      setLoading(false); // 処理が終わったらローディングを解除
    };

    handleAuthCallback();
  }, [location, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={50} />
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Authenticating...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1">
          <a href="/">Return to sign in</a>
        </Typography>
      </Box>
    );
  }

  return null; // 何も表示しない
}
