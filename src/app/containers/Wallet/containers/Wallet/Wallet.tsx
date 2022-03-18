/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';

import { Button, Window, Section } from '@app/shared/components';

import {
  ArrowUpIcon, ArrowDownIcon, IconProfileLarge, ArrowDownIconUnder, IconStar,
} from '@app/shared/icons';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssets, selectRate } from '@app/containers/Wallet/store/selectors';

import { loadRate } from '@app/containers/Wallet/store/actions';
import { selectTransactions } from '@app/containers/Transactions/store/selectors';
import { Assets } from '../../components/Wallet';

// const TXS_MAX = 4;

const ActionsStyled = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;
`;
const Profile = styled.div`
display: flex;
width: 100%;
height: 105px;
justify-content: space-between;
align-items: center;
padding: 0 24px
`;
const Avatar = styled.div`
width: 56px;
height: 56px;
left: 24px;
top: 81px;
`;
const Name = styled.p`
margin: 0
font-weight: 600;
font-size: 20px;
line-height: 20px;

text-align: right;
letter-spacing: 0.1px;
`;
const ButtonStyled = styled.div`
display: flex
width:100%
padding: 24px;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-around;
`;

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assets = useSelector(selectAssets());
  const transactions = useSelector(selectTransactions());
  const rate = useSelector(selectRate());
  const balance = (assets[0].available);
  useEffect(() => {
    if (!rate) {
      dispatch(loadRate.request());
    }
  }, [dispatch, rate]);

  return (
    <Window title="Profile">
      <ActionsStyled>
        <Profile>
          <Button variant="icon" icon={IconProfileLarge} />
          <Name>Long John Silver</Name>
          <Button variant="link">Manage</Button>
        </Profile>
        <Section title="Balance">
          <Assets data={assets} />
        </Section>
        <ButtonStyled>
          <Button
            variant="block"
            pallete="orange"
            icon={ArrowUpIcon}
            onClick={() => navigate(ROUTES.WALLET.SEND)}
          >
            send
          </Button>
          <Button
            variant="block"
            pallete="green"
            icon={ArrowDownIcon}
            onClick={() => navigate(ROUTES.WALLET.RECEIVE)}
          >
            receive
          </Button>
          {
            !balance
           && (
           <>
             {' '}
             <Button
               variant="block"
               pallete="black"
               icon={IconStar}
             >
               claim
             </Button>
             <Button
               variant="block"
               pallete="blue"
               icon={ArrowDownIconUnder}
             >
               buy
             </Button>

           </>
           )
          }

        </ButtonStyled>
      </ActionsStyled>
    </Window>
  );
};

export default Wallet;
