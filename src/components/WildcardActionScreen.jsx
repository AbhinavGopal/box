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

export function WildcardActionScreen() {
  const { gameState, handleWildcard } = useGame();
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedBox, setSelectedBox] = useState('');

  const wildcard = gameState.wildcardAction;
  if (!wildcard) return null;

  const handleConfirm = () => {
    let data = {};

    switch (wildcard.type) {
      case 'STEAL':
        if (!selectedTeam || !selectedBox) {
          console.log('STEAL: missing team or box', { selectedTeam, selectedBox });
          return;
        }
        data = { teamId: selectedTeam, boxId: selectedBox };
        break;
      case 'FREEZE_OUT':
        if (!selectedTeam) {
          console.log('FREEZE_OUT: missing team', { selectedTeam });
          return;
        }
        data = { teamId: selectedTeam };
        break;
      case 'PRIZE_PASS':
        if (!selectedTeam || !selectedBox) {
          console.log('PRIZE_PASS: missing team or box', { selectedTeam, selectedBox });
          return;
        }
        data = { fromTeamId: selectedTeam, toTeamId: selectedBox };
        break;
      case 'PRIZE_FIGHT':
        if (!selectedTeam) {
          console.log('PRIZE_FIGHT: missing team', { selectedTeam });
          return;
        }
        data = { opponentId: selectedTeam };
        break;
      case 'WHOS_NEXT':
        console.log('WHOS_NEXT: selectedTeam =', selectedTeam, 'type =', typeof selectedTeam);
        if (!selectedTeam || selectedTeam === '') {
          console.log('WHOS_NEXT: missing team', { selectedTeam });
          return;
        }
        data = { nextTeamId: selectedTeam };
        break;
      case 'EXTRA_TURN':
      case 'REMOVE_DECOY':
        // These don't need confirmation, but handle them anyway
        handleWildcard(wildcard.type, {});
        return;
    }

    console.log('Calling handleWildcard with:', wildcard.type, data);
    handleWildcard(wildcard.type, data);
  };

  const getWildcardTitle = (type) => {
    switch (type) {
      case 'STEAL': return 'STEAL';
      case 'EXTRA_TURN': return 'EXTRA TURN';
      case 'FREEZE_OUT': return 'FREEZE OUT';
      case 'PRIZE_PASS': return 'PRIZE PASS';
      case 'REMOVE_DECOY': return 'REMOVE DECOY';
      case 'PRIZE_FIGHT': return 'PRIZE FIGHT';
      case 'WHOS_NEXT': return "WHO'S NEXT";
      default: return 'WILDCARD';
    }
  };

  const getWildcardDescription = (type) => {
    switch (type) {
      case 'STEAL': return 'Take a prize from another team';
      case 'EXTRA_TURN': return 'You earned an extra turn!';
      case 'FREEZE_OUT': return 'Prevent a team from competing for this box';
      case 'PRIZE_PASS': return 'Move a prize from one team to another';
      case 'REMOVE_DECOY': return 'A decoy has been removed from the grid!';
      case 'PRIZE_FIGHT': return 'Challenge another team for control';
      case 'WHOS_NEXT': return 'Control passes to the next team';
      default: return '';
    }
  };

  const teamsWithBoxes = gameState.teams.filter(t => t.boxesWon.length > 0);
  // Exclude current team, and for WHO'S NEXT / PRIZE_FIGHT / FREEZE_OUT also exclude frozen teams
  const otherTeams = gameState.teams.filter(t => {
    if (t.id === gameState.currentTeamId) return false;
    if (t.frozenOut && (wildcard.type === 'WHOS_NEXT' || wildcard.type === 'PRIZE_FIGHT' || wildcard.type === 'FREEZE_OUT')) return false;
    return true;
  });

  return (
    <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center" p={8}>
      <Container maxW="2xl" centerContent>
        <VStack spacing={8} textAlign="center" w="full">
          <Text fontSize="6xl">🎴</Text>
          <VStack spacing={2}>
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="300"
              letterSpacing="tight"
              color="yellow.400"
            >
              {getWildcardTitle(wildcard.type)}
            </Heading>
            <Text fontSize="lg" color="gray.400" fontWeight="300">
              {getWildcardDescription(wildcard.type)}
            </Text>
          </VStack>

          {(wildcard.type === 'EXTRA_TURN' || wildcard.type === 'REMOVE_DECOY') && (
            <VStack spacing={4} w="full">
              {wildcard.type === 'REMOVE_DECOY' && wildcard.removedDecoy && (
                <Box
                  w="full"
                  p={4}
                  borderWidth="1px"
                  borderColor="red.700"
                  bg="red.950"
                  borderRadius="lg"
                >
                  <Text fontSize="sm" color="red.200" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
                    Removed Decoy
                  </Text>
                  <Text fontSize="lg" color="white" fontWeight="600">
                    #{wildcard.removedDecoy.number} — {wildcard.removedDecoy.word}
                  </Text>
                </Box>
              )}
              <Button
                onClick={() => handleWildcard(wildcard.type, {})}
                size="lg"
                w="full"
                colorScheme="purple"
                fontSize="lg"
                fontWeight="600"
              >
                Continue
              </Button>
            </VStack>
          )}

          {(wildcard.type === 'STEAL' || wildcard.type === 'PRIZE_PASS') && (
            <VStack spacing={4} w="full">
              <VStack spacing={2} w="full" align="stretch">
                <Text color="gray.300" fontSize="sm" fontWeight="500">
                  Select team:
                </Text>
                <Box
                  as="select"
                  value={selectedTeam}
                  onChange={(e) => {
                    setSelectedTeam(e.target.value);
                    setSelectedBox('');
                  }}
                  bg="gray.900"
                  borderColor="gray.800"
                  borderWidth="1px"
                  borderRadius="md"
                  color="white"
                  px={4}
                  py={3}
                  fontSize="md"
                  _hover={{ borderColor: 'gray.700' }}
                  _focus={{ borderColor: 'purple.500', outline: 'none' }}
                >
                  <option value="">Choose a team...</option>
                  {teamsWithBoxes.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.boxesWon.length} box{team.boxesWon.length !== 1 ? 'es' : ''})
                    </option>
                  ))}
                </Box>
              </VStack>

              {selectedTeam && wildcard.type === 'STEAL' && (
                <VStack spacing={2} w="full" align="stretch">
                  <Text color="gray.300" fontSize="sm" fontWeight="500">
                    Select box to steal:
                  </Text>
                  <Box
                    as="select"
                    value={selectedBox}
                    onChange={(e) => setSelectedBox(e.target.value)}
                    bg="gray.900"
                    borderColor="gray.800"
                    borderWidth="1px"
                    borderRadius="md"
                    color="white"
                    px={4}
                    py={3}
                    fontSize="md"
                    _hover={{ borderColor: 'gray.700' }}
                    _focus={{ borderColor: 'purple.500', outline: 'none' }}
                  >
                    <option value="">Choose a box...</option>
                    {gameState.boxes
                      .filter(b => b.wonBy === selectedTeam)
                      .map(box => (
                        <option key={box.id} value={box.id}>
                          {box.category}
                        </option>
                      ))}
                  </Box>
                </VStack>
              )}

              {selectedTeam && wildcard.type === 'PRIZE_PASS' && (
                <VStack spacing={2} w="full" align="stretch">
                  <Text color="gray.300" fontSize="sm" fontWeight="500">
                    Select destination team:
                  </Text>
                  <Box
                    as="select"
                    value={selectedBox}
                    onChange={(e) => setSelectedBox(e.target.value)}
                    bg="gray.900"
                    borderColor="gray.800"
                    borderWidth="1px"
                    borderRadius="md"
                    color="white"
                    px={4}
                    py={3}
                    fontSize="md"
                    _hover={{ borderColor: 'gray.700' }}
                    _focus={{ borderColor: 'purple.500', outline: 'none' }}
                  >
                    <option value="">Choose a team...</option>
                    {gameState.teams
                      .filter(t => t.id !== selectedTeam)
                      .map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </Box>
                </VStack>
              )}
            </VStack>
          )}

          {(wildcard.type === 'FREEZE_OUT' || wildcard.type === 'PRIZE_FIGHT' || wildcard.type === 'WHOS_NEXT') && (
            <VStack spacing={2} w="full" align="stretch">
              <Text color="gray.300" fontSize="sm" fontWeight="500">
                {wildcard.type === 'WHOS_NEXT' ? 'Select team to continue:' : 'Select team:'}
              </Text>
              <Box
                as="select"
                value={selectedTeam}
                onChange={(e) => {
                  const value = e.target.value;
                  console.log('Select onChange:', value);
                  setSelectedTeam(value);
                }}
                bg="gray.900"
                borderColor="gray.800"
                borderWidth="1px"
                borderRadius="md"
                color="white"
                px={4}
                py={3}
                fontSize="md"
                _hover={{ borderColor: 'gray.700' }}
                _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)', outline: 'none' }}
              >
                <option value="">Choose a team...</option>
                {otherTeams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Box>
            </VStack>
          )}

          <Button
            onClick={handleConfirm}
            disabled={
              (wildcard.type === 'STEAL' && (!selectedTeam || !selectedBox)) ||
              (wildcard.type === 'PRIZE_PASS' && (!selectedTeam || !selectedBox)) ||
              ((wildcard.type === 'FREEZE_OUT' || wildcard.type === 'PRIZE_FIGHT' || wildcard.type === 'WHOS_NEXT') && (!selectedTeam || selectedTeam === ''))
            }
            size="lg"
            w="full"
            colorScheme="purple"
            fontSize="lg"
            fontWeight="600"
            _disabled={{ opacity: 0.4, cursor: 'not-allowed' }}
          >
            Confirm {wildcard.type === 'WHOS_NEXT' && selectedTeam && `(${selectedTeam})`}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
