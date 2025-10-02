import { Text, HStack, Box } from "@chakra-ui/react";
import useTypingIndicator from "../Custom_hooks/useTypingIndicator";

// CSS keyframes as a string
const blinkAnimation = `
  @keyframes blink {
    0%, 20% { opacity: 0; }
    50% { opacity: 1; }
    80%, 100% { opacity: 0; }
  }
`;

const TypingIndicator = () => {
  const typingUsers = useTypingIndicator();

  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].nickname} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].nickname} and ${typingUsers[1].nickname} are typing...`;
    } else {
      return `${typingUsers[0].nickname} and ${
        typingUsers.length - 1
      } others are typing...`;
    }
  };

  return (
    <>
      <style>{blinkAnimation}</style>
      <HStack spacing={2} px={4} py={2} alignSelf="flex-start">
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          {getTypingText()}
        </Text>
        <HStack spacing={0}>
          <Box
            as="span"
            fontSize="lg"
            color="gray.500"
            sx={{
              animation: "blink 1.4s linear infinite",
              animationDelay: "0s",
            }}
          >
            .
          </Box>
          <Box
            as="span"
            fontSize="lg"
            color="gray.500"
            sx={{
              animation: "blink 1.4s linear infinite",
              animationDelay: "0.2s",
            }}
          >
            .
          </Box>
          <Box
            as="span"
            fontSize="lg"
            color="gray.500"
            sx={{
              animation: "blink 1.4s linear infinite",
              animationDelay: "0.4s",
            }}
          >
            .
          </Box>
        </HStack>
      </HStack>
    </>
  );
};

export default TypingIndicator;
