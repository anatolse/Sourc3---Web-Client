import { styled } from '@linaria/react';
import React from 'react';

interface ToggleProps {
  id?: string;
  value?: boolean;
  onChange?: React.ChangeEventHandler;
}

const ContainerStyled = styled.label`
  position: relative;
  width: 44px;
  height: 24px;
  cursor: pointer;
`;

const InputStyled = styled.input`
  position: absolute;
  ]z-index: -1;
  top: 0;
  left: 0;
  opacity: 0;
`;

const TrackStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px var(--color-disabled);
  border-radius: 12px;
  background-color: rgba(255, 121, 31, 0.1);
  
  input[type='checkbox']:checked ~ & {
    border-color: #FF791F;
    background-color: rgba(255, 121, 31, 0.1);
  }
`;

const SliderStyled = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.3);;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 2px

  input[type='checkbox']:checked ~ & {
    left: 20px;
    background-color: #FF791F;
  }
`;

const Toggle: React.FC<ToggleProps> = ({ id, value, onChange }) => (
  <ContainerStyled htmlFor={id}>
    <InputStyled id={id} type="checkbox" checked={value} onChange={onChange} />
    <TrackStyled />
    <SliderStyled active={value} />
  </ContainerStyled>
);

export default Toggle;
