import React from 'react';
import { styled } from '@linaria/react';

import { Contract, Transaction } from '@core/types';

import { useSelector } from 'react-redux';
import { selectAssets } from '@app/containers/Wallet/store/selectors';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';
import TransactionItem from './TransactionItem';

import EmptyTransaction from './EmptyTransaction';

const ListStyled = styled.ul`
  padding-left: 24px;
`;

interface TransactionsProps {
  data: Transaction[];
  isBalanceHidden?: boolean;
}

const ListItemStyled = styled.li`
  padding: 16px 24px 16px 0px;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const fromInvokeData = (data: Contract, fee: number): Partial<Transaction> => {
  if (data.amounts.length === 1) {
    const [{ amount, asset_id }] = data.amounts;

    const value = asset_id === 0 && amount < 0 ? amount + fee : amount;

    return {
      value: Math.abs(value),
      income: amount < 0,
      asset_id,
    };
  }

  return null;
};

const TransactionList: React.FC<TransactionsProps> = ({ data: transactions, isBalanceHidden }) => {
  const assets = useSelector(selectAssets());
  const navigate = useNavigate();

  const navigateTransactionDetail = (id: string) => {
    navigate(`${ROUTES.TRANSACTIONS.DETAIL.replace(':id', '')}${id}`);
  };

  return transactions.length ? (
    <ListStyled>
      {transactions.map((tx) => {
        const { invoke_data: contracts } = tx;
        const payload = contracts ? fromInvokeData(contracts[0], tx.fee) : null;

        const data = !payload
          ? tx
          : {
            ...tx,
            ...payload,
          };

        return (
          <ListItemStyled key={tx.txId} onClick={() => navigateTransactionDetail(tx.txId)}>
            <TransactionItem data={data} assets={assets} isBalanceHidden={isBalanceHidden} />
          </ListItemStyled>
        );
      })}
    </ListStyled>
  ) : (
    <EmptyTransaction />
  );
};

export default TransactionList;
