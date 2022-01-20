export interface ColorProperties {
  base: string;
  hover: string;
  light: string;
  dark: string;
  text: string;
  border: string;
  borderHover: string;
  borderFocus: string;
}

export const COLORS_MAP: { [key: string]: ColorProperties } = {
  blue: {
    base: '#4678F0',
    hover: '#608BF2',
    light: '#8CABF6',
    dark: '#3F67C7',
    text: '#FFFFFF',
    border: '#4678F0',
    borderHover: '#608BF2',
    borderFocus: '#3F67C7',
  },
  red: {
    base: '#E84142',
    hover: '#EA5C5E',
    light: '#F0898B',
    dark: '#C03B3C',
    text: '#FFFFFF',
    border: '#E84142',
    borderHover: '#EA5C5E',
    borderFocus: '#C03B3C',
  },
  green: {
    base: '#37CA34',
    hover: '#6BD66B',
    light: '#94E194',
    dark: '#33A830',
    text: '#FFFFFF',
    border: '#37CA34',
    borderHover: '#6BD66B',
    borderFocus: '#33A830',
  },
  orange: {
    base: '#F09643',
    hover: '#F2A45B',
    light: '#F6BE8A',
    dark: '#C77F3C',
    text: '#FFFFFF',
    border: '#F09643',
    borderHover: '#F2A45B',
    borderFocus: '#C77F3C',
  },
  grey: {
    base: '#6D87AC',
    hover: '#BBC7D9',
    light: '#DDE3EC',
    dark: '#5F7492',
    text: '#FFFFFF',
    border: '#6D87AC',
    borderHover: '#BBC7D9',
    borderFocus: '#5F7492',
  },
  white: {
    base: '#FFFFFF',
    hover: '#FFFFFF',
    light: '#FFFFFF',
    dark: '#FFFFFF',
    text: '#222222',
    border: '#FFFFFF',
    borderHover: '#DDE3EC',
    borderFocus: '#608BF2',
  },
}
