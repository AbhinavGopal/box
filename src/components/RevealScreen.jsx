import { useGame } from '../context/GameContext';
import { getGridLayout } from '../utils/gridGenerator';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';

export function RevealScreen() {
  const { gameState, revealNumber, selectWord, setGameState } = useGame();
  const [localRevealed, setLocalRevealed] = useState(new Set());
  const [localWords, setLocalWords] = useState(new Map());

  const box = gameState.currentBoxId
    ? gameState.boxes.find(b => b.id === gameState.currentBoxId) || gameState.superbox
    : null;

  const gridItems = box?.gridItems || [];

  const gridLayout = getGridLayout();

  // Reset local state when box changes
  useEffect(() => {
    setLocalRevealed(new Set());
    setLocalWords(new Map());
  }, [gameState.currentBoxId]);

  const handleNumberClick = (number) => {
    if (gameState.turnsRemaining <= 0 || localRevealed.has(number)) return;

    // Don't allow clicking already revealed numbers
    if (box.revealedNumbers && box.revealedNumbers.has(number)) return;

    const item = gridItems.find(i => i.number === number);
    if (!item) return;

    setLocalRevealed(new Set([...localRevealed, number]));

    if (item.type === 'wildcard') {
      revealNumber(number);
    } else if (item.type === 'word' || item.type === 'decoy') {
      const word = item.content;
      setLocalWords(new Map([...localWords, [number, word]]));
      revealNumber(number, word);
    }
  };

  const handleWordClick = (word) => {
    selectWord(word);
  };

  const getRevealedWord = (number) => {
    return localWords.get(number) || box?.revealedWords.get(number) || null;
  };

  const isRevealed = (number) => {
    return localRevealed.has(number) || box?.revealedNumbers.has(number) || false;
  };

  if (!box) return null;

  const allRevealedWords = new Set([
    ...Array.from(localWords.values()),
    ...Array.from(box.revealedWords.values()),
  ]);
  const revealedWordsList = Array.from(allRevealedWords);

  return (
    <Box minH="100vh" bg="black" p={8}>
      <Container maxW="7xl">
        <HStack spacing={8} align="flex-start" w="full">
          {/* Left side - Category and word blanks */}
          <VStack spacing={6} w="300px" flexShrink={0}>
            <VStack spacing={3} textAlign="center" w="full">
              <Heading
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="300"
                letterSpacing="tight"
                color="purple.300"
              >
                {box.category}
              </Heading>
              <Text fontSize="lg" color="gray.400" fontWeight="300">
                Find the 3-word phrase
              </Text>
            </VStack>

            {/* Word blanks */}
            <VStack spacing={4} w="full">
              <Text fontSize="sm" color="gray.500" fontWeight="500" textTransform="uppercase" letterSpacing="wide">
                Selected Words
              </Text>
              {box.phrase.map((_, idx) => {
                const selectedWord = box.selectedWords[idx] || '';
                const isFilled = Boolean(selectedWord);

                return (
                  <Box
                    key={idx}
                    w="full"
                    h="60px"
                    borderWidth="2px"
                    borderColor={isFilled ? 'green.500' : 'gray.700'}
                    borderRadius="lg"
                    bg={isFilled ? 'green.900' : 'gray.900'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={4}
                  >
                    {selectedWord ? (
                      <Text
                        fontSize="lg"
                        fontWeight="600"
                        color="green.200"
                        textAlign="center"
                      >
                        {selectedWord}
                      </Text>
                    ) : (
                      <Text fontSize="lg" color="gray.600" fontWeight="300">
                        _
                      </Text>
                    )}
                  </Box>
                );
              })}
            </VStack>

            <VStack spacing={2} w="full" pt={4}>
              <Text fontSize="xl" color="purple.300" fontWeight="500">
                Turns: <Text as="span" fontWeight="bold" color="white">{gameState.turnsRemaining}</Text>
              </Text>
              <Text fontSize="md" color="gray.400">
                {gameState.teams.find(t => t.id === gameState.currentTeamId)?.name}'s turn
              </Text>
            </VStack>
          </VStack>

          {/* Right side - Grid and revealed words */}
          <VStack spacing={6} flex={1}>

            {/* Number Grid */}
            <VStack spacing={4} w="full">
              {gridLayout.map((row, rowIdx) => (
                <HStack key={rowIdx} spacing={4} justify="center" flexWrap="wrap">
                  {row.map(num => {
                    const item = gridItems.find(i => i.number === num);
                    // Don't show numbers that have been revealed (wildcards disappear after being used)
                    if (!item) return null;

                    const revealed = isRevealed(num);
                    const word = getRevealedWord(num);

                    // Hide revealed wildcards completely
                    if (revealed && item.type === 'wildcard') {
                      return null;
                    }

                    let bgColor = 'gray.800';
                    let borderColor = 'gray.700';
                    if (revealed) {
                      if (item?.type === 'wildcard') {
                        bgColor = 'yellow.600';
                        borderColor = 'yellow.500';
                      } else if (item?.type === 'decoy') {
                        bgColor = 'red.900';
                        borderColor = 'red.800';
                      } else {
                        bgColor = 'green.600';
                        borderColor = 'green.500';
                      }
                    }

                    return (
                      <Button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        disabled={revealed || gameState.turnsRemaining <= 0}
                        size="lg"
                        w={{ base: "120px", md: "140px" }}
                        h={{ base: "80px", md: "100px" }}
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        bg={bgColor}
                        borderWidth="2px"
                        borderColor={borderColor}
                        color="white"
                        _hover={!revealed && gameState.turnsRemaining > 0 ? { transform: 'scale(1.1)', bg: 'gray.700' } : {}}
                        _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                        transition="all 0.2s"
                        px={2}
                        whiteSpace="normal"
                        wordBreak="break-word"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                      >
                        {revealed ? (
                          item?.type === 'wildcard' ? (
                            <Text fontSize={{ base: "xs", md: "sm" }} textAlign="center" color="white">{item.content}</Text>
                          ) : word ? (
                            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="white">{word}</Text>
                          ) : (
                            <Text color="white">{num}</Text>
                          )
                        ) : (
                          <Text color="white">{num}</Text>
                        )}
                      </Button>
                    );
                  })}
                </HStack>
              ))}
            </VStack>

            {/* Revealed Words */}
            {revealedWordsList.length > 0 && (
              <Box w="full" p={6} bg="gray.900" borderRadius="xl" borderWidth="1px" borderColor="gray.800">
                <VStack spacing={4} align="stretch">
                  <Heading fontSize="lg" fontWeight="500" color="white">
                    Click a word to add it to the phrase
                  </Heading>
                  <HStack spacing={3} flexWrap="wrap">
                    {revealedWordsList.map((word, idx) => {
                      const filledCount = box.selectedWords.filter(Boolean).length;
                      const isPhraseWord = box.phrase.includes(word);
                      const isSelected = box.selectedWords.includes(word);
                      const isWrongSelection = box.wrongSelections.includes(word);
                      const canSelectPhrase = isPhraseWord && !isSelected && filledCount < box.phrase.length;
                      const canSelectDecoy = !isPhraseWord && !isWrongSelection;
                      const canSelectWord = canSelectPhrase || canSelectDecoy;

                      return (
                        <Button
                          key={idx}
                          onClick={() => handleWordClick(word)}
                          disabled={!canSelectWord}
                          size="md"
                          bg={isSelected ? 'green.600' : isWrongSelection ? 'gray.800' : 'black'}
                          color="white"
                          borderWidth={isSelected ? '0' : '1px'}
                          borderColor="gray.700"
                          fontWeight="600"
                          _hover={canSelectWord ? { bg: 'gray.800', color: 'white' } : {}}
                          _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
                        >
                          {word}
                          {isSelected ? ' ✓' : ''}
                        </Button>
                      );
                    })}
                  </HStack>
                </VStack>
              </Box>
            )}

            {/* Need More Turns */}
            {gameState.turnsRemaining === 0 && (
              <Button
                onClick={() => {
                  setGameState({
                    ...gameState,
                    currentPhase: 'ordering',
                  });
                }}
                size="lg"
                colorScheme="purple"
                fontSize="lg"
                fontWeight="600"
                w="full"
              >
                Get More Turns
              </Button>
            )}
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
