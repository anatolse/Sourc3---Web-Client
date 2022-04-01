import { styled } from '@linaria/react';
import React from 'react';

interface LabeledToggleProps {
  left?: string;
  right?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const ContainerStyled = styled.button`
  display: flex;
  position: relative;
  width: 189px;
  height: 44px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const LabelStyled = styled.div`
background-color: rgba(0,0,0,0.03);
    color: rgba(0,0,0,0.5);
    width: 79px;
    height: 44px;
    padding: 12px;
    line-height: 20px;
    margin-right: 8px;
    border-radius: 8px;

`;

const SliderStyled = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ active }) => (!active ? '3.1%' : '49.1%')};
  width: 79px;
    height: 45px;
    line-height: 20px;
    border-radius: 8px;
    border: 1px solid #FF791F;
    background-color: rgba(255, 121, 31, 0.1);
    color: black;
    padding: 12px;
    font-weight: 500;
`;

const LabeledToggle: React.FC<LabeledToggleProps> = ({
  left = 'off', right = 'on', value, onChange,
}) => {
  const handleClick: React.MouseEventHandler = () => {
    const next = !value;
    onChange(next);
  };

  return (
    <ContainerStyled type="button" onClick={handleClick}>
      <SliderStyled active={value}>{!value ? left : right}</SliderStyled>
      <LabelStyled>{left}</LabelStyled>
      <LabelStyled>{right}</LabelStyled>
    </ContainerStyled>
  );
};

export default LabeledToggle;
