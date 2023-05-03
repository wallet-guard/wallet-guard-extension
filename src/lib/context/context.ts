import { createContext } from 'react';
import { PageView } from '../../models/PageView';
import { ActionPopupTab } from '../../models/actionPopupScreen';

export interface NavigationContextModel {
  currentPage: PageView;
  updatePageView: (data: PageView) => void;
}

export interface PopupTabModel {
  currentTab: ActionPopupTab;
  updateTab: (data: ActionPopupTab) => void;
}

export const PageContext = createContext({
  currentPage: 'dashboard',
  updatePageView: (data: PageView) => { }
} as NavigationContextModel);

export const PopupTabContext = createContext({
  currentTab: ActionPopupTab.PhishingTab,
  updateTab: (data: ActionPopupTab) => { }
} as PopupTabModel);