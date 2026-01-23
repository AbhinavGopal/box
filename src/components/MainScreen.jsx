import { useGame } from '../context/GameContext';
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Text,
  Badge,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
} from '@chakra-ui/react';

const categoryEmojis = {
  'Tennis': '🎾',
  'Makeup': '💄',
  'Dogs': '🐕',
  'Cooking Appliances': '🍳',
  'Singing': '🎤',
  'Pasta': '🍝',
};

export function MainScreen() {
  const { gameState, startBox } = useGame();

  const handleBoxClick = (boxId) => {
    if (boxId === 'superbox') {
      const boxesWon = gameState.boxes.filter(b => b.status === 'won').length;
      if (boxesWon >= 2 && gameState.superbox.status !== 'won') {
        startBox('superbox');
      }
      return;
    }

    const box = gameState.boxes.find(b => b.id === boxId);
    if (box && (box.status === 'locked' || box.status === 'unlocked')) {
      startBox(boxId);
    }
  };

  return (
    <Box minH="100vh" bg="black" p={8}>
      <Container maxW="7xl">
        <HStack justify="space-between" mb={12} align="center">
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="300"
            letterSpacing="tight"
            fontFamily="serif"
          >
            What's in the Box?
          </Heading>
          <DialogRoot>
            <DialogTrigger>
              <Button
                variant="ghost"
                colorScheme="gray"
                size="lg"
                fontSize="sm"
                fontWeight="500"
              >
                Standings
              </Button>
            </DialogTrigger>
            <DialogContent bg="gray.900" borderColor="gray.800" borderWidth="1px" maxW="xl">
              <DialogHeader fontSize="2xl" fontWeight="300">Current Standings</DialogHeader>
              <DialogCloseTrigger />
              <DialogBody pb={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {gameState.teams.map(team => (
                    <Box
                      key={team.id}
                      p={4}
                      bg="gray.800"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="gray.700"
                    >
                      <Text fontSize="lg" fontWeight="600" mb={3} color="white">
                        {team.name}
                      </Text>
                      <HStack spacing={2} flexWrap="wrap">
                        {team.boxesWon.map(boxId => {
                          const box = gameState.boxes.find(b => b.id === boxId);
                          return box ? (
                            <Badge
                              key={boxId}
                              fontSize="2xl"
                              bg="transparent"
                              color="white"
                              title={box.category}
                            >
                              {categoryEmojis[box.category] || '📦'}
                            </Badge>
                          ) : null;
                        })}
                        {team.boxesWon.length === 0 && (
                          <Text fontSize="sm" color="gray.500">No boxes yet</Text>
                        )}
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </DialogBody>
            </DialogContent>
          </DialogRoot>
        </HStack>

        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6} mb={12}>
          {gameState.boxes.map((box, idx) => (
            <Box
              key={box.id}
              as="button"
              onClick={() => handleBoxClick(box.id)}
              disabled={box.status === 'won'}
              aspectRatio={1}
              borderRadius="xl"
              p={8}
              bg={box.status === 'won' ? 'green.900' : box.status === 'unlocked' ? 'purple.900' : 'gray.900'}
              borderWidth={box.status === 'locked' ? '2px' : '0'}
              borderColor="purple.600"
              _hover={box.status !== 'won' ? { transform: 'scale(1.02)', borderColor: 'purple.500' } : {}}
              _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {box.status === 'won' ? (
                <VStack spacing={3}>
                  <Text fontSize="6xl">{categoryEmojis[box.category] || '📦'}</Text>
                  <Text fontSize="xl" fontWeight="600" color="white">
                    {box.category}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Won by {gameState.teams.find(t => t.id === box.wonBy)?.name}
                  </Text>
                </VStack>
              ) : box.status === 'unlocked' ? (
                <VStack spacing={3}>
                  <Text fontSize="6xl">{categoryEmojis[box.category] || '📦'}</Text>
                  <Text fontSize="xl" fontWeight="600" color="white">
                    {box.category}
                  </Text>
                </VStack>
              ) : (
                <VStack spacing={3}>
                  <Text fontSize="6xl">📦</Text>
                  <Text fontSize="md" color="gray.400" fontWeight="500">
                    Box {idx + 1}
                  </Text>
                </VStack>
              )}
            </Box>
          ))}
        </SimpleGrid>

        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => handleBoxClick('superbox')}
            disabled={gameState.superbox.status === 'won' || gameState.boxes.filter(b => b.status === 'won').length < 2}
            size="xl"
            px={16}
            py={10}
            fontSize="2xl"
            fontWeight="600"
            colorScheme={gameState.superbox.status === 'won' ? 'green' : 'yellow'}
            bg={gameState.superbox.status === 'won' ? 'green.900' : gameState.boxes.filter(b => b.status === 'won').length < 2 ? 'gray.800' : 'yellow.600'}
            color={gameState.boxes.filter(b => b.status === 'won').length < 2 ? 'gray.500' : 'black'}
            _hover={gameState.boxes.filter(b => b.status === 'won').length >= 2 && gameState.superbox.status !== 'won' ? { transform: 'scale(1.05)', bg: 'yellow.500' } : {}}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
            transition="all 0.2s"
          >
            <VStack spacing={2}>
              <Text fontSize="4xl">{gameState.superbox.status === 'won' ? categoryEmojis[gameState.superbox.category] : '🏆'}</Text>
              <Text>Super Box</Text>
              {gameState.boxes.filter(b => b.status === 'won').length < 2 && (
                <Text fontSize="sm" opacity={0.7}>Need 2 boxes won</Text>
              )}
            </VStack>
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
