import React, { useState, useEffect } from "react";
import { Box, Button, Center, Container, Text, VStack, useToast } from "@chakra-ui/react";
import { FaHandPointer } from "react-icons/fa";

const Index = () => {
  const [gameState, setGameState] = useState("waiting"); // waiting, ready, started
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (gameState === "ready") {
      timer = setTimeout(
        () => {
          setGameState("started");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // 1-3 seconds
    }

    return () => clearTimeout(timer);
  }, [gameState]);

  const handleClick = () => {
    if (gameState === "waiting") {
      setGameState("ready");
      toast({
        title: "Get ready!",
        description: "Wait for the color to change, then click as fast as you can!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else if (gameState === "started") {
      setEndTime(Date.now());
      setGameState("waiting");
    } else {
      // false start
      toast({
        title: "Too soon!",
        description: "You clicked too early! Wait for the color to change before clicking.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setGameState("waiting");
    }
  };

  const resetGame = () => {
    setGameState("waiting");
    setStartTime(null);
    setEndTime(null);
  };

  const reactionTime = endTime && startTime ? endTime - startTime : null;

  return (
    <Container centerContent>
      <VStack spacing={8} mt={16}>
        <Text fontSize="xl" fontWeight="bold">
          Reaction Time Test
        </Text>
        <Center w="300px" h="300px" bg={gameState === "started" ? "green.400" : gameState === "ready" ? "red.400" : "gray.200"} borderRadius="md" onClick={handleClick} cursor="pointer">
          {gameState === "waiting" && <FaHandPointer size="3em" />}
          {gameState === "ready" && <Text fontSize="2xl">Wait for Green</Text>}
          {gameState === "started" && <Text fontSize="2xl">Click!</Text>}
        </Center>
        {reactionTime !== null && (
          <Box>
            <Text fontSize="lg">Your reaction time:</Text>
            <Text fontSize="3xl" fontWeight="bold">
              {reactionTime} ms
            </Text>
          </Box>
        )}
        <Button colorScheme="blue" onClick={resetGame}>
          Try Again
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
