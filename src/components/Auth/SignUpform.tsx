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
import { useUserStore } from "../../store/userStore";

export default function SignUpForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, loading } = useUserStore();

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    useUserStore.getState().setUser(null);
  };

  const navigateToChat = () => {
    navigate("/chat");
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
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
