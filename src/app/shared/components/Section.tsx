import React, { useState } from 'react';
import { styled } from '@linaria/react';

import Title from './Title';
import Angle from './Angle';

interface SectionProps {
  title?: string;
  subtitle?: string;
  collapse?: boolean;
  variant?: 'regular' | 'gray' | 'receipt' | 'profile' | 'send' | 'warning' | 'receive';
  showAllAction?: () => void;
  className?: string,
}

const SectionStyled = styled.div`
  position: relative;
  width: 359px;
  height: 146px;
  overflow:hidden;

  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  > .cancel-button {
    position: absolute;
    top: 65px;
    right: 0px;
    cursor: pointer;
  }

  > .send-input {
    width: 95%;
  }
`;
const ProfileStyled = styled.div`
  position: relative;
  width: 174px;
  height: 152px;

  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  > .cancel-button {
    position: absolute;
    top: 65px;
    right: 0px;
    cursor: pointer;
  }

  > .send-input {
    width: 95%;
  }
`;

const SectionGrayStyled = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.05);
  text-align: left;

  > .cancel-button {
    position: absolute;
    top: 65px;
    right: 12px;
    cursor: pointer;
  }
  > .send-input {
    width: 95%;
    height: auto;
  }
`;

const ButtonStyled = styled.button`
  position: absolute;
  top: 11px;
  right: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  text-decoration: none;
  color: white;
  white-space: nowrap;
`;

const ShowAll = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: black;
  cursor: pointer;
  background: transparent;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    text-transform: none;
    padding: 24px 0 10px 12px;
`;

const ReceiptSectionStyled = styled(SectionStyled)`
width: 359px;
height: 75px;
border: none;
box-sizing: border-box;
box-shadow: none
border-radius: none;
`;

const SendStyled = styled(SectionStyled)`
width:327px;
background: rgba(255, 121, 31, 0.1);
border: 1px solid rgba(255, 121, 31, 0.1);
padding: 12px;
height:auto;
`;
const ReceiveStyled = styled(SectionGrayStyled)`
.collapse{
margin-top: 24px;
border-radius: 8px;
background: rgba(255, 121, 31, 0.1);
padding: 12px;
font-size: 16px;
}
`;

const WarningStyled = styled(SectionStyled)`
width: 327px;
padding: 12px
background: rgba(255, 121, 31, 0.1);
border: 1px solid rgba(255, 121, 31, 0.1);
box-sizing: border-box;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
line-height: 20px;
color: rgba(0,0,0, 0.5)
`;

const Section: React.FC<SectionProps> = ({
  title,
  collapse = false,
  variant = 'regular',
  subtitle,
  children,
  showAllAction,
  className,
}) => {
  const [hidden, setHidden] = useState(collapse);

  const handleMouseDown: React.MouseEventHandler = () => {
    setHidden(!hidden);
  };

  const SectionComponent = {
    regular: SectionStyled,
    gray: SectionGrayStyled,
    receipt: ReceiptSectionStyled,
    profile: ProfileStyled,
    send: SendStyled,
    receive: ReceiveStyled,
    warning: WarningStyled,
  }[variant];

  return (
    <SectionComponent className={className}>
      {collapse && (
        <ButtonStyled type="button" onMouseDown={handleMouseDown}>
          <Angle value={hidden ? 180 : 0} margin={hidden ? 3 : 3} />
        </ButtonStyled>
      )}
      {!!title && (
        <TitleWrapper className={collapse ? 'collapse' : ''}>
          <Title>{title}</Title>
          {showAllAction && <ShowAll onClick={showAllAction}>Show All</ShowAll>}
        </TitleWrapper>
      )}
      {!!subtitle && <Title variant="subtitle">{subtitle}</Title>}
      {!hidden && children}
    </SectionComponent>
  );
};

export default Section;
