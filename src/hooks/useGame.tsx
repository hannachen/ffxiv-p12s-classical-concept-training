import {useState, useContext, createContext} from 'react';
import {DebuffsProps} from '../components/Debuffs';
import {Result} from '../components/Results';
import {Strategy} from '../utils/types';
import {defaultAssignments} from '../components/PositionAssignments';

export const enum GameStatus {
  Inactive = 'inactive',
  Playing = 'playing',
  ShowResult = 'showResult',
}

export interface GameState {
  status: GameStatus;
  debuffs: DebuffsProps;
  shapes: string[][];
  answers: string[];
  strategy: Strategy;
  startTime?: number;
  result?: Result;
  debug?: boolean;
}

export interface GameContextType {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

export const GameContext = createContext<GameContextType>(null);

export const GameProvider = ({children}) => {
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.Inactive,
    shapes: null,
    debuffs: null,
    answers: null,
    strategy: defaultAssignments,
  });

  return (
    <GameContext.Provider value={{gameState, setGameState}}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
