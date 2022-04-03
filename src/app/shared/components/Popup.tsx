import React from 'react';
import { styled } from '@linaria/react';

import { css } from '@linaria/core';
import Backdrop from './Backdrop';
import Button from './Button';
import { CancelIcon } from '../icons';

interface PopupProps {
  title?: string;
  cancelButton?: React.ReactElement;
  confirmButton?: React.ReactElement;
  visible?: boolean;
  onCancel?: React.MouseEventHandler;
  footerClass?: string;
  footer?: boolean;
  agree?: boolean;
  closeButton?: boolean;
}

const ContainerStyled = styled.div`
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 50%;
  width: 343px;
  padding: 24px;
  background-color: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.05);
box-sizing: border-box;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
border-radius: 8px;
  text-align: left;
  color: rgba(0,0,0,0.5);
  font-size: 14px;
  font-wight: 500;
  line-height: 20px;
  span:not(:first-child){
    margin-top: 5px
  }
  

  > .cancel-header {
    right: 4px;
    top: 10px;
    position: absolute;
  }
`;

const TitleStyled = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-bottom: 20px;
  text-alight:left;
  color: black;
  font-weight:800;
`;

const FooterStyled = styled.div<PopupProps>`
  display: flex;
  margin: 0 -7px;
  margin-top: 30px;

  > button {
    margin: 0 7px !important;
  }
  &.justify-right {
    justify-content: right;
    margin-top: 40px;
  }
  &.qr-code-popup {
    > button {
      margin: 0 auto !important;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const center = css`
margin: 24px 0 !important;
justify-content: center !important; 
}
`;

const Popup: React.FC<PopupProps> = ({
  title,
  visible,
  onCancel,
  cancelButton = (
    <Button variant="ghost" onClick={onCancel}>
      Cancel
    </Button>
  ),
  confirmButton,
  children,
  footerClass,
  footer,
  closeButton = false,
  agree = false,
}) => (visible ? (
  <Backdrop onCancel={onCancel}>
    <ContainerStyled>
      <TitleStyled>{title}</TitleStyled>
      {closeButton
        && (
        <Button
          className="cancel-header"
          variant="icon"
          pallete="white"
          icon={CancelIcon}
          onClick={onCancel}
        />
        )}
      {children}
      { footer && (
        <FooterStyled agree={agree} className={footerClass}>
          {cancelButton}
          {confirmButton}
        </FooterStyled>
      )}
      {agree && (
      <FooterStyled className={center}>
        {confirmButton}
      </FooterStyled>
      )}
    </ContainerStyled>
  </Backdrop>
) : null);

export default Popup;
