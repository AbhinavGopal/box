import { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';

export function OrderingQuestionScreen() {
  const { gameState, submitOrdering } = useGame();
  const [order, setOrder] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [turnsEarned, setTurnsEarned] = useState(0);
  const [correctOrder, setCorrectOrder] = useState([]);

  const question = gameState.orderingQuestions.find(q => !q.used);

  // Initialize available items when question loads
  if (!availableItems.length && question) {
    setAvailableItems([...question.items].sort(() => Math.random() - 0.5));
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    
    if (order.includes(item)) return;
    
    const newOrder = [...order];
    newOrder[index] = item;
    setOrder(newOrder.filter(Boolean));
  };

  const removeFromOrder = (item) => {
    setOrder(order.filter(i => i !== item));
  };

  const handleSubmit = () => {
    if (!question) return;

    const correct = question.correctOrder;
    setCorrectOrder(correct);

    let correctCount = 0;
    order.forEach((item, idx) => {
      if (item === correct[idx]) correctCount++;
    });

    let turns = 0;
    if (correctCount === 4) turns = 3;
    else if (correctCount === 2) turns = 2;
    else if (correctCount === 1) turns = 1;

    setTurnsEarned(turns);
    setSubmitted(true);
  };

  const handleContinue = () => {
    if (turnsEarned > 0) {
      submitOrdering(order);
    } else {
      submitOrdering([]);
    }
  };

  if (!question) {
    return (
      <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
        <Text color="white">No more questions available</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="black" p={8} display="flex" alignItems="center" justifyContent="center">
      <Container maxW="4xl" centerContent>
        <VStack spacing={10} w="full">
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="300"
            textAlign="center"
            letterSpacing="tight"
            color="white"
          >
            {question.question}
          </Heading>

          <VStack spacing={6} w="full">
            <Text fontSize="md" color="gray.400" fontWeight="500" alignSelf="flex-start">
              Drag items to order:
            </Text>
            <SimpleGrid columns={4} spacing={4} w="full">
              {order.map((item, idx) => (
                <Box
                  key={`${item}-${idx}`}
                  p={4}
                  bg="purple.900"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="purple.700"
                  textAlign="center"
                  fontWeight="600"
                  color="white"
                  cursor="move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => removeFromOrder(item)}
                  position="relative"
                  _hover={{ bg: 'purple.800', transform: 'scale(1.02)' }}
                  transition="all 0.2s"
                >
                  {item}
                  <Button
                    size="xs"
                    position="absolute"
                    top={1}
                    right={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromOrder(item);
                    }}
                    colorScheme="red"
                    variant="ghost"
                  >
                    ×
                  </Button>
                </Box>
              ))}
              {Array(4 - order.length).fill(null).map((_, idx) => (
                <Box
                  key={`empty-${idx}`}
                  p={4}
                  minH="80px"
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor="gray.700"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, order.length + idx)}
                  _hover={{ borderColor: 'gray.600' }}
                  transition="all 0.2s"
                >
                  Drop here
                </Box>
              ))}
            </SimpleGrid>

            <HStack spacing={3} flexWrap="wrap" w="full">
              {availableItems.filter(item => !order.includes(item)).map((item, idx) => (
                <Badge
                  key={idx}
                  p={3}
                  bg="gray.800"
                  borderRadius="lg"
                  color="white"
                  fontSize="md"
                  fontWeight="500"
                  cursor="move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  _hover={{ bg: 'gray.700', transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                >
                  {item}
                </Badge>
              ))}
            </HStack>
          </VStack>

          {submitted && (
            <VStack spacing={4} w="full" textAlign="center">
              <Text fontSize="lg" color="gray.400">Correct Order:</Text>
              <HStack spacing={2} justify="center" flexWrap="wrap">
                {correctOrder.map((item, idx) => (
                  <Badge
                    key={idx}
                    p={3}
                    fontSize="md"
                    fontWeight="600"
                    colorScheme={order[idx] === item ? 'green' : 'red'}
                  >
                    {item}
                  </Badge>
                ))}
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="purple.300">
                {turnsEarned > 0
                  ? `You earned ${turnsEarned} turn${turnsEarned > 1 ? 's' : ''}!`
                  : 'No turns earned. Back to numerical question.'}
              </Text>
            </VStack>
          )}

          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={order.length !== 4}
              size="lg"
              w="full"
              colorScheme="purple"
              fontSize="lg"
              fontWeight="600"
              _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
            >
              Submit Order
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              size="lg"
              w="full"
              colorScheme="green"
              fontSize="lg"
              fontWeight="600"
            >
              Continue
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
