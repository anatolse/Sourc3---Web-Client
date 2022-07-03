/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { styled } from '@linaria/react';

import {
  Window, Section, Button, Input, Toggle, Popup,
} from '@app/shared/components';

import { CopySmallIcon, IconQrCode } from '@app/shared/icons';

import AmountInput from '@app/shared/components/AmountInput';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAddress,
  selectReceiveAmount,
  selectSbbs,
  selectSelectedAssetId,
} from '@app/containers/Wallet/store/selectors';
import {
  generateAddress, resetReceive, setReceiveAmount, setSbbs,
} from '@app/containers/Wallet/store/actions';
import { compact, copyToClipboard } from '@core/utils';
import { toast } from 'react-toastify';
import { css } from '@linaria/core';

const ReceiveContainer = styled.div`
  margin: 0 24px;
`;

const ButtonClassName = css`
  margin: 0 21px 0 0 !important;
`;

const buttonClassName = css`
  position: absolute;
  bottom: 40px;
  left: 56px;
`;

const warningClassName = css`
  height: auto;
  margin: 20px 0 100px;
  text-align: left;
`;
const AddressStyled = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: black;
`;
const AddressHint = styled.div`
  margin-top: 10px;
  opacity: 0.5;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.14;
  letter-spacing: normal;
  color: #fff;
`;

const BlockButtonStyled = styled.div`
  margin-left: 18px;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  margin: 10px 0;
`;

const RowStyled = styled.div`
  display: flex;
  align-items: center;
`;

const LabelStyled = styled.label`
  flex-grow: 1;
  font-size: 16px;
  font-weight: 800;
  padding-left: 12px;
  line-height: 19px;
  letter-spacing: 0.1px;
`;

const QrCodeWrapper = styled.div`
  > .qr-cd {
    background: white;
    border-radius: 10px;
    padding: 5px;
    width: 230px;
    margin: 0 auto 30px;
  }
  > .text {
    opacity: 0.5;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: black;
  }
`;

const Receive = () => {
  const dispatch = useDispatch();
  const [qrVisible, setQrVisible] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const receiveAmount = useSelector(selectReceiveAmount());
  const addressFull = useSelector(selectAddress());
  const sbbs = useSelector(selectSbbs());
  const selected_asset_id = useSelector(selectSelectedAssetId());
  const address = compact(addressFull);
  const [amountError, setAmountError] = useState('');

  useEffect(
    () => () => {
      dispatch(resetReceive());
      dispatch(setSbbs(null));
    },
    [dispatch],
  );

  const { amount, asset_id } = receiveAmount;

  const [maxAnonymity, setMaxAnonymity] = useState(false);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selected_asset_id && Number(asset_id) !== selected_asset_id) {
      dispatch(setReceiveAmount({ amount, asset_id: selected_asset_id }));
    }
  }, [selected_asset_id, asset_id, amount, dispatch]);

  useEffect(() => {
    if (comment) {
      dispatch(generateAddress.request({ type: maxAnonymity ? 'max_privacy' : 'offline', comment }));
    } else {
      dispatch(
        generateAddress.request({
          type: maxAnonymity ? 'max_privacy' : 'offline',
        }),
      );
    }
  }, [dispatch, maxAnonymity, comment]);

  const copyAddress = async () => {
    toast('Address copied to clipboard');
    await copyToClipboard(addressFull);
  };

  const submitForm = async () => {
    await copyAddress();
    navigate(ROUTES.WALLET.PROFILE);
  };

  const copyAndCloseQr = async () => {
    await copyAddress();
    setQrVisible(false);
  };

  return (
    <Window title="Receive">
      <>
        <Popup
          visible={qrVisible}
          title=""
          onCancel={() => setQrVisible(false)}
          confirmButton={(
            <Button pallete="orange" onClick={copyAndCloseQr}>
              Share QR code
            </Button>
          )}
          footerClass="qr-code-popup"
          cancelButton={null}
          footer
          closeButton
        >
          <QrCodeWrapper>
            <div className="qr-cd">
              <QRCode value={`${addressFull}`} size={220} bgColor="white" />
            </div>
          </QrCodeWrapper>
        </Popup>
        <ReceiveContainer>
          <Section title={`Address ${maxAnonymity ? '(Maximum anonymity)' : ''}`} variant="gray">
            <AddressContainer>
              <AddressStyled>{address}</AddressStyled>
              <BlockButtonStyled>
                <Button
                  className={ButtonClassName}
                  variant="icon"
                  pallete="white"
                  icon={CopySmallIcon}
                  onClick={copyAddress}
                />
                <Button
                  className={ButtonClassName}
                  variant="icon"
                  pallete="white"
                  icon={IconQrCode}
                  onClick={() => setQrVisible(true)}
                />
              </BlockButtonStyled>
            </AddressContainer>
          </Section>
          <Section title="Advanced settings" variant="receive" collapse>
            <Section title="Requested amount (optional)" variant="gray">
              <AmountInput
                value={amount}
                asset_id={asset_id}
                pallete="black"
                onChange={(e) => dispatch(setReceiveAmount(e))}
              />
            </Section>
            <RowStyled>
              <LabelStyled>Maximum anonymity set </LabelStyled>
              <Toggle value={maxAnonymity} onChange={() => setMaxAnonymity((v) => !v)} />
            </RowStyled>
          </Section>
          {maxAnonymity ? (
            <Section variant="warning" className={warningClassName}>
              <span>Transaction can last at most 72 hours.</span>
              <br />
              <span>Min transaction fee is 0.01 SC3</span>
            </Section>
          ) : (
            <Section variant="warning" className={warningClassName}>
              <span>Sender will be given a choice between regular and offline payment.</span>
              <br />
              <span>
                For online payment to complete, you should get online during the 12 hours after coins are sent.
              </span>
            </Section>
          )}

          {/* <Section title="Comment" variant="gray" collapse>
          <Input variant="gray" />
        </Section> */}
          <Button pallete="orange" type="button" onClick={submitForm} className={buttonClassName}>
            Copy and close
          </Button>
        </ReceiveContainer>
      </>
    </Window>
  );
};

export default Receive;
