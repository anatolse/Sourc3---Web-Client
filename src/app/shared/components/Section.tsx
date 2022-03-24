import React, { useState } from 'react';
import { styled } from '@linaria/react';

import Title from './Title';
import Angle from './Angle';

interface SectionProps {
  title?: string;
  subtitle?: string;
  collapse?: boolean;
  variant?: 'regular' | 'gray' | 'receipt' | 'profile';
  showAllAction?: () => void;
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
    top: 76px;
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
    top: 76px;
    right: 0px;
    cursor: pointer;
  }

  > .send-input {
    width: 95%;
  }
`;

const SectionGrayStyled = styled.div`
  position: relative;
  // margin: 0 -30px;
  // margin-bottom: 20px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.05);
  text-align: left;

  > .cancel-button {
    position: absolute;
    top: 68px;
    right: 20px;
    cursor: pointer;
  }
  > .send-input {
    width: 95%;
  }
`;

const ButtonStyled = styled.button`
  position: absolute;
  top: 20px;
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
  color: #00f6d2;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    text-transform: none;
    padding: 24px 0 10px 16px;
`;

const ReceiptSectionStyled = styled(SectionStyled)`
width: 359px;
height: 75px;
border: none;
box-sizing: border-box;
box-shadow: none
border-radius: none;
`;

const Section: React.FC<SectionProps> = ({
  title,
  collapse = false,
  variant = 'regular',
  subtitle,
  children,
  showAllAction,
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
  }[variant];

  return (
    <SectionComponent>
      {collapse && (
        <ButtonStyled type="button" onMouseDown={handleMouseDown}>
          <Angle value={hidden ? 180 : 0} margin={hidden ? 3 : 3} />
        </ButtonStyled>
      )}
      {!!title && (
        <TitleWrapper>
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
