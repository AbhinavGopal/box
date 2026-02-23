import { createContext, useContext, useState } from 'react';
import { gameData } from '../data/gameData';
import { generateGrid } from '../utils/gridGenerator';

const GameContext = createContext(undefined);

function buildBoxState(id, boxData) {
  const realWords = [...boxData.realWords];
  const decoys = [...boxData.decoys];
  const wildcards = (boxData.wildcards || []).map(w => ({ ...w }));

  return {
    id,
    category: boxData.category,
    phrase: [...boxData.phrase],
    status: 'locked',
    realWords,
    decoys,
    wildcards,
    gridItems: generateGrid(realWords, decoys, wildcards),
    revealedNumbers: new Set(),
    revealedWords: new Map(),
    selectedWords: Array(boxData.phrase.length).fill(''),
    wrongSelections: [],
    removedDecoys: [],
  };
}

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    teams: [],
    boxes: [],
    superbox: {
      id: 'superbox',
      category: 'Super Box',
      phrase: [],
      status: 'locked',
      realWords: [],
      decoys: [],
      wildcards: [],
      gridItems: [],
      revealedNumbers: new Set(),
      revealedWords: new Map(),
      selectedWords: [],
      wrongSelections: [],
      removedDecoys: [],
    },
    currentPhase: 'setup',
    currentBoxId: null,
    currentTeamId: null,
    numericalQuestions: gameData.numericalQuestions,
    orderingQuestions: gameData.orderingQuestions,
    turnsRemaining: 0,
    wildcardAction: null,
  });

  const initializeGame = (teamNames) => {
    const teams = teamNames.map((name, idx) => ({
      id: `team-${idx}`,
      name,
      boxesWon: [],
      frozenOut: false,
    }));

    const boxes = gameData.boxes.map((boxData, idx) => buildBoxState(`box-${idx}`, boxData));

    setGameState({
      ...gameState,
      teams,
      boxes,
      superbox: {
        ...gameState.superbox,
        ...buildBoxState('superbox', gameData.superbox),
      },
      currentPhase: 'main',
    });
  };

  const startBox = (boxId) => {
    // Check if superbox can be played (need 2 boxes won)
    if (boxId === 'superbox') {
      const boxesWon = gameState.boxes.filter(b => b.status === 'won').length;
      if (boxesWon < 2 || gameState.superbox.status === 'won') {
        return;
      }
    }

    const box = boxId === 'superbox'
      ? gameState.superbox
      : gameState.boxes.find(b => b.id === boxId);
    if (!box) return;

    // Unlock box and reset frozen out status
    const updatedBoxes = boxId !== 'superbox'
      ? gameState.boxes.map(b =>
        b.id === boxId ? { ...b, status: 'unlocked' } : b
      )
      : gameState.boxes;

    const updatedTeams = gameState.teams.map(team => ({ ...team, frozenOut: false }));

    setGameState({
      ...gameState,
      boxes: updatedBoxes,
      teams: updatedTeams,
      currentBoxId: boxId,
      currentPhase: 'numerical',
      currentTeamId: null,
      turnsRemaining: 0,
    });
  };

  const submitNumericalAnswers = (answers) => {
    const question = gameState.numericalQuestions.find(q => !q.used);
    if (!question) return;

    const correctAnswer = question.answer;

    // Find closest team (excluding frozen out teams)
    const eligibleTeams = gameState.teams.filter(t => !t.frozenOut);
    let closestTeam = eligibleTeams[0];
    let minDiff = Infinity;

    eligibleTeams.forEach(team => {
      const diff = Math.abs(answers[team.id] - correctAnswer);
      if (diff < minDiff) {
        minDiff = diff;
        closestTeam = team;
      }
    });

    // Mark question as used
    const updatedQuestions = gameState.numericalQuestions.map(q =>
      q.id === question.id ? { ...q, used: true } : q
    );

    setGameState({
      ...gameState,
      numericalQuestions: updatedQuestions,
      currentTeamId: closestTeam.id,
      currentPhase: 'ready',
    });
  };

  const submitOrdering = (order) => {
    const box = gameState.boxes.find(b => b.id === gameState.currentBoxId);
    if (!box) return;

    const question = gameState.orderingQuestions.find(q => !q.used);
    if (!question) return;

    const correctOrder = question.correctOrder;
    let correctCount = 0;

    order.forEach((item, idx) => {
      if (item === correctOrder[idx]) correctCount++;
    });

    let turnsEarned = 0;
    if (correctCount === 4) turnsEarned = 3;
    else if (correctCount === 2) turnsEarned = 2;
    else if (correctCount === 1) turnsEarned = 1;

    // Mark question as used
    const updatedQuestions = gameState.orderingQuestions.map(q =>
      q.id === question.id ? { ...q, used: true } : q
    );

    if (turnsEarned > 0) {
      setGameState({
        ...gameState,
        orderingQuestions: updatedQuestions,
        turnsRemaining: gameState.turnsRemaining + turnsEarned,
        currentPhase: 'reveal',
      });
    } else {
      // Back to numerical question
      setGameState({
        ...gameState,
        orderingQuestions: updatedQuestions,
        currentPhase: 'numerical',
        currentTeamId: null,
      });
    }
  };

  const revealNumber = (number, word) => {
    const box = gameState.currentBoxId
      ? gameState.boxes.find(b => b.id === gameState.currentBoxId) || gameState.superbox
      : null;
    if (!box || gameState.turnsRemaining <= 0) return;

    const wildcard = box.wildcards.find(w => w.number === number);

    if (wildcard) {
      // Handle wildcard
      // REMOVE_DECOY doesn't need user interaction - handle it immediately
      if (wildcard.type === 'REMOVE_DECOY') {
        // Use the pre-generated gridItems to find unrevealed decoys
        const unrevealedDecoyItems = (box.gridItems || []).filter(item =>
          item.type === 'decoy' &&
          !box.revealedNumbers.has(item.number) &&
          !(box.removedDecoys || []).includes(item.content) &&
          item.number !== number
        );

        if (unrevealedDecoyItems.length > 0) {
          // Pick a random unrevealed decoy to remove
          const decoyToRemove = unrevealedDecoyItems[Math.floor(Math.random() * unrevealedDecoyItems.length)];

          // Remove the decoy from the array and mark both numbers as revealed
          if (gameState.currentBoxId === 'superbox') {
            setGameState({
              ...gameState,
              turnsRemaining: gameState.turnsRemaining - 1,
              superbox: {
                ...gameState.superbox,
                decoys: gameState.superbox.decoys.filter(d => d !== decoyToRemove.content),
                revealedNumbers: new Set([...gameState.superbox.revealedNumbers, number, decoyToRemove.number]),
                revealedWords: new Map([...gameState.superbox.revealedWords, [decoyToRemove.number, decoyToRemove.content]]),
                removedDecoys: [...gameState.superbox.removedDecoys, decoyToRemove.content],
              },
              wildcardAction: {
                type: 'REMOVE_DECOY',
                removedDecoy: {
                  number: decoyToRemove.number,
                  word: decoyToRemove.content,
                },
              },
              currentPhase: 'wildcard_action',
            });
          } else {
            setGameState({
              ...gameState,
              turnsRemaining: gameState.turnsRemaining - 1,
              boxes: gameState.boxes.map(b =>
                b.id === box.id
                  ? {
                    ...b,
                    decoys: b.decoys.filter(d => d !== decoyToRemove.content),
                    revealedNumbers: new Set([...b.revealedNumbers, number, decoyToRemove.number]),
                    revealedWords: new Map([...b.revealedWords, [decoyToRemove.number, decoyToRemove.content]]),
                    removedDecoys: [...b.removedDecoys, decoyToRemove.content],
                  }
                  : b
              ),
              wildcardAction: {
                type: 'REMOVE_DECOY',
                removedDecoy: {
                  number: decoyToRemove.number,
                  word: decoyToRemove.content,
                },
              },
              currentPhase: 'wildcard_action',
            });
          }
        } else {
          // No unrevealed decoys, just mark the wildcard number as revealed
          if (gameState.currentBoxId === 'superbox') {
            setGameState({
              ...gameState,
              turnsRemaining: gameState.turnsRemaining - 1,
              superbox: {
                ...gameState.superbox,
                revealedNumbers: new Set([...gameState.superbox.revealedNumbers, number]),
              },
              wildcardAction: { type: 'REMOVE_DECOY' },
              currentPhase: 'wildcard_action',
            });
          } else {
            setGameState({
              ...gameState,
              turnsRemaining: gameState.turnsRemaining - 1,
              boxes: gameState.boxes.map(b =>
                b.id === box.id
                  ? {
                    ...b,
                    revealedNumbers: new Set([...b.revealedNumbers, number]),
                  }
                  : b
              ),
              wildcardAction: { type: 'REMOVE_DECOY' },
              currentPhase: 'wildcard_action',
            });
          }
        }
        return;
      }

      // Other wildcards need user interaction
      const updatedBoxes = gameState.currentBoxId === 'superbox'
        ? gameState.boxes
        : gameState.boxes.map(b =>
          b.id === box.id
            ? { ...b, revealedNumbers: new Set([...b.revealedNumbers, number]) }
            : b
        );

      const updatedSuperbox = gameState.currentBoxId === 'superbox'
        ? {
          ...gameState.superbox,
          revealedNumbers: new Set([...gameState.superbox.revealedNumbers, number]),
        }
        : gameState.superbox;

      setGameState({
        ...gameState,
        turnsRemaining: gameState.turnsRemaining - 1,
        boxes: updatedBoxes,
        superbox: updatedSuperbox,
        wildcardAction: { type: wildcard.type },
        currentPhase: 'wildcard_action',
      });
    } else if (word) {
      // Reveal word (handled in RevealScreen component)
      const isDecoy = box.decoys.includes(word);
      const updatedBoxes = gameState.currentBoxId !== 'superbox'
        ? gameState.boxes.map(b =>
          b.id === box.id
            ? {
              ...b,
              revealedNumbers: new Set([...b.revealedNumbers, number]),
              revealedWords: new Map([...b.revealedWords, [number, word]]),
            }
            : b
        )
        : gameState.boxes;

      const updatedSuperbox = gameState.currentBoxId === 'superbox'
        ? {
          ...gameState.superbox,
          revealedNumbers: new Set([...gameState.superbox.revealedNumbers, number]),
          revealedWords: new Map([...gameState.superbox.revealedWords, [number, word]]),
        }
        : gameState.superbox;

      setGameState({
        ...gameState,
        boxes: updatedBoxes,
        superbox: updatedSuperbox,
        turnsRemaining: isDecoy ? gameState.turnsRemaining - 1 : gameState.turnsRemaining,
      });
    }
  };

  const selectWord = (word) => {
    const box = gameState.currentBoxId
      ? gameState.boxes.find(b => b.id === gameState.currentBoxId) || gameState.superbox
      : null;
    if (!box) return;

    const targetIndex = box.phrase.indexOf(word);

    if (targetIndex !== -1) {
      if (box.selectedWords[targetIndex]) return;

      const updatedSelectedWords = [...box.selectedWords];
      updatedSelectedWords[targetIndex] = word;

      const updatedBoxes = gameState.currentBoxId !== 'superbox'
        ? gameState.boxes.map(b =>
          b.id === box.id ? { ...b, selectedWords: updatedSelectedWords } : b
        )
        : gameState.boxes;

      const updatedSuperbox = gameState.currentBoxId === 'superbox'
        ? { ...gameState.superbox, selectedWords: updatedSelectedWords }
        : gameState.superbox;

      const currentBox = gameState.currentBoxId === 'superbox'
        ? updatedSuperbox
        : updatedBoxes.find(b => b.id === box.id);

      const allFilled = currentBox && currentBox.selectedWords.every(Boolean);
      if (allFilled) {
        const matches = currentBox.selectedWords.every((selected, idx) => selected === currentBox.phrase[idx]);
        if (matches) {
          winBox(gameState.currentTeamId);
          return;
        }
      }

      setGameState({
        ...gameState,
        boxes: updatedBoxes,
        superbox: updatedSuperbox,
      });
      return;
    }

    if (box.wrongSelections.includes(word)) return;

    const updatedBoxes = gameState.currentBoxId !== 'superbox'
      ? gameState.boxes.map(b =>
        b.id === box.id ? { ...b, wrongSelections: [...b.wrongSelections, word] } : b
      )
      : gameState.boxes;

    const updatedSuperbox = gameState.currentBoxId === 'superbox'
      ? { ...gameState.superbox, wrongSelections: [...gameState.superbox.wrongSelections, word] }
      : gameState.superbox;

    setGameState({
      ...gameState,
      boxes: updatedBoxes,
      superbox: updatedSuperbox,
    });
  };

  const handleWildcard = (wildcardType, data) => {
    let updatedState = { ...gameState };

    switch (wildcardType) {
      case 'EXTRA_TURN':
        updatedState.turnsRemaining += 1;
        updatedState.wildcardAction = null;
        updatedState.currentPhase = 'reveal';
        break;

      case 'REMOVE_DECOY':
        // This should never be called here since REMOVE_DECOY is handled immediately in revealNumber
        // But just in case, handle it
        updatedState.wildcardAction = null;
        updatedState.currentPhase = 'reveal';
        break;

      case 'WHOS_NEXT':
        // Pass control to selected team
        if (data?.nextTeamId) {
          updatedState.currentTeamId = data.nextTeamId;
          updatedState.turnsRemaining = 0; // End current turn
          updatedState.wildcardAction = null;
          updatedState.currentPhase = 'ordering'; // They need to earn turns
        }
        break;

      case 'STEAL':
        if (data?.teamId && data?.boxId) {
          // Steal box from team
          const stolenBox = gameState.boxes.find(b => b.id === data.boxId);
          if (stolenBox) {
            updatedState.boxes = gameState.boxes.map(b =>
              b.id === data.boxId ? { ...b, wonBy: gameState.currentTeamId } : b
            );
            updatedState.teams = gameState.teams.map(team => {
              if (team.id === data.teamId) {
                return { ...team, boxesWon: team.boxesWon.filter(bid => bid !== data.boxId) };
              }
              if (team.id === gameState.currentTeamId) {
                return { ...team, boxesWon: [...team.boxesWon, data.boxId] };
              }
              return team;
            });
          }
        }
        updatedState.wildcardAction = null;
        updatedState.currentPhase = 'reveal'; // Turn continues
        break;

      case 'FREEZE_OUT':
        if (data?.teamId) {
          updatedState.teams = gameState.teams.map(team =>
            team.id === data.teamId ? { ...team, frozenOut: true } : team
          );
        }
        updatedState.wildcardAction = null;
        updatedState.currentPhase = 'reveal'; // Turn continues
        break;

      case 'PRIZE_PASS':
        if (data?.fromTeamId && data?.toTeamId) {
          const fromTeam = gameState.teams.find(t => t.id === data.fromTeamId);
          if (fromTeam && fromTeam.boxesWon.length > 0) {
            const boxToMove = fromTeam.boxesWon[0];
            updatedState.boxes = gameState.boxes.map(b =>
              b.id === boxToMove ? { ...b, wonBy: data.toTeamId } : b
            );
            updatedState.teams = gameState.teams.map(team => {
              if (team.id === data.fromTeamId) {
                return { ...team, boxesWon: team.boxesWon.filter(bid => bid !== boxToMove) };
              }
              if (team.id === data.toTeamId) {
                return { ...team, boxesWon: [...team.boxesWon, boxToMove] };
              }
              return team;
            });
          }
        }
        // Turn ends
        updatedState.turnsRemaining = 0;
        updatedState.wildcardAction = null;
        updatedState.currentPhase = 'ordering';
        break;

      case 'PRIZE_FIGHT':
        if (data?.opponentId) {
          // Current team's turn ends, opponent gets control
          updatedState.currentTeamId = data.opponentId;
          updatedState.turnsRemaining = 0;
          updatedState.wildcardAction = null;
          updatedState.currentPhase = 'ordering';
        }
        break;
    }

    updatedState.wildcardAction = null;
    if (updatedState.currentPhase === 'reveal') {
      updatedState.currentPhase = 'reveal';
    }

    setGameState(updatedState);
  };

  const winBox = (teamId) => {
    const box = gameState.currentBoxId
      ? gameState.boxes.find(b => b.id === gameState.currentBoxId) || gameState.superbox
      : null;
    if (!box) return;

    const updatedBoxes = gameState.currentBoxId !== 'superbox'
      ? gameState.boxes.map(b =>
        b.id === box.id
          ? { ...b, status: 'won', wonBy: teamId }
          : b
      )
      : gameState.boxes;

    const updatedSuperbox = gameState.currentBoxId === 'superbox'
      ? { ...gameState.superbox, status: 'won', wonBy: teamId }
      : gameState.superbox;

    const updatedTeams = gameState.teams.map(team =>
      team.id === teamId
        ? { ...team, boxesWon: [...team.boxesWon, gameState.currentBoxId] }
        : team
    );

    setGameState({
      ...gameState,
      boxes: updatedBoxes,
      superbox: updatedSuperbox,
      teams: updatedTeams,
      currentPhase: 'celebration',
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        initializeGame,
        startBox,
        submitNumericalAnswers,
        submitOrdering,
        revealNumber,
        selectWord,
        handleWildcard,
        winBox,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

