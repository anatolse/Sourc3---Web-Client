/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  Section, Button, Rate, Title,
} from '@app/shared/components';

import { ArrowUpIcon } from '@app/shared/icons';

import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { fromGroths, compact, toGroths } from '@core/utils';
import { AddressData, AddressType } from '@core/types';
import { AssetTotal, TransactionAmount } from '@app/containers/Wallet/interfaces';

const SC3Amount = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: rgba(0,0,0, 0.5);
  margin: 0;
`;

const formMid = css`
    position: absolute;
    top: 155px;
};`;

const wrapper = css`
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 24px;
    margin-bottom: 16px;
`;
const subtitle = css`
    font-size: 16px;
    font-weight: 600;
    margin-right: 14px;
    width: 100px;
    text-align: left;
`;
const receiptValue = css`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: rgba(0,0,0, 0.5);
    text-align: left;
`;
const rateClassName = css`
    font-weight: 500;
`;

const getTxType = (type: AddressType, offline: boolean): string => {
  if (type === 'max_privacy') {
    return 'Maximum anonymity';
  }
  if (type === 'public_offline') {
    return 'Public offline';
  }

  return offline ? 'Offline' : 'Online';
};

interface SendConfirmProps {
  address: string;
  offline: boolean;
  send_amount: TransactionAmount;
  selected: AssetTotal;
  beam: AssetTotal;
  addressData: AddressData;
  fee: number;
  change: number;
  asset_change: number;
  submitSend: () => void;
}

const SendConfirm = (props: SendConfirmProps) => {
  const {
    address, offline, send_amount, selected, addressData, fee, change, submitSend, beam, asset_change,
  } = props;

  const { asset_id, amount } = send_amount;

  const value = toGroths(parseFloat(amount));

  const { available, metadata_pairs } = selected;

  const { type: addressType } = addressData;

  const remaining = asset_id === 0 ? available - fee - value : available - value;

  const txType = getTxType(addressType, offline);

  const beamRemaining = beam.available - fee;

  return (
    <>
      <Title variant="auth">Confirmation</Title>
      <form
        className={formMid}
        onSubmit={(e) => {
          e.preventDefault();
          submitSend();
        }}
      >
        <div className={wrapper}>
          <span className={subtitle}>Send to</span>
          <div className={receiptValue}><span>{compact(address)}</span></div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Type</span>
          <div className={receiptValue}>
            <span>
              {txType}
            </span>
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Amount</span>
          <div className={receiptValue}>
            <SC3Amount>
              {fromGroths(value)}
              {' '}
              {metadata_pairs.UN}
            </SC3Amount>

          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Fee</span>
          <div className={receiptValue}>
            <SC3Amount>
              {fromGroths(fee)}
              {' '}
              SC3
            </SC3Amount>
            <Rate className={rateClassName} value={fee} groths />
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Change</span>
          <div className={receiptValue}>
            <SC3Amount>
              {fromGroths(selected.asset_id === 0 ? change : asset_change)}
              {' '}
              {metadata_pairs.UN}
            </SC3Amount>
            <Rate className={rateClassName} value={selected.asset_id === 0 ? change : asset_change} groths />
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Remaining</span>
          <div className={receiptValue}>
            <SC3Amount>
              {fromGroths(beamRemaining)}
              {' '}
              SC3
            </SC3Amount>
            <Rate className={rateClassName} value={beamRemaining} groths />

          </div>
        </div>
        {/* <Section variant="receipt" subtitle="Send to">{compact(address)}</Section>
        <Section variant="receipt" subtitle="Transaction type">{txType}</Section>
        <Section variant="receipt" subtitle="Amount">
          <BeamAmount>
            {fromGroths(value)}
          &nbsp;
            {metadata_pairs.UN}
          </BeamAmount>
        </Section>
        <Section variant="receipt" subtitle="Transaction Fee">
          {fromGroths(fee)}
        &nbsp;SC3
          <Rate value={fee} groths />
        </Section>
        <Section variant="receipt" subtitle="Change">
          {fromGroths(selected.asset_id === 0 ? change : asset_change)}
        &nbsp;
          {metadata_pairs.UN}
          <Rate value={selected.asset_id === 0 ? change : asset_change} groths />
        </Section>
        <Section variant="receipt" subtitle="Remaining">
          {fromGroths(remaining)}
        &nbsp;
          {metadata_pairs.UN}
          <Rate value={remaining} groths />
        </Section>
        {selected.asset_id !== 0 && (
        <Section variant="receipt" subtitle="Beam Remaining">
          {fromGroths(beamRemaining)}
          &nbsp;BEAM
          <Rate value={beamRemaining} groths />
        </Section>
        )} */}
        <Button type="submit" pallete="orange" style={{ margin: '94px 56px 0' }}>
          send
        </Button>
      </form>

    </>
  );
};

export default SendConfirm;
