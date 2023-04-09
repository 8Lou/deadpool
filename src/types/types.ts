import { AxiosResponse } from 'axios';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type Card = {
  id: number;
  age: number;
  rate: number;
  description: string;
  name: string;
  favorite: boolean;
  image: string;
};
export type ImagesType = {
  title: FilterType;
  image: string;
};
export type FilterType =
  | 'Deadpool'
  | 'X-MEN'
  | 'Marvel'
  | 'DC'
  | 'Spider-Man'
  | 'ALL'
  | 'Catalog'
  | 'By rating'
  | 'By price'
  | 'Filter';
export type AddedItems = Card & {
  count: number;
};

export type ButtonsHeaderType = {
  id: string;
  buttonsName: FilterType[];
  setActiveTitle: Dispatch<SetStateAction<FilterType>>;
  setSelectInnerHTML: Dispatch<SetStateAction<ReactNode>>;
  activeTitle: FilterType;
  selectInnerHTML: ReactNode;
};

export type TypeOfFormType = {
  type: 'addAdminItem' | 'changeAdminItem';
  idx: number | undefined;
};
export type SelectOptionsType = {
  value: string;
  label: string;
};

type FetchAdminItem = (
  body: Card,
  id: number,
) => Promise<AxiosResponse<any, any> | undefined> | Promise<any>;

export type FormHandlerType = (
  e: React.FormEvent<HTMLFormElement>,
  fetchAdminItem: FetchAdminItem,
  idx?: number,
) => void;
export type OnChangeSwitchHandlerFieldsVariant =
  | 'name'
  | 'age'
  | 'description'
  | 'image'
  | 'favorite'
  | 'rate';
