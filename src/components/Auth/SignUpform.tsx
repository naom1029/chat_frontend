import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { User } from "@supabase/supabase-js";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // React Routerを使用する場合
import { GitHub } from "@mui/icons-material";

const SignUpform: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate(); // React Routerのnavigateを取得

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    fetchSession();
  }, []);

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // サインアウト時にユーザーをnullに設定
  };

  const navigateToChat = () => {
    navigate("/chat"); // チャット画面へ遷移
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 350 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            GitHub Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sign in or sign up using your GitHub account
          </Typography>
          {user ? (
            <div>
              <Typography variant="body1" gutterBottom>
                Welcome, {user.email}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={navigateToChat}
                sx={{ mt: 2 }}
              >
                Go to Chat
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSignOut}
                sx={{ mt: 2 }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<GitHub />}
              onClick={handleGitHubSignIn}
              sx={{ mt: 2 }}
            >
              Sign in with GitHub
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUpform;
