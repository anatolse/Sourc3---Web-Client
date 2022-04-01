/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';

import { Button, Input, Popup } from '@app/shared/components';

import { CancelIcon, ArrowRightIcon, RemoveIcon } from '@app/shared/icons';

import { useDispatch, useSelector } from 'react-redux';
import { deleteWallet } from '@app/containers/Settings/store/actions';
import { selectErrorMessage } from '@app/shared/store/selectors';

interface RemovePopupProps {
  visible?: boolean;
  onCancel?: React.MouseEventHandler;
}

const RemovePopup: React.FC<RemovePopupProps> = ({ visible, onCancel }) => {
  const inputRef = useRef<HTMLInputElement>();
  const [warned, setWarned] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectErrorMessage());

  const handleConfirm: React.MouseEventHandler = () => {
    if (warned) {
      const { value } = inputRef.current;
      dispatch(deleteWallet.request(value));
    } else {
      setWarned(true);
    }
  };

  const confirmButton = warned ? (
    <Button pallete="orange" onClick={handleConfirm}>
      Quit
    </Button>
  ) : (
    <Button pallete="orange" onClick={handleConfirm}>
      Quit
    </Button>
  );

  return (
    <Popup
      visible={visible}
      title="Quit current account"
      footer
      cancelButton={(
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      )}
      confirmButton={confirmButton}
      onCancel={onCancel}
    >
      {' '}
      <p>
        Use your password to confirm erasing your current account
      </p>
      {warned ? (
        <Input label={!error ? 'Password' : error} type="password" ref={inputRef} valid={!error} />
      ) : (
        <>
          {' '}
          <p>
            Are you sure you want to quit your account?
          </p>
          <p>
            {' '}
            All data will be erased. Make sure you’ve saved your
            seed phrase if you want to restore this account later on.
          </p>

        </>
      )}
    </Popup>
  );
};

export default RemovePopup;
