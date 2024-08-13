"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I am AI product skincare support assistant. How can I help you?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const addMessage = async () => {
    const newUserMessage = { role: "user", content: userInput };
    setMessages((messages) => [...messages, newUserMessage]);

    setUserInput(""); // Clear input immediately after sending the message

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserMessage),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((messages) => [...messages, { role: "assistant", content: data.message }]);
      } else {
        // Handle error if the response is not ok
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      alignItems="center"
    >
      <Stack
  direction={"column"}
  width="500px"
  height="500px"
  border="1px solid black"
  p={2}
  overflow="auto" // This already makes the Stack scrollable, but if you want to specifically target the Box for messages:
>
  <Box
    width="100%" // Ensure the Box takes the full width of the Stack
    height="100%" // Ensure the Box takes the full height of the Stack
    overflowY="auto" // This makes the Box vertically scrollable
  >
    {messages.map((msg, index) => (
      <Box
        key={index}
        display="flex"
        justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
      >
        <Box
          bgcolor={msg.role === "assistant" ? "primary.main" : "secondary.main"}
          color="white"
          borderRadius={16}
          p={2}
          maxWidth="50%"
        >
          {msg.content}
        </Box>
      </Box>
    ))}
  </Box>
</Stack>
      <Stack direction={"row"} spacing={2}>
        <TextField
          label="Type your message"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addMessage}>
          Send Message
        </Button>
      </Stack>
    </Box>
  );
}
