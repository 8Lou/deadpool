import axios from 'axios';
import { Card } from '../types/types';
export const instance = axios.create({
  baseURL: 'https://cats.petiteweb.dev/api/single/deadpool/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCards = async () => {
  try {
    const res = await instance.get('show');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllIDCards = async () => {
  try {
    const res = await instance.get('ids');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const getCardForId = async (id: number) => {
  try {
    const res = await instance.get('show/' + id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteCard = async (id: number) => {
  try {
    const res = await instance.delete('delete/' + id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const addCard = async (body: Card) => {
  try {
    const res = await instance.post('add', { ...body });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const changeCard = async (body: Card, id: number) => {
  try {
    const res = await instance.put('update/' + id.toString(), { ...body });
    return res;
  } catch (err) {
    console.log(err);
  }
};
