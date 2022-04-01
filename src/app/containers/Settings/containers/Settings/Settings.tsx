/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as extensionizer from 'extensionizer';
import { styled } from '@linaria/react';

import {
  RemoveIcon, SettingsReportIcon, SettingsConnectedSites, IconReport, IconLockWallet,
} from '@app/shared/icons';

import { ROUTES } from '@app/shared/constants';

import { actions } from '@app/shared/store';
import { Button, Window } from '@app/shared/components';
import { useNavigate } from 'react-router-dom';
import { setError } from '@app/shared/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { loadLogs, loadVersion, loadConnectedSites } from '@app/containers/Settings/store/actions';
import { selectVersion } from '@app/containers/Settings/store/selectors';
import { RemovePopup } from '../../components';

const ContainerStyled = styled.div`
`;

const VersionStyled = styled.div`
  text-align: end;
  color: black;
  margin-bottom: 20px;
`;

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadVersion.request());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadConnectedSites.request());
  }, [dispatch]);

  const [warningVisible, toggleWarning] = useState(false);
  const versionData = useSelector(selectVersion());

  const manifest = extensionizer.runtime.getManifest();

  const ReportClicked = () => {
    dispatch(loadLogs.request());
    navigate(ROUTES.SETTINGS.SETTINGS_REPORT);
  };

  const ConnectedSitesClicked = () => {
    navigate(ROUTES.SETTINGS.SETTINGS_CONNECTED);
  };
  const stopWallet = () => {
    dispatch(actions.lockWallet());
  };
  const handleBackClick = () => {
    navigate(ROUTES.WALLET.BASE);
  };

  const version = `v ${manifest.version} (${versionData.beam_branch_name})`;

  return (
    <>
      <Window title="Settings" onPrevious={handleBackClick}>
        <ContainerStyled>
          {/* <VersionStyled>{version}</VersionStyled> */}
          <Button
            variant="setting"
            pallete="black"
            icon={IconLockWallet}
            onClick={() => stopWallet()}
          >
            Lock client
          </Button>
          <Button
            variant="setting"
            pallete="black"
            icon={IconReport}
            onClick={() => ReportClicked()}
          >
            Report a problem
          </Button>
          <Button
            variant="setting"
            pallete="black"
            icon={SettingsConnectedSites}
            onClick={() => ConnectedSitesClicked()}
          >
            Connected sites
          </Button>
          <Button
            variant="setting"
            pallete="red"
            icon={RemoveIcon}
            onClick={() => {
              dispatch(setError(null));
              toggleWarning(true);
            }}
          >
            Quit current account
          </Button>
        </ContainerStyled>
      </Window>
      <RemovePopup visible={warningVisible} onCancel={() => toggleWarning(false)} />
    </>
  );
};

export default Settings;
