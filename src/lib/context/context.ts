import { createContext } from 'react';
import { PageView } from '../../models/PageView';

export interface NavigationContextModel {
  currentPage: PageView;
  updatePageView: (data: PageView) => void;
}

export const PageContext = createContext({
  currentPage: 'dashboard',
  updatePageView: (data: PageView) => { }
} as NavigationContextModel);
