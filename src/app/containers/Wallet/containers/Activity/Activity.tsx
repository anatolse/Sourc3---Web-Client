/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { Transactions } from '@app/containers/Transactions';

import { Window } from '@app/shared/components';
import { Content, TabItem, TabsMenu } from '@app/shared/components/TabsMenu';
import { profile } from '@app/shared/constants/profile';

const Activity = () => {
  const [selectedId, setSelectedId] = useState(2);
  const [data, setData] = useState([]);
  const toggleTabs = (idx) => {
    setSelectedId(idx);
  };
  useEffect(() => {
    if (localStorage.length === 0 || JSON.parse(localStorage.getItem('default')) === null) {
      localStorage.setItem('default', JSON.stringify(profile));
    }
    setData(JSON.parse(localStorage.getItem('default')));
  }, []);

  useEffect(() => {
    localStorage.setItem('default', JSON.stringify(data));
    const activePid = JSON.parse(localStorage.getItem('default')).filter((item) => item.active === true);
    chrome.storage.sync.set({ activePid }, () => {});
  }, [data]);

  const renderContent = (i) => {
    switch (i) {
      case 1:
        return (
          <Content>
            <p>Activity</p>
          </Content>
        );
      case 2:
        return (
          <Content>
            <Transactions />
          </Content>
        );
      default:
        return (
          <>
            <p>Activity</p>
          </>
        );
    }
  };
  return (
    <Window type="pageMain">
      <>
        <TabsMenu>
          <TabItem active={selectedId === 1} onClick={() => toggleTabs(1)}>
            Activity
          </TabItem>
          <TabItem active={selectedId === 2} onClick={() => toggleTabs(2)}>
            Transactions
          </TabItem>
        </TabsMenu>
        {renderContent(selectedId)}
      </>
    </Window>
  );
};

export default Activity;
