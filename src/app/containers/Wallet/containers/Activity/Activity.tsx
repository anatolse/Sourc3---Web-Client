/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { Transactions } from '@app/containers/Transactions';

import { Window } from '@app/shared/components';
import { ITab } from '@app/shared/components/Tabs';

interface ActivityProps {
  id?: string | number
  active?:boolean,
}

const tabs: ITab[] = [
  { id: 1, label: 'Activity', active: true },
  { id: 2, label: 'Transactions', active: false },
];

const WrapperNav = styled.ul<ActivityProps>`
  position: absolute;
  top: 73px;
  left: 47px;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  display: flex;

    &>li:not(:first-child){
      margin-left:40px;
    }
`;
const NavItem = styled.li<ActivityProps>`
color: ${({ active }) => (active ? '#FF791F' : 'rgba(0,0,0, 0.2)')};
cursor: pointer;  
`;
const Frame = styled.div`
position: absolute;
    top: 115px;
    left: 0;
    background: white;
    width: 100%;
`;

const Activity = () => {
  const [selectedId, setSelectedId] = useState(2);
  const toggleTabs = (idx) => {
    setSelectedId(idx);
  };

  const renderContent = (i) => {
    switch (i) {
      case 1:
        return (
          <Frame>
            <p>Activity</p>
          </Frame>
        );
      case 2:
        return (
          <Frame>
            <Transactions />
          </Frame>
        );
      default: return (
        <><p>Activity</p></>
      );
    }
  };
  return (
    <Window type="pageMain">
      <>
        <WrapperNav>
          <NavItem
            active={selectedId === 1}
            onClick={() => (toggleTabs(1))}
          >
            Activity
          </NavItem>
          <NavItem
            active={selectedId === 2}
            onClick={() => (toggleTabs(2))}
          >
            Transaction
          </NavItem>
        </WrapperNav>
        {renderContent(selectedId)}
      </>
    </Window>
  );
};

export default Activity;
