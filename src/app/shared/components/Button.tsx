import React from 'react';
import { styled } from '@linaria/react';
import { ButtonVariant, Pallete } from '@core/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.FC;
  pallete?: Pallete;
  variant?: ButtonVariant;
}

const BaseButtonStyled = styled.button<ButtonProps>`
  &[disabled] {
    opacity: 0.5;

    &:hover,
    &:active {
      box-shadow: none !important;
      cursor: not-allowed !important;
      
    }
  }
`;

const ButtonStyled = styled(BaseButtonStyled)`
  display: block;
  width: 100%;
  max-width: 263px;
  height:48px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${({ pallete }) => `var(--color-${pallete})`};
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: var(--color-white);

  &:hover,
  &:active {
    box-shadow: 0 0 8px rgba(255, 150, 20, 0.5);
    cursor: pointer;
  }

  > svg {
    vertical-align: sub;
    margin-right: 10px;
  }
`;
const MenuStyle = styled(BaseButtonStyled)`
  display: block;
  width: 100%;
  max-width: 254px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 22px;
  background-color: ${({ pallete }) => `var(--color-${pallete})`};
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: var(--color-black);

  &:hover,
  &:active {
    box-shadow: 0 0 8px white;
    cursor: pointer;
    border-bottom: 2px solid orange
  }
  & active{
    border-bottom: 2px solid orange
  }

  > svg {
    vertical-align: sub;
    margin-right: 10px;
  }
`;

const GhostButtonStyled = styled(ButtonStyled)`
  background-color: var(--color-red);
  color: white;

  &:hover,
  &:active {
    box-shadow: 0 0 8px rgba(236, 26, 20, 0.5);
    // background-color: rgba(236, 26, 20, 1);
  }
`;
const AgreeButtonStyled = styled(GhostButtonStyled)`
  background-color: var(--color-green);
  color: white;

  &:hover,
  &:active {
    box-shadow: 0 0 8px rgba(41, 145, 20, 0.5);
    background-color: rgba(20, 72, 31, 1);
  }
`;

const BlockButtonStyled = styled(ButtonStyled)`
  width: 155px;
  max-width: none;
  border-radius: 10px;
  background-color: ${({ pallete }) => `var(--color-${pallete})`};
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  color: white;
  > svg {
    vertical-align: bottom;
    margin-right: 10px;
  }
  &:hover,
  &:active {
    // background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 8px rgba(255, 150, 20, 0.5);
  }
`;

const IconButtonStyled = styled(BaseButtonStyled)`
  display: inline-block;
  vertical-align: sub;
  line-height: 0;
  margin: 0 10px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ pallete }) => `var(--color-${pallete})`};

  > svg {
    vertical-align: sub;
  }
`;

const LinkButtonStyled = styled(IconButtonStyled)`
  margin: 0 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ pallete }) => `var(--color-${pallete})`};
`;
const SwitchButtonStyled = styled(IconButtonStyled)`
  margin: 0 0;
  font-size: 16px;
  font-weight: 800;
  color: ${({ pallete }) => `var(--color-${pallete})`};
`;
const LinkDropButtonStyled = styled(GhostButtonStyled)`
background-color: rgba(255,255,255,0.03);
border-radius: 0;
font-size: 16px;
text-align: left;
line-height: 16px;
font-weight: 500;
padding: 2px  16px;
margin: 0;
height: 40px;
letter-spacing: 0.1px;
  color: ${({ pallete }) => `var(--color-${pallete})`};

  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
  }
  > svg {
    vertical-align: bottom;
    margin-right: 10px;
  }
`;

const EyeStyle = styled(IconButtonStyled)`
position: absolute;
    top: 11px;
    right: 2px;
 &:hover,
 &:active{
 > svg > path {
    fill: rgba(0,0,0,1);
}
`;

const SettingButtonStyled = styled(GhostButtonStyled)`
width: 100%;
max-width: none;
height: 72px;
background-color: rgba(255,255,255,0.03);
border-radius: 0;
font-size: 16px;
text-align: left;
letter-spacing: 0.1px;
border-bottom: 1px solid rgba(0,0,0, 0.05);
  color: ${({ pallete }) => `var(--color-${pallete})`};

  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
  }
  > svg {
    vertical-align: bottom;
    margin-right: 10px;
  }
`;

const VARIANTS = {
  regular: ButtonStyled,
  ghost: GhostButtonStyled,
  link: LinkButtonStyled,
  icon: IconButtonStyled,
  block: BlockButtonStyled,
  agree: AgreeButtonStyled,
  menu: MenuStyle,
  eye: EyeStyle,
  setting: SettingButtonStyled,
  switch: SwitchButtonStyled,
  iconDropMenu: SwitchButtonStyled,
  linkDrop: LinkDropButtonStyled,

};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  pallete = 'orange',
  variant = 'regular',
  icon: IconComponent,
  children,
  ...rest
}) => {
  const ButtonComponent = VARIANTS[variant];

  return (
    <ButtonComponent type={type} pallete={pallete} {...rest}>
      {!!IconComponent && <IconComponent />}
      {children}
    </ButtonComponent>
  );
};

export default Button;
