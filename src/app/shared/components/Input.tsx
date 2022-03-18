import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { Button } from '.';
import { EyeIcon, IconEye } from '../icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valid?: boolean;
  variant?: 'regular' | 'gray' | 'amount';
  pallete?: 'purple' | 'blue' | 'corn-flower-blue' | 'black';
  margin?: 'none' | 'large';
  password?: boolean;
}

const ContainerStyled = styled.div<InputProps>`
  position: relative;
  min-height: 53px;
  margin-bottom: ${({ margin }) => (margin === 'none' ? 0 : 50)}px;
`;

const InputStyled = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  line-height: 31px;
  border: none;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 16px;
  color: black;
  font-family: Verdana, Geneva, sans-serif;
    letter-spacing: -.75px;
  border-radius: 8px;
  caret-color: orange;
  padding: 0 41px 0 10px;

  &::placeholder {
    font-family: Visby;
    color: black;
    opacity: 0.5;
    font-size: 16px;
    transform: translateX(1px);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputRegularStyled = styled(InputStyled)`
&:focus{
  border-color: ${({ valid }) => (valid ? ' rgba(0, 0, 0)' : 'var(--color-red)')};
  }
`;

const InputGrayStyled = styled(InputStyled)`
  border-width: 1px;
  border-color: ${({ valid }) => (valid ? 'rgba(255,255,255,0.3)' : 'var(--color-red)')};
`;

const InputAmountStyled = styled(InputGrayStyled)<{ pallete: string }>`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.34px;
  color: ${({ pallete }) => `var(--color-${pallete})`};
`;

const LabelStyled = styled.div<InputProps>`
  margin-top: 4px;
  // font-family: SFProDisplay;
  padding: 10px
  font-size: 14px;
  font-style: italic;
  color: ${({ valid }) => (valid ? 'var(--color-gray)' : 'var(--color-red)')};
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label, valid = true, variant = 'regular', margin = 'none', pallete, className, password, ...rest
  }, ref) => {
    const InputComponent = {
      regular: InputRegularStyled,
      gray: InputGrayStyled,
      amount: InputAmountStyled,
    }[variant];
    const [passwordShown, setPasswordShown] = useState(false);
    const handleShowPassword: React.MouseEventHandler = () => {
      setPasswordShown(!passwordShown);
    };

    return (
      <ContainerStyled className={className} margin={margin}>
        {password ? (
          <>
            <InputComponent
              ref={ref}
              valid={valid}
              pallete={pallete}
              {...rest}
              type={passwordShown ? 'text' : 'password'}
            />
            {!!ref && <LabelStyled valid={valid}>{label}</LabelStyled>}
            <Button
              type="button"
              variant="eye"
              icon={passwordShown ? EyeIcon : IconEye}
              onClick={handleShowPassword}
            />
          </>
        ) : (
          <>
            <InputComponent
              ref={ref}
              valid={valid}
              pallete={pallete}
              {...rest}
            />
            {!!label && <LabelStyled valid={valid}>{label}</LabelStyled>}
          </>
        )}
      </ContainerStyled>
    );
  },
);

export default Input;
