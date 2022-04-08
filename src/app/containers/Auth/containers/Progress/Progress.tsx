import React from 'react';
import { styled } from '@linaria/react';

import { Splash } from '@app/shared/components';

import { useSelector } from 'react-redux';
import {
  selectWalletSyncState,
  selectSyncStep,
  selectDatabaseSyncProgress,
  selectDownloadDbProgress,
} from '@app/containers/Auth/store/selectors';
import { SyncStep } from '@app/containers/Auth/interfaces';
import { ProgressBar } from '../../../../shared/components';

// const TitleStyled = styled.h2`
//   margin-top: 50px;
//   font-size: 16px;
// `;

const SubtitleStyled = styled.h3`
  height: 16px;
  margin: 32px 0;
  color: rgba(0,0,0, 0.5);
  font-size: 16px;
  font-weight: 600;
`;

const ProgressContainer = styled.div`
position: absolute;
    top: 395px;
    left: 25px;
`;

// const wallet = WasmWallet.getInstance();

const Progress = () => {
  const syncProgress = useSelector(selectWalletSyncState());
  const syncStep = useSelector(selectSyncStep());
  const databaseSyncProgress = useSelector(selectDatabaseSyncProgress());
  const downloadDbProgress = useSelector(selectDownloadDbProgress());

  const getSyncPercent = () => {
    switch (syncStep) {
      case SyncStep.DOWNLOAD: {
        const percent = downloadDbProgress.total / downloadDbProgress.done;
        const title = 'Downloading blockchain info';
        return { percent, title };
      }
      case SyncStep.RESTORE: {
        const percent = databaseSyncProgress.total / databaseSyncProgress.done;
        const title = 'Unpack blockchain info';
        return { percent, title };
      }
      case SyncStep.SYNC: {
        const percent = syncProgress.sync_requests_total / syncProgress.sync_requests_done;
        const title = 'Syncing with blockchain';
        return { percent, title };
      }
      default: {
        const percent = syncProgress.sync_requests_total / syncProgress.sync_requests_done;
        const title = 'Syncing with blockchain';
        return { percent, title };
      }
    }
  };

  const { percent, title } = getSyncPercent();
  const syncPercent = Math.floor(100 / percent);

  const active = percent > 0;
  const progress = `${title} ${syncPercent}%`;

  return (
    <Splash size="large">
      <ProgressContainer>
        {/* <TitleStyled>Loading</TitleStyled> */}
        <SubtitleStyled>{active && progress}</SubtitleStyled>
        <ProgressBar active={active} percent={syncPercent} />
      </ProgressContainer>
      {/* <Footer>
        { loading && (
        <Button variant="ghost" icon={CancelIcon} onClick={handleCancelClick}>
          cancel
        </Button>
        ) }
      </Footer> */}
    </Splash>
  );
};

export default Progress;
