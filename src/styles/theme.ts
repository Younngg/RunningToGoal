import { DefaultTheme } from 'styled-components';

const color = {
  skyblue: '#dcf0ff',
  pink: '#ffa6a6',
  red: '#ff7b7b',
  green: '#68ea9c',
};

export type ColorsTypes = typeof color;

export const theme: DefaultTheme = {
  color,
};
