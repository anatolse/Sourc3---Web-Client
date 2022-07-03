import { styled } from '@linaria/react';
import { TabsProps } from '../interface';

export const TabsMenu = styled.ul<TabsProps>`
  position: absolute;
  top: 73px;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  display: flex;
  width: 100%;
  justify-content: center;

  & > li:not(:first-child) {
    margin-left: 40px;
  }
`;
export const TabItem = styled.li<TabsProps>`
  color: ${({ active }) => (active ? '#FF791F' : 'rgba(0,0,0, 0.2)')};
  cursor: pointer;
`;
export const Content = styled.div`
  position: absolute;
  top: 115px;
  left: 0;
  background: white;
  width: 100%;
`;
