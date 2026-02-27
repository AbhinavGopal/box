import { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

export function SuperboxSelectionScreen() {
  const { gameState, setGameState, beginSuperbox } = useGame();
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  const eligibleTeams = gameState.teams.filter(t => !t.eliminated);

  const toggleTeam = (teamId) => {
    setSelectedTeamIds(prev => {
      if (prev.includes(teamId)) {
        return prev.filter(id => id !== teamId);
      }
      if (prev.length >= 2) return prev;
      return [...prev, teamId];
    });
  };

  const handleConfirm = () => {
    if (selectedTeamIds.length === 2) {
      beginSuperbox(selectedTeamIds);
    }
  };

  const handleBack = () => {
    setGameState({
      ...gameState,
      currentPhase: 'main',
      currentBoxId: null,
    });
  };

  return (
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8}>
      <Container maxW="xl" centerContent>
        <VStack spacing={8} w="full">
          <VStack spacing={2} textAlign="center">
            <Text fontSize="6xl">🏆</Text>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="300"
              letterSpacing="tight"
              color="yellow.400"
            >
              Super Box
            </Heading>
            <Text fontSize="lg" color="gray.400" fontWeight="300">
              Select the 2 teams that will compete for the Super Box
            </Text>
          </VStack>

          <VStack spacing={4} w="full">
            {eligibleTeams.map(team => {
              const isSelected = selectedTeamIds.includes(team.id);
              return (
                <Button
                  key={team.id}
                  onClick={() => toggleTeam(team.id)}
                  size="lg"
                  w="full"
                  variant={isSelected ? 'solid' : 'outline'}
                  colorScheme={isSelected ? 'yellow' : 'gray'}
                  bg={isSelected ? 'yellow.600' : 'transparent'}
                  color={isSelected ? 'black' : 'white'}
                  borderWidth="2px"
                  borderColor={isSelected ? 'yellow.500' : 'gray.600'}
                  _hover={{
                    borderColor: isSelected ? 'yellow.400' : 'gray.500',
                    bg: isSelected ? 'yellow.500' : 'gray.800',
                  }}
                >
                  {team.name}
                  {isSelected && ' ✓'}
                </Button>
              );
            })}
          </VStack>

          <Text fontSize="sm" color="gray.500">
            {selectedTeamIds.length}/2 teams selected
          </Text>

          <VStack spacing={4} w="full">
            <Button
              onClick={handleConfirm}
              disabled={selectedTeamIds.length !== 2}
              size="lg"
              w="full"
              colorScheme="yellow"
              color="black"
              fontSize="lg"
              fontWeight="600"
              _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
            >
              Start Super Box
            </Button>
            <Button
              onClick={handleBack}
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
            >
              Back
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
