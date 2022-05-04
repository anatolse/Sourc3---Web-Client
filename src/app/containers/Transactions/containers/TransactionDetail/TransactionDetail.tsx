import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { styled } from '@linaria/react';
import { useParams } from 'react-router-dom';
import { Window } from '@app/shared/components';

import { PaymentProofInformation, GeneralTransactionInformation } from '@app/containers/Transactions';
import { useDispatch, useSelector } from 'react-redux';
import { loadTransactionStatus, setPaymentProof } from '@app/containers/Transactions/store/actions';
import { selectPaymentProof, selectTransactionDetail } from '@app/containers/Transactions/store/selectors';
import { selectAssets } from '@app/containers/Wallet/store/selectors';
import { selectIsBalanceHidden } from '@app/shared/store/selectors';
import { toast } from 'react-toastify';
import { copyToClipboard } from '@core/utils';
import { TabItem, TabsMenu } from '@app/shared/components/TabsMenu';
import { css } from '@linaria/core';

const TransactionDetailWrapper = styled.div`
  padding: 30px 24px;
  margin-top: 40px;
`;
const EmptyStyled = css`
  margin-top: 0;
`;

const TransactionDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('general');
  const transactionDetail = useSelector(selectTransactionDetail());
  const paymentProof = useSelector(selectPaymentProof());
  const isBalanceHidden = useSelector(selectIsBalanceHidden());
  //  const rate = useSelector(selectRate());
  const assets = useSelector(selectAssets());

  useEffect(() => {
    dispatch(loadTransactionStatus.request(params.id));
    return () => {
      dispatch(loadTransactionStatus.success(null));
      dispatch(setPaymentProof(null));
    };
  }, [dispatch, params.id]);

  const handleButton = (e: { keyCode: number }) => {
    if (e.keyCode === 9) {
      if (activeTab === 'general' && paymentProof) {
        setActiveTab('payment-proof');
      } else {
        setActiveTab('general');
      }
    }
  };

  const assetRate = useMemo(() => {
    if (!transactionDetail) return null;
    let rate = transactionDetail?.rates.find((a) => a.from === transactionDetail.asset_id && a.to === 'usd');

    if (!rate && transactionDetail.invoke_data?.length && transactionDetail.invoke_data[0].amounts.length === 1) {
      rate = transactionDetail?.rates.find(
        (a) => a.from === transactionDetail.invoke_data[0].amounts[0].asset_id && a.to === 'usd',
      );
    }

    return rate;
  }, [transactionDetail]);

  const feeRate = useMemo(() => {
    if (!transactionDetail) return null;
    const rate = transactionDetail?.rates.find((a) => a.from === 0 && a.to === 'usd');

    return rate;
  }, [transactionDetail]);

  const copy = useCallback((value, tM) => {
    toast(tM);
    copyToClipboard(value);
  }, []);

  return (
    <Window title="Transaction details">
      {paymentProof && (
      <TabsMenu>
        <TabItem
          active={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
          onKeyDown={handleButton}
          tabIndex={0}
        >
          General
        </TabItem>
        <TabItem
          active={activeTab === 'payment-proof'}
          onClick={() => setActiveTab('payment-proof')}
          onKeyDown={handleButton}
          tabIndex={-1}
        >
          Payment proof
        </TabItem>
      </TabsMenu>
      )}
      <TransactionDetailWrapper className={!paymentProof ? EmptyStyled : ''}>
        {activeTab === 'general' && transactionDetail && (
          <GeneralTransactionInformation
            transactionDetail={transactionDetail}
            assets={assets}
            isBalanceHidden={isBalanceHidden}
            copy={copy}
            assetRate={assetRate}
            feeRate={feeRate}
          />
        )}
        {activeTab === 'payment-proof' && (
          <PaymentProofInformation
            paymentProof={paymentProof}
            transactionDetail={transactionDetail}
            isBalanceHidden={isBalanceHidden}
            copy={copy}
            assetRate={assetRate}

          />
        )}
      </TransactionDetailWrapper>
    </Window>
  );
};

export default TransactionDetail;
