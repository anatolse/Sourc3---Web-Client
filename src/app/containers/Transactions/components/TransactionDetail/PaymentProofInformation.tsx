import React, { useMemo } from 'react';
import { PaymentProof, TransactionDetail } from '@core/types';
import { styled } from '@linaria/react';

import { Button } from '@app/shared/components';
import { CopySmallIcon, ExternalLink } from '@app/shared/icons';
import config from '@app/config';
import { InformationItem } from '@app/shared/components/DetailInformationLayout';
import { fromGroths, toUSD } from '@app/core/utils';
import AssetLabel from '../../../../shared/components/AssetLabel';

interface PaymentProofInformationInterface {
  paymentProof: PaymentProof;
  transactionDetail: TransactionDetail;
  isBalanceHidden: boolean;
  copy: (value: string, tM: string) => void;
  // rate: number;
}

const PaymentProofWrapper = styled.div`
  text-align: left;
`;

const PaymentProofInformation = ({
  paymentProof, transactionDetail, isBalanceHidden, copy,
}: PaymentProofInformationInterface) => {
  const assetRate = useMemo(() => {
    let rate = transactionDetail?.rates.find((a) => a.from === transactionDetail.asset_id && a.to === 'usd');

    if (!rate && transactionDetail.invoke_data?.length && transactionDetail.invoke_data[0].amounts.length === 1) {
      rate = transactionDetail?.rates.find(
        (a) => a.from === transactionDetail.invoke_data[0].amounts[0].asset_id && a.to === 'usd',
      );
    }

    return rate;
  }, [transactionDetail]);
  return (
    <PaymentProofWrapper>
      <InformationItem>
        <div className="title">Sending Address:</div>
        <div className="value">
          <p>{paymentProof.sender}</p>
          <Button
            variant="icon"
            pallete="white"
            icon={CopySmallIcon}
            onClick={() => copy(paymentProof.sender, 'Address copied to clipboard')}
          />
        </div>
      </InformationItem>
      <InformationItem>
        <div className="title">Receiving Address:</div>
        <div className="value">
          <p>{paymentProof.receiver}</p>
          <Button
            variant="icon"
            pallete="white"
            icon={CopySmallIcon}
            onClick={() => copy(paymentProof.receiver, 'Address copied to clipboard')}
          />
        </div>
      </InformationItem>

      <InformationItem asset_id={paymentProof.asset_id}>
        <div className="title">Amount:</div>
        <div className="value asset">
          <AssetLabel
            value={paymentProof.amount}
            asset_id={paymentProof.asset_id}
            comment=""
            className="asset-label"
            iconClass="iconClass"
            showRate={false}
            isBalanceHidden={isBalanceHidden}
            icon={false}
          />
          <div className="amount-comment">
            {assetRate?.rate
              ? `${toUSD(fromGroths(transactionDetail.value), fromGroths(assetRate?.rate))} `
                  + '(сalculated with the exchange rate at the time of the transaction)'
              : 'Exchange rate was not available at the time of transaction'}
          </div>
        </div>
      </InformationItem>

      <InformationItem>
        <div className="title">Kernel ID:</div>
        <div className="value">
          <p>{paymentProof.kernel}</p>
          <Button
            variant="icon"
            pallete="white"
            icon={ExternalLink}
            onClick={() => window.open(config.explorer_url + paymentProof.kernel)}
          />
        </div>
      </InformationItem>

      <InformationItem>
        <div className="title">Code:</div>
        <div className="value">
          <p>{paymentProof.payment_proof}</p>
          <Button
            variant="icon"
            pallete="white"
            icon={CopySmallIcon}
            onClick={() => copy(paymentProof.payment_proof, 'Code copied to clipboard')}
          />
        </div>
      </InformationItem>
    </PaymentProofWrapper>
  );
};

export default PaymentProofInformation;
