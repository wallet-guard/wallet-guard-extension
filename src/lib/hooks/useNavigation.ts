import { useState } from 'react';
import { PageView } from '../../models/PageView';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');

  function updatePageView(newPage: PageView) {
    setCurrentPage(newPage);
  }

  return { currentPage, updatePageView };
}
