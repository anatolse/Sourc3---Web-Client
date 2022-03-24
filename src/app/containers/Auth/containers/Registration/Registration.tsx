import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';

import {
  Window, Popup, Button, Footer,
} from '@app/shared/components';

import { ROUTES } from '@app/shared/constants';

import { DoneIcon } from '@app/shared/icons';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateRegistrationSeed } from '@app/containers/Auth/store/actions';
import { selectRegistrationSeed } from '@app/containers/Auth/store/selectors';
import { RegistrationWarning } from '../../components';

const SeedListStyled = styled.ol`
  counter-reset: counter;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 14px;
  position: absolute;
    left: 0;

  > li {
    counter-increment: counter;
    display: inline-block;
    min-width: 115px;
    height: 20px;
    line-height: 30px;
    margin-bottom: 32px;
    border-radius: 16px;
    text-align: left;
    font-weight: 600;
    font-size: 16px;

    &:before {
      display: inline-block;
      content: counter(counter);
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin: 5px 10px 5px 9px;
      border-radius: 50%;
      background-color: black;
      text-align: center;
      font-size: 10px;
      color: white;
    }
`;

const Registration: React.FC = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seed = useSelector(selectRegistrationSeed());
  const [isRegistrationWarning, setRegistrationWarning] = useState(!location.search);
  const [warningVisible, toggleWarning] = useState(false);

  // const handleSkipClick: React.MouseEventHandler = () => {
  //   navigate(ROUTES.AUTH.SET_PASSWORD);
  // };

  useEffect(() => {
    dispatch(generateRegistrationSeed.request());
  }, [dispatch]);

  const handleNextClick: React.MouseEventHandler = () => {
    navigate(ROUTES.AUTH.REGISTRATION_CONFIRM);
  };

  const handleCancel: React.MouseEventHandler = () => {
    toggleWarning(false);
  };

  const handlePrevious: React.MouseEventHandler = () => {
    navigate(ROUTES.AUTH.BASE);
  };

  const AuthInfo = styled.p`
opacity: 0.5;
text-align: left;
line-height:20px;
font-size: 14px;
`;

  return !isRegistrationWarning ? (
    <>
      <Window padding="auth" type="auth" title="Secret phrase" onPrevious={handlePrevious}>
        <AuthInfo>
          Copy the words of the secret phrase.
          <br />
          The order is important.
        </AuthInfo>
        <SeedListStyled>
          {seed.split(' ').map((value, index) => (
            // eslint-disable-next-line
            <li key={index}>{value}</li>
          ))}
        </SeedListStyled>
        <Footer margin="large">
          <Button type="button" onClick={() => toggleWarning(true)}>
            Confirm Phrase
          </Button>
        </Footer>
      </Window>
      <Popup
        visible={warningVisible}
        title="Save secret phrase"
        footer
        confirmButton={(
          <Button icon={DoneIcon} onClick={handleNextClick}>
            done
          </Button>
        )}
        onCancel={handleCancel}
      >
        Please write the secret phrase down. Storing it in a file makes it prone to cyber attacks and, therefore, less
        secure.
      </Popup>
    </>
  ) : (
    <RegistrationWarning onClick={() => setRegistrationWarning(false)} />
  );
};

export default Registration;
