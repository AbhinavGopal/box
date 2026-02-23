import { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

export function NumericalQuestionScreen() {
  const { gameState, submitNumericalAnswers } = useGame();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [winningTeam, setWinningTeam] = useState(null);

  const question = gameState.numericalQuestions.find(q => !q.used);

  const handleAnswerChange = (teamId, value) => {
    setAnswers({ ...answers, [teamId]: value });
  };

  const eligibleTeams = gameState.teams.filter(t => !t.frozenOut);

  const handleSubmit = () => {
    if (!question) return;

    const numericAnswers = {};
    eligibleTeams.forEach(team => {
      numericAnswers[team.id] = parseInt(answers[team.id] || '0', 10);
    });

    const correct = question.answer;
    setCorrectAnswer(correct);

    let closestTeam = eligibleTeams[0];
    let minDiff = Infinity;

    eligibleTeams.forEach(team => {
      const diff = Math.abs(numericAnswers[team.id] - correct);
      if (diff < minDiff) {
        minDiff = diff;
        closestTeam = team;
      }
    });

    setWinningTeam(closestTeam.id);
    setSubmitted(true);
  };

  const handleReady = () => {
    if (winningTeam) {
      submitNumericalAnswers(
        gameState.teams.reduce((acc, team) => {
          acc[team.id] = parseInt(answers[team.id] || '0', 10);
          return acc;
        }, {})
      );
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
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8}>
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
            {gameState.teams.map(team => {
              const isFrozen = team.frozenOut;
              if (isFrozen) {
                return (
                  <HStack key={team.id} w="full" spacing={4} align="center" opacity={0.4}>
                    <Text w="120px" color="gray.500" fontSize="lg" fontWeight="500" m={0}>
                      {team.name}
                    </Text>
                    <Text flex={1} color="red.400" fontSize="sm" fontWeight="500">
                      ❄️ Frozen out
                    </Text>
                  </HStack>
                );
              }
              return (
                <HStack key={team.id} w="full" spacing={4} align="center">
                  <Text w="120px" color="gray.300" fontSize="lg" fontWeight="500" m={0}>
                    {team.name}
                  </Text>
                  <Input
                    type="number"
                    value={answers[team.id] || ''}
                    onChange={(e) => handleAnswerChange(team.id, e.target.value)}
                    disabled={submitted}
                    size="lg"
                    bg="gray.900"
                    borderColor="gray.800"
                    color="white"
                    _hover={{ borderColor: 'gray.700' }}
                    _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)' }}
                    _disabled={{ opacity: 0.5 }}
                    flex={1}
                  />
                  {submitted && (
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color={winningTeam === team.id ? 'green.400' : 'gray.500'}
                      minW="100px"
                    >
                      {winningTeam === team.id ? '✓ Closest!' : ''}
                    </Text>
                  )}
                </HStack>
              );
            })}
          </VStack>

          {submitted && (
            <VStack spacing={4} textAlign="center" w="full">
              <Text fontSize="lg" color="gray.400">Correct Answer:</Text>
              <Text fontSize="5xl" fontWeight="bold" color="green.400">
                {correctAnswer}
              </Text>
              <Text fontSize="xl" color="purple.300" fontWeight="500">
                {gameState.teams.find(t => t.id === winningTeam)?.name} wins this round!
              </Text>
            </VStack>
          )}

          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={eligibleTeams.some(team => !answers[team.id])}
              size="lg"
              w="full"
              colorScheme="purple"
              fontSize="lg"
              fontWeight="600"
              _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
            >
              Submit Answers
            </Button>
          ) : (
            <Button
              onClick={handleReady}
              size="lg"
              w="full"
              colorScheme="green"
              fontSize="lg"
              fontWeight="600"
            >
              Ready for Ordering Question
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
