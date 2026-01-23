import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

export function ReadyScreen() {
  const { gameState, setGameState } = useGame();
  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeamId);

  const handleReady = () => {
    setGameState({
      ...gameState,
      currentPhase: 'ordering',
    });
  };

  return (
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8}>
      <Container maxW="2xl" centerContent>
        <VStack spacing={12} textAlign="center">
          <VStack spacing={4}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="300"
              letterSpacing="tight"
              color="white"
            >
              {currentTeam?.name} won the numerical question!
            </Heading>
            <Text fontSize="xl" color="gray.400" fontWeight="300">
              Get ready for the ordering question...
            </Text>
          </VStack>
          <Button
            onClick={handleReady}
            size="xl"
            px={16}
            py={8}
            fontSize="2xl"
            fontWeight="600"
            colorScheme="purple"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            Ready!
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
