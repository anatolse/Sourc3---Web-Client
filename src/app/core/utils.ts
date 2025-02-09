import { GROTHS_IN_BEAM } from '@app/containers/Wallet/constants';
import { Transaction, AddressType } from '@core/types';

export const copyToClipboard = (value: string) => navigator.clipboard.writeText(value);

export function compact(value: string, stringLength: number = 6): string {
  if (value.length <= 11) {
    return value;
  }
  return `${value.substr(0, stringLength)}…${value.substr(-stringLength, stringLength)}`;
}

const LENGTH_MAX = 8;

export function truncate(value: string): string {
  if (!value) {
    return '';
  }

  if (value.length <= LENGTH_MAX) {
    return value;
  }

  return `${value.slice(0, LENGTH_MAX)}…`;
}

export function toUSD(amount: number, rate: number): string {
  switch (true) {
    case amount === 0 || Number.isNaN(amount):
      return '0.00 USD';
    case amount > 0.01: {
      const value = amount * rate;
      return value > 0.01 ? `${value.toFixed(2)} USD` : '< 1 cent';
    }
    default:
      return '< 1 cent';
  }
}

export function fromGroths(value: number): number {
  return value && value !== 0 ? value / GROTHS_IN_BEAM : 0;
}

export function toGroths(value: number): number {
  const val = Number(parseFloat((value * GROTHS_IN_BEAM).toString()).toPrecision(12));
  return value > 0 ? Math.floor(val) : 0;
}

export function getSign(positive: boolean): string {
  return positive ? '+ ' : '- ';
}

export function createdComparator({ create_time: a }: Transaction, { create_time: b }: Transaction): -1 | 0 | 1 {
  if (a === b) {
    return 0;
  }

  return a < b ? 1 : -1;
}

export const getTxType = (type: AddressType, offline: boolean): string => {
  if (type === 'max_privacy') {
    return 'Maximum anonymity';
  }
  if (type === 'public_offline') {
    return 'Public offline';
  }
  if (type === 'regular') {
    return 'Online';
  }

  return offline ? 'Offline' : 'Online';
};

export const convertLowAmount = (amount: number) => {
  if (amount.toString().includes('e-')) {
    const exp = amount.toString().split('e-');
    return amount.toFixed(Number(exp[1]));
  }
  return amount;

  // return +amount <= 0.0000001
  //   ? amount.toFixed(Number(amount.toString().replace(`${amount.toString()[0]}e-`, '')))
  //   : amount;
};
