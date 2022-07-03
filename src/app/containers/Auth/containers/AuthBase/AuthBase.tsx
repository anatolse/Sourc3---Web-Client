import React, { useEffect, useState } from 'react';
import {
  Popup, Splash, Button, Footer,
} from '@app/shared/components';
import { ROUTES } from '@app/shared/constants';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetRestoreState } from '@app/containers/Auth/store/actions';

// TODO check auth state after delete wallet
const AuthBase: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRestoreState());
  }, [dispatch]);

  const [warningVisible, toggleWarning] = useState(false);

  return (
    <>
      <Splash blur={warningVisible} size="large">
        <Footer margin="small">
          <Button type="button" onClick={() => toggleWarning(true)}>
            Login
          </Button>
          <Button variant="link" onClick={() => navigate(ROUTES.AUTH.REGISTRATION)}>
            New user
          </Button>
        </Footer>
      </Splash>
      <Popup
        visible={warningVisible}
        title="Restore web client"
        confirmButton={(
          <Button pallete="orange" onClick={() => navigate(ROUTES.AUTH.RESTORE)}>
            I agree
          </Button>
        )}
        onCancel={() => toggleWarning(false)}
        footer
      >
        <p>You are trying to restore an existing SOURC3 web client.</p>
        <p>
          Please notice that if you use your client on another device, your balance will be up to date, but transaction
          history and addresses will be kept separately on each device.
        </p>
      </Popup>
    </>
  );
};

export default AuthBase;
