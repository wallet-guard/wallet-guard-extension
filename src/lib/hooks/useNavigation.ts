import { useState } from 'react';
import { PageView } from '../../models/PageView';
import { ActionPopupTab } from '../../models/actionPopupScreen';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');

  function updatePageView(newPage: PageView) {
    setCurrentPage(newPage);
  }

  return { currentPage, updatePageView };
}

export function useTab() {
  const [currentTab, selectTab] = useState<ActionPopupTab>(ActionPopupTab.PhishingTab);

  function updateTab(newTab: ActionPopupTab) {
    selectTab(newTab);
  }

  return { currentTab, updateTab };
}