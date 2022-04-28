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
justify-content: flex-start;
align-items: center;
padding: 0 24px
`;
const Avatar = styled.div`
width: 56px;
height: 56px;
left: 38px;
top: 81px;
`;
const Name = styled.p`
margin: 0
font-weight: 800;
font-size: 20px;
line-height: 20px;

text-align: left;
letter-spacing: 0.1px;
margin-right: 31px;
margin-left: 12px;
`;
const ButtonStyled = styled.div`
display: flex
width:100%
padding: 24px;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-around;
& > button:nth-child(even){
  margin-left: 17px;
}
`;

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assets = useSelector(selectAssets()).filter((item) => item.asset_id === 0);
  const transactions = useSelector(selectTransactions());
  const rate = useSelector(selectRate());
  console.log(assets);
  useEffect(() => {
    if (!rate) {
      dispatch(loadRate.request());
    }
  }, [dispatch, rate]);

  const handlePrevious: React.MouseEventHandler = () => {
    navigate(ROUTES.WALLET.BASE);
  };
  return (
    <Window title="Profile" onPrevious={handlePrevious}>
      <ActionsStyled>
        <Profile>
          <Avatar><Button variant="manage" icon={IconProfileLarge} /></Avatar>
          <Name>Long John Silver</Name>
          <Button
            variant="link"
            onClick={() => navigate(ROUTES.WALLET.MANAGE)}
          >
            Manage
          </Button>
        </Profile>
        <Section title="Balance" variant="balance">
          <Assets data={assets} />
        </Section>
        <ButtonStyled>
          {assets[0].available ? (
            <Button
              variant="block"
              pallete="orange"
              icon={ArrowUpIcon}
              onClick={() => navigate(ROUTES.WALLET.SEND)}
            >
              send
            </Button>
          ) : <></>}
          <Button
            variant="block"
            pallete="green"
            icon={ArrowDownIcon}
            onClick={() => navigate(ROUTES.WALLET.RECEIVE)}
          >
            receive
          </Button>
          {
            assets[0].available
              ? (
                <Button
                  variant="block"
                  pallete="black"
                  icon={IconStar}
                >
                  claim
                </Button>
              ) : <></>
             }
          <Button
            variant="block"
            pallete="blue"
            icon={ArrowDownIconUnder}
          >
            buy
          </Button>

        </ButtonStyled>
      </ActionsStyled>
    </Window>
  );
};

export default Wallet;
