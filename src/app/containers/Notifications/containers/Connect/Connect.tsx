import React from 'react';
import { styled } from '@linaria/react';
import NotificationController from '@core/NotificationController';
import { approveConnection, rejectConnection } from '@core/api';

import { Button } from '@app/shared/components';

const StyledTitle = styled.div`
  margin: 50px auto;
  font-size: 18px;
  width: 250px;
  text-align: center;
`;

const StyledMessage = styled.div`
  margin: 0 20px 20px 20px;
  font-size: 16px;
  text-align: center;
`;

const StyledApprove = styled.div`
  margin: 0 20px 30px 20px;
  text-align: center;
  font-size: 16px;
`;

const Connect = () => {
  const notification = NotificationController.getNotification();

  window.addEventListener('beforeunload', () => {
    rejectConnection();
  });

  return (
    <>
      <StyledTitle>Sourc3 web client connection request</StyledTitle>
      <StyledMessage>
        <b>
          {notification.params.appname}
          {' '}
        </b>
        is trying to connect
        <br />
        to the SOURCE Web Client.
      </StyledMessage>
      <StyledApprove>Approve connection?</StyledApprove>
      <Button
        type="button"
        onClick={() => {
          approveConnection(
            notification.params.apiver,
            notification.params.apivermin,
            notification.params.appname,
            notification.params.appurl,
          );
          window.close();
        }}
      >
        Approve
      </Button>
      <Button
        type="button"
        onClick={() => {
          window.close();
        }}
      >
        Reject
      </Button>
    </>
  );
};

export default Connect;
