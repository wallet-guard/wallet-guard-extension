import { createContext } from 'react';
import { PageView } from '../../models/PageView';
import { StoredSimulation } from '../simulation/storage';

export interface NavigationContextModel {
  currentPage: PageView;
  updatePageView: (data: PageView) => void;
}

export const PageContext = createContext({
  currentPage: 'dashboard',
  updatePageView: (data: PageView) => { }
} as NavigationContextModel);

export interface SimulationContextModel {
  currentSimulation: StoredSimulation | undefined;
  loading: boolean;
}

// todo: current simulation undefined causes issues with subcomponents, if loaded is true we should have a currentSimulation
// see if we can fix that
export const SimulationContext = createContext({
  currentSimulation: undefined,
  loading: true,
} as SimulationContextModel);
