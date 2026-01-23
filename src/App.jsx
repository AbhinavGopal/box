import { GameProvider, useGame } from './context/GameContext';
import { SetupScreen } from './components/SetupScreen';
import { MainScreen } from './components/MainScreen';
import { NumericalQuestionScreen } from './components/NumericalQuestionScreen';
import { ReadyScreen } from './components/ReadyScreen';
import { OrderingQuestionScreen } from './components/OrderingQuestionScreen';
import { RevealScreen } from './components/RevealScreen';
import { WildcardActionScreen } from './components/WildcardActionScreen';
import { CelebrationScreen } from './components/CelebrationScreen';

function GameRouter() {
  const { gameState } = useGame();

  switch (gameState.currentPhase) {
    case 'setup':
      return <SetupScreen />;
    case 'main':
      return <MainScreen />;
    case 'numerical':
      return <NumericalQuestionScreen />;
    case 'ready':
      return <ReadyScreen />;
    case 'ordering':
      return <OrderingQuestionScreen />;
    case 'reveal':
      return <RevealScreen />;
    case 'wildcard_action':
      return <WildcardActionScreen />;
    case 'celebration':
      return <CelebrationScreen />;
    default:
      return <SetupScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;

