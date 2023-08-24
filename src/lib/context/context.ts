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
