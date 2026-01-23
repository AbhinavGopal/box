import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

const categoryEmojis = {
  'Tennis': '🎾',
  'Makeup': '💄',
  'Dogs': '🐕',
  'Cooking Appliances': '🍳',
  'Singing': '🎤',
  'Pasta': '🍝',
};

export function CelebrationScreen() {
  const { gameState, setGameState } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);

  const box = gameState.currentBoxId
    ? gameState.boxes.find(b => b.id === gameState.currentBoxId) || gameState.superbox
    : null;

  const winningTeam = gameState.teams.find(t => t.id === box?.wonBy);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setGameState({
      ...gameState,
      currentPhase: 'main',
      currentBoxId: null,
      currentTeamId: null,
      turnsRemaining: 0,
    });
  };

  if (!box || !winningTeam) return null;

  return (
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8} position="relative" overflow="hidden">
      {showConfetti && (
        <Box position="absolute" inset={0} pointerEvents="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <Text
              key={i}
              position="absolute"
              left={`${Math.random() * 100}%`}
              top={`${Math.random() * 100}%`}
              fontSize="2xl"
              animation="bounce 2s infinite"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
            </Text>
          ))}
        </Box>
      )}

      <Container maxW="3xl" centerContent position="relative" zIndex={10}>
        <VStack spacing={8} textAlign="center">
          <Text
            fontSize="8xl"
            animation="bounce 1s infinite"
          >
            {categoryEmojis[box.category] || '📦'}
          </Text>
          <VStack spacing={3}>
            <Heading
              fontSize={{ base: '4xl', md: '5xl' }}
              fontWeight="300"
              letterSpacing="tight"
              color="white"
            >
              {winningTeam.name} Wins!
            </Heading>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="300"
              color="purple.300"
            >
              {box.category} Box
            </Heading>
          </VStack>
          <Text fontSize="xl" color="gray.400" fontWeight="300">
            The phrase was:{' '}
            <Text as="span" fontWeight="bold" color="white">
              {box.phrase.join(' ')}
            </Text>
          </Text>
          <Button
            onClick={handleContinue}
            size="xl"
            px={12}
            py={8}
            fontSize="2xl"
            fontWeight="600"
            colorScheme="purple"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            Continue
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
