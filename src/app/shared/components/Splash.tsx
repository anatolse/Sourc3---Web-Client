import React from 'react';
import { styled } from '@linaria/react';

import { css } from '@linaria/core';
import Logo from './Logo';
// import logo from '@assets/logo.png';
import BackButton from './BackButton';

interface SplashProps {
  size?: 'large' | 'small';
  blur?: boolean;
  onReturn?: React.MouseEventHandler;
}

const ContainerStyled = styled.div<SplashProps>`
  // filter: ${({ blur }) => (blur ? 'blur(3px)' : 'none')};
  position: relative;
  height: 600px;
  padding: 0 30px 0;
  background-image: url('/assets/background.svg');
  // background: #fff;
  text-align: center;
`;

const TitleStyled = styled.div`
position: absolute;
font-size: 24px;
font-weight: 900;
color: var(--color-black);
top: 255px;
left: 132px;
width: 154px;
height: 60px;
text-align: right;
line-height: 30px;
`;

const backButtonStyle = css`
  top: 23px;
`;

export const Splash: React.FC<SplashProps> = ({
  size, blur, onReturn, children,
}) => (
  <ContainerStyled blur={blur}>
    {onReturn && <BackButton onClick={onReturn} className={backButtonStyle} />}
    <Logo size={size} />
    <TitleStyled>
      Where Web3
      Builds

    </TitleStyled>
    {children}
  </ContainerStyled>
);

export default Splash;
