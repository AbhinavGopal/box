import { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
} from '@chakra-ui/react';

export function SetupScreen() {
  const { initializeGame } = useGame();
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(['', '']);

  const handleNumTeamsChange = (num) => {
    setNumTeams(num);
    setTeamNames(Array(num).fill('').map((_, i) => teamNames[i] || ''));
  };

  const handleTeamNameChange = (index, name) => {
    const updated = [...teamNames];
    updated[index] = name;
    setTeamNames(updated);
  };

  const handleStart = () => {
    if (teamNames.every(name => name.trim())) {
      initializeGame(teamNames.map(name => name.trim()));
    }
  };

  return (
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8}>
      <Container maxW="2xl" centerContent>
        <VStack spacing={12} w="full">
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="300"
              letterSpacing="tight"
              fontFamily="serif"
            >
              What's in the Box?
            </Heading>
            <Text fontSize="lg" color="gray.400" fontWeight="300">
              Set up your teams
            </Text>
          </VStack>

          <VStack spacing={8} w="full" maxW="md">
            <VStack spacing={4} w="full" align="stretch">
              <Text fontSize="sm" color="gray.400" fontWeight="500">
                Number of Teams
              </Text>
              <HStack spacing={3} justify="center">
                {[2, 3, 4, 5, 6].map(num => (
                  <Button
                    key={num}
                    onClick={() => handleNumTeamsChange(num)}
                    size="lg"
                    variant={numTeams === num ? 'solid' : 'outline'}
                    colorScheme={numTeams === num ? 'purple' : 'gray'}
                    borderColor="gray.700"
                    _hover={{
                      borderColor: 'gray.600',
                      bg: numTeams === num ? 'purple.600' : 'gray.800',
                    }}
                    minW="60px"
                    fontSize="xl"
                    fontWeight="600"
                  >
                    {num}
                  </Button>
                ))}
              </HStack>
            </VStack>

            <VStack spacing={4} w="full">
              <Text fontSize="sm" color="gray.400" fontWeight="500" alignSelf="flex-start">
                Team Names
              </Text>
              {teamNames.map((name, index) => (
                <Input
                  key={index}
                  value={name}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  placeholder={`Team ${index + 1}`}
                  size="lg"
                  bg="gray.900"
                  borderColor="gray.800"
                  color="white"
                  _hover={{ borderColor: 'gray.700' }}
                  _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)' }}
                />
              ))}
            </VStack>

            <Button
              onClick={handleStart}
              disabled={!teamNames.every(name => name.trim())}
              size="lg"
              w="full"
              colorScheme="purple"
              fontSize="lg"
              fontWeight="600"
              _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Start Game
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
