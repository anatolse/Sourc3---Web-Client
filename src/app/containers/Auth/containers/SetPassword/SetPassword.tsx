import React, { useRef, useState } from 'react';
import { styled } from '@linaria/react';

import {
  Window, Button, Input, Footer, Popup,
} from '@app/shared/components';

import { createWallet } from '@core/api';

import { ROUTES } from '@app/shared/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRegistrationSeed, selectIsRestore } from '@app/containers/Auth/store/selectors';
import { PasswordStrength } from '../../components';

const FormStyled = styled.form`
  text-align: left;

  > ul {
    margin-bottom: 30px;
    padding-left: 20px;
  }
`;

const SetPassword = () => {
  const [pass, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [warningVisible, toggleWarning] = useState(false);
  const seed = useSelector(selectRegistrationSeed());
  const restoring = useSelector(selectIsRestore());

  const navigate = useNavigate();

  const matched = pass === confirm;
  const valid = confirm === '' || matched;
  const ready = pass !== '' && matched;

  const error = valid ? null : 'Passwords do not match';

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    createWallet({
      seed,
      password: pass,
      isSeedConfirmed: true,
    });

    navigate(ROUTES.AUTH.PROGRESS);
  };

  const handlePrevious: React.MouseEventHandler = () => {
    if (restoring) {
      navigate(ROUTES.AUTH.RESTORE);
    } else {
      toggleWarning(true);
    }
  };

  const handleReturnClick: React.MouseEventHandler = () => {
    navigate(`${ROUTES.AUTH.REGISTRATION}?do_not_show_warn=true`);
  };

  const AuthInfo = styled.p`
  opacity: 0.5;
  text-align: left;
  line-height:20px;
  font-size: 14px;
  `;

  return (
    <>
      <Window padding="auth" type="auth" title="Password" onPrevious={handlePrevious}>
        <FormStyled onSubmit={handleSubmit}>
          <AuthInfo>
            Enter a strong password.
            The password is specific to each client and is only store locally.

          </AuthInfo>
          <Input
            autoFocus
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            password
            margin={16}
          />
          <Input
            type="password"
            valid={valid}
            label={error}
            placeholder="Confirm your password"
            onChange={(e) => setConfirm(e.target.value)}
            password={!!useRef}
          />
          {pass && <PasswordStrength value={pass} />}
          <Footer>
            <Button type="submit" disabled={!ready}>
              Get started!
            </Button>
          </Footer>
        </FormStyled>
      </Window>
      <Popup
        visible={warningVisible}
        title="Return to seed phrase"
        confirmButton={(
          <Button onClick={handleReturnClick}>
            Return
          </Button>
        )}
        onCancel={() => toggleWarning(false)}
        footer
      >
        If you return to seed phrase, it would be changed and your local password won’t be saved.
      </Popup>
    </>
  );
};

export default SetPassword;
