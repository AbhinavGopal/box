import { useGame } from '../context/GameContext';
import { useState } from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';

const categoryEmojis = {
  'Tennis': '🎾',
  'Makeup': '💄',
  'Dogs': '🐕',
  'Cooking Appliances': '🍳',
  'Singing': '🎤',
  'Pasta': '🍝',
};

export function StandingsButton() {
  const { gameState } = useGame();
  const [open, setOpen] = useState(false);

  if (!gameState.teams || gameState.teams.length === 0) return null;

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        position="fixed"
        top={4}
        right={4}
        zIndex={1000}
        variant="ghost"
        bg="gray.900"
        color="white"
        borderWidth="1px"
        borderColor="gray.700"
        fontSize="sm"
        fontWeight="500"
        _hover={{ bg: 'gray.800' }}
      >
        Standings
      </Button>

      {open && (
        <Box
          position="fixed"
          top={16}
          right={4}
          zIndex={1000}
          bg="gray.900"
          borderWidth="1px"
          borderColor="gray.700"
          borderRadius="lg"
          p={4}
          minW="280px"
          maxW="400px"
          boxShadow="xl"
        >
          <HStack justify="space-between" mb={3}>
            <Text fontSize="lg" fontWeight="600" color="white">
              Standings
            </Text>
            <Button size="xs" variant="ghost" color="gray.400" onClick={() => setOpen(false)}>
              ✕
            </Button>
          </HStack>
          <VStack spacing={3} align="stretch">
            {gameState.teams.map(team => (
              <Box
                key={team.id}
                p={3}
                bg="gray.800"
                borderRadius="md"
                borderWidth="1px"
                borderColor={team.id === gameState.currentTeamId ? 'purple.500' : 'gray.700'}
              >
                <HStack justify="space-between">
                  <Text fontSize="md" fontWeight="600" color="white">
                    {team.name}
                    {team.frozenOut && ' ❄️'}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {team.boxesWon.length} box{team.boxesWon.length !== 1 ? 'es' : ''}
                  </Text>
                </HStack>
                {team.boxesWon.length > 0 && (
                  <HStack spacing={1} mt={1}>
                    {team.boxesWon.map(boxId => {
                      const box = gameState.boxes.find(b => b.id === boxId);
                      return box ? (
                        <Text key={boxId} fontSize="lg" title={box.category}>
                          {categoryEmojis[box.category] || '📦'}
                        </Text>
                      ) : null;
                    })}
                  </HStack>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
}



