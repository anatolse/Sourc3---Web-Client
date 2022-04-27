import { styled } from '@linaria/react';
import React from 'react';

export interface ITab {
  id?: string | number;
  label?: string | number
  active?: boolean
}

export interface ITabsProps {
  className?: string;
  selectedId?: string | number;
  tabs?: ITab[];
  onClick?: (id: string | number) => void;
}

const TabsStyled = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
`;

const TabStyled = styled.div`
padding: 16px 16px;
border: 1px solid transparent;
cursor: pointer;
transition: all 0.15s;
`;
const TabLabel = styled(TabStyled)`
&.active,
&:hover{
    border-bottom: 1px solid orange
   }
`;

const Tabs: React.FC<ITabsProps> = ({
  selectedId,
  tabs,
  onClick,
}) => (
  <TabsStyled>
    {
                tabs && tabs.map((tab) => (
                  <TabStyled
                    key={tab.id}
                    onClick={() => onClick(tab.id)}

                  >
                    <TabLabel className={selectedId === tab.id ? 'active' : ''}>
                      {tab.label}
                    </TabLabel>
                  </TabStyled>
                ))
            }
  </TabsStyled>
);

export default Tabs;
