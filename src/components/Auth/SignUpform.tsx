import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { User } from "@supabase/supabase-js";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GitHub, ExitToApp, Chat } from "@mui/icons-material";

export default function SignUpForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleGitHubSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            fontWeight="bold"
          >
            GitHub Authentication
          </Typography>
          <Divider sx={{ my: 2 }} />
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : user ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.full_name || user.email}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Welcome, {user.user_metadata.full_name || user.email}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Chat />}
                onClick={navigateToChat}
                sx={{ mt: 2 }}
              >
                Go to Chat
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<ExitToApp />}
                onClick={handleSignOut}
                sx={{ mt: 2 }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
                align="center"
              >
                Sign in or sign up using your GitHub account
              </Typography>
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
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
