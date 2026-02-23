import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Text,
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

  const nextBoxIndex = gameState.boxes.findIndex(b => b.status !== 'won');

  const isBoxClickable = (idx, box) => {
    if (box.status === 'won') return false;
    return idx === nextBoxIndex;
  };

  const handleBoxClick = (boxId, idx) => {
    if (boxId === 'superbox') {
      const boxesWon = gameState.boxes.filter(b => b.status === 'won').length;
      if (boxesWon >= 2 && gameState.superbox.status !== 'won') {
        startBox('superbox');
      }
      return;
    }

    const box = gameState.boxes.find(b => b.id === boxId);
    if (box && isBoxClickable(idx, box)) {
      startBox(boxId);
    }
  };

  return (
    <Box minH="100vh" bg="black" p={8}>
      <Container maxW="7xl">
        <Heading
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="300"
          letterSpacing="tight"
          fontFamily="serif"
          mb={12}
        >
          What's in the Box?
        </Heading>

        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6} mb={12}>
          {gameState.boxes.map((box, idx) => (
            <Box
              key={box.id}
              as="button"
              onClick={() => handleBoxClick(box.id, idx)}
              disabled={!isBoxClickable(idx, box)}
              aspectRatio={1}
              borderRadius="xl"
              p={8}
              bg={box.status === 'won' ? 'green.900' : isBoxClickable(idx, box) ? 'purple.900' : 'gray.900'}
              borderWidth={box.status === 'locked' ? '2px' : '0'}
              borderColor="purple.600"
              _hover={isBoxClickable(idx, box) ? { transform: 'scale(1.02)', borderColor: 'purple.500' } : {}}
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
              ) : isBoxClickable(idx, box) ? (
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
