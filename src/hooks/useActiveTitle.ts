import { useEffect } from 'react';
import { filterByCatalogName } from '../redux/items';
import { FilterType } from '../types/types';
import { useAppDispatch } from '../redux/hooks';

type UseActiveTitleType = (activeTitleCatalog: FilterType) => void;

export const useActiveTitle: UseActiveTitleType = (activeTitleCatalog) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(filterByCatalogName(activeTitleCatalog));
  }, [activeTitleCatalog, dispatch]);
};
