import React, { useState } from 'react';
import { styled } from '@linaria/react';

import {
  Button, Footer, Popup, Window,
} from '@app/shared/components';
import { ArrowRightIcon } from '@app/shared/icons';

import { ROUTES } from '@app/shared/constants';
import { useNavigate } from 'react-router-dom';
import { SeedList } from '@app/containers/Auth/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectSeedIds, selectRegistrationSeed } from '@app/containers/Auth/store/selectors';
import { generateRegistrationSeed } from '@app/containers/Auth/store/actions';

const SEED_CONFIRM_COUNT = 6;

const RegistrationConfirm: React.FC = () => {
  const dispatch = useDispatch();
  const seed = useSelector(selectRegistrationSeed()).split(' ');
  const ids = useSelector(selectSeedIds());
  const navigate = useNavigate();
  const [warningVisible, toggleWarning] = useState(false);
  const [errors, setErrors] = useState(new Array(SEED_CONFIRM_COUNT).fill(null));
  const valid = errors.every((value) => value === true);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const index = parseInt(name, 10);
    const result = seed[index] === value;
    const target = ids.indexOf(index);

    if (!value) {
      const next = errors.slice();
      next[target] = null;
      setErrors(next);
      return;
    }

    if (errors[target] !== result) {
      const next = errors.slice();
      next[target] = result;
      setErrors(next);
    }
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    navigate(ROUTES.AUTH.SET_PASSWORD);
  };

  const handlePrevious: React.MouseEventHandler = () => {
    dispatch(generateRegistrationSeed.request());
    navigate(`${ROUTES.AUTH.REGISTRATION}?do_not_show_warn=true`);
  };
  const AuthInfo = styled.p`
opacity: 0.5;
text-align: left;
line-height:20px;
font-size: 14px;
`;

  return (
    <Window
      type="auth"
      padding="auth"
      title="Confirmation"
      onPrevious={() => toggleWarning(true)}
    >
      <AuthInfo>
        Enter the words from the secret phrase corresponding the numbers shown below.
        You can skip the confrimation.
      </AuthInfo>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <SeedList indexByValue data={ids} errors={errors} onInput={handleInput} />
        <Footer>
          <Button type="submit" disabled={!valid} icon={ArrowRightIcon}>
            next
          </Button>
        </Footer>
      </form>

      <Popup
        visible={warningVisible}
        title="Back to seed phrase"
        footerClass="justify-right"
        footer
        confirmButton={(
          <Button type="button" onClick={handlePrevious}>
            generate
          </Button>
        )}
        onCancel={() => toggleWarning(false)}
      >
        Your current seed will become obsolete and the new seed will be generated
      </Popup>
    </Window>
  );
};

export default RegistrationConfirm;
