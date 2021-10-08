import React from 'react';
import {
  combine, createEffect, createEvent, createStore, guard, restore, sample, Store,
} from 'effector';
import { debounce } from 'patronum/debounce';
import { spread } from 'patronum/spread';

import {
  gotoWallet, gotoConfirm, gotoSend,
} from '@app/model/view';

import {
  FEE_DEFAULT, GROTHS_IN_BEAM,
} from '@app/model/rates';

import { AddressType } from '@app/core/types';
import {
  getInputValue, isNil, makePrevented,
} from '@app/core/utils';

import {
  calculateChange,
  sendTransaction,
  validateAddress,
  SendTransactionParams,
} from '@app/core/api';

import { $assets, AssetTotal } from '@app/model/wallet';

/* Misc */

type ReactChangeEvent = React.ChangeEvent<HTMLInputElement>;

/* Send Address */

export const onFormSubmit = makePrevented(gotoConfirm);
export const onConfirmSubmit = makePrevented(gotoWallet);

export const onAddressInput = createEvent<ReactChangeEvent>();
export const setAddress = onAddressInput.map(getInputValue);
export const setAddressValid = createEvent<boolean>();

export const $address = restore(setAddress, '');
export const $addressType = createStore<AddressType>(null);
export const $addressValid = restore(setAddressValid, true);

export const setOffline = createEvent<boolean>();

export const $offline = restore(setOffline, false);
export const $payments = createStore<number>(null);

export const $description: Store<[string, string]> = combine(
  $address, $addressValid, $addressType, $offline, $payments,
  (address, valid, addressType, offline, payments) => {
    if (address === '' || isNil(addressType)) {
      return [null, null];
    }

    if (!valid || addressType === 'unknown') {
      return ['Invalid wallet address', null];
    }

    if (addressType === 'max_privacy') {
      return [
        'Guarantees maximum anonymity set of up to 64K.',
        'Transaction can last at most 72 hours.',
      ];
    }

    if (offline) {
      const warning = payments === 1
        ? 'transaction left. Ask receiver to come online to support more offline transaction.'
        : 'transactions left.';

      return [
        `Offline address. ${payments} ${warning}`,
        'Make sure the address is correct as offline transactions cannot be canceled.',
      ];
    }

    return [
      'Regular address',
      'The recipient must get online within the next 12 hours and you should get online within 2 hours afterwards.',
    ];
  },
);

$addressType.on(setAddress, (state, value) => (value === '' ? null : state));

/* Asset Select */

const ASSET_BLANK: AssetTotal = {
  asset_id: 0,
  available: 0,
  available_str: '0',
  maturing: 0,
  maturing_str: '0',
  receiving: 0,
  receiving_str: '0',
  sending: 0,
  sending_str: '0',
  metadata_pairs: {
    N: '',
    SN: '',
    UN: '',
  },
};

/* Amount Field */

const calculateChangeFx = createEffect(calculateChange);

export const onInputChange = createEvent<[string, number]>();

const setAmount = onInputChange.map(([value]) => value);
const setCurrency = onInputChange.map(([,value]) => value);

export const setMaximum = createEvent<React.MouseEvent>();

const setAmountPositive = setAmount.filter({
  fn: (amount) => parseFloat(amount) > 0,
});

const setAmountDebounced = debounce({
  source: setAmountPositive,
  timeout: 200,
});

export const $fee = createStore(FEE_DEFAULT);
export const $change = createStore(0);
export const $amount = restore(setAmount, '');
export const $currency = restore(setCurrency, 0);

const STORES = [
  $address,
  $addressType,
  $addressValid,
  $offline,
  $payments,
  $fee,
  $change,
  $amount,
  $currency,
];

STORES.forEach((store) => store.reset(gotoSend));

export const $selected = combine($assets, $currency,
  (array, index) => array[index] ?? ASSET_BLANK);

sample({
  source: combine($selected, $fee),
  clock: setMaximum,
  fn: ([{ available, asset_id }, fee]) => {
    const total = asset_id === 0 ? available - fee : available;
    const amount = total / GROTHS_IN_BEAM;
    return amount.toString();
  },
  target: setAmount,
});

enum AmountError {
  FEE = 'Insufficient funds to pay transaction fee.',
  AMOUNT = 'Insufficient funds to complete the transaction. Maximum amount is ',
}

export const $amountError = combine(
  $fee,
  $assets,
  $amount,
  $currency,
  (fee, assets, value, index) => {
    if (value === '') {
      return null;
    }

    const beam = assets[0];
    const target = assets[index];
    const { available } = target;
    const amount = parseFloat(value) * GROTHS_IN_BEAM;
    const groths = available / GROTHS_IN_BEAM;

    if (amount > available) {
      return `${AmountError.AMOUNT} ${groths} ${target.metadata_pairs.N}`;
    }

    if (
      beam.available < fee
      || (index === 0 && amount + fee > available)
    ) {
      return AmountError.FEE;
    }

    return null;
  },
);

const setAddressDebounced = debounce({ source: setAddress, timeout: 200 });
const validateAddressFx = createEffect(validateAddress);

export const $valid = combine(
  $address,
  validateAddressFx.pending,
  $addressValid,
  $amount,
  $amountError,
  (address, pending, addressValid, [value], amountError) => (
    address !== '' && !pending && addressValid && parseFloat(value) > 0 && isNil(amountError)
  ),
);

const sendTransactionFx = createEffect(sendTransaction);

const $params: Store<SendTransactionParams> = combine(
  $selected,
  $amount,
  $address,
  $offline,
  $fee,
  ({ asset_id }, [value], address, offline, fee) => ({
    value: parseFloat(value) * GROTHS_IN_BEAM,
    fee,
    address,
    asset_id,
    offline,
  }),
);

// reset address when user leaves Send
$address.reset(gotoWallet);

// call ValidateAddress on setAddress w/ debounce
guard({
  source: setAddressDebounced,
  filter: (value) => value !== '',
  target: validateAddressFx,
});

// receive Validate data
spread({
  source: validateAddressFx.doneData,
  targets: {
    type: $addressType,
    is_valid: $addressValid,
    payments: $payments,
  },
});

sample({
  source: combine($currency, $assets),
  clock: validateAddressFx.doneData,
  fn: ([selected, assets], { asset_id }) => {
    const index = assets.findIndex(({ asset_id: id }) => id === asset_id);

    return index === -1 ? selected : index;
  },
  target: setCurrency,
});

sample({
  source: $amount,
  clock: validateAddressFx.doneData,
  fn: (value, { amount }) => {
    if (isNil(amount)) {
      return value;
    }

    const next = parseInt(amount, 10) / GROTHS_IN_BEAM;
    return next.toString();
  },
  target: setAmount,
});

// call CalculateChange on setAmount w/ debounce
sample({
  source: $selected,
  clock: setAmountDebounced,
  fn: ({ asset_id }, [amount]) => ({
    asset_id,
    amount: parseFloat(amount) * GROTHS_IN_BEAM,
    fee: FEE_DEFAULT,
    is_push_transaction: false,
  }),
})
  .watch(calculateChangeFx);

// receive Change data
spread({
  source: calculateChangeFx.doneData,
  targets: {
    explicit_fee: $fee,
    asset_change: $change,
  },
});

// call SendTransaction on submit
sample({
  source: $params,
  clock: onConfirmSubmit,
  fn: (params) => params,
  target: [sendTransactionFx],
});
