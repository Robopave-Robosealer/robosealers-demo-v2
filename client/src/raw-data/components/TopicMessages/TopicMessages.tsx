import { Box, Button, Paper, ScrollArea } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export type TopicMessagesProps = {
  topic: any;
};

export default function TopicMessages({ topic }: TopicMessagesProps) {
  const [randomArrays, setRandomArrays] = useState<any>([]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const scrollAreaRef = useRef<any>(null);

  useEffect(() => {
    setRandomArrays(topic.messages);
  }, [topic.messages]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        // Generate a random number (adjust the logic as needed)
        const newNumber = Math.floor(Math.random() * 10);

        // Update the state with the new array
        setRandomArrays((prevArrays: any) => [...prevArrays, newNumber]);
      }, 1000);
    }

    // Clean up the interval on component unmount and when paused
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    // Scroll to the bottom of the ScrollArea after each update
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth", // You can adjust this to "auto" or "smooth"
      });
    }
  }, [randomArrays]);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <Paper shadow="md" radius="md" p="md" mb="xl">
      <Button
        rightSection={
          isRunning ? (
            <IconPlayerPause size="1rem" />
          ) : (
            <IconPlayerPlay size="1rem" />
          )
        }
        size="xs"
        color={isRunning ? "red" : "blue"}
        variant="light"
        onClick={handleToggle}
      >
        {isRunning ? "Pause" : "Continue"}
      </Button>

      <ScrollArea
        h="300px"
        type="auto"
        offsetScrollbars
        mt="lg"
        viewportRef={scrollAreaRef}
      >
        {randomArrays.map((message: any, index: number) => (
          <Box key={index} w="100%" bg="blue.1" my="sm" pl="md">
            {message}
          </Box>
        ))}
      </ScrollArea>
    </Paper>
  );
}
