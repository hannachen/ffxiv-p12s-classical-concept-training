import {useState, useContext, createContext} from 'react';
import {DebuffsProps} from '../components/Debuffs';

export interface DebuffsContextType {
  debuffs: DebuffsProps;
  setDebuffs: (debuff: DebuffsProps) => void;
}
export const DebuffsContext = createContext<DebuffsContextType | null>(null);

export const useDebuffs = () => useContext(DebuffsContext);
