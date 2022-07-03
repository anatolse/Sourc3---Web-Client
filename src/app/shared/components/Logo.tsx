import React from 'react';
import { css } from '@linaria/core';

import { IconLogoLarge, LogoIcon } from '@app/shared/icons';

interface LogoProps {
  size?: 'large' | 'small' | 'icon';
}

const LogoClassName = css`
    display: block
    position: absolute;
    left: 95px;
    top: 99px;
`;
const smallLogoClassName = css``;

const DIMENSIONS = {
  large: {
    width: 207,
    height: 75,
  },
  small: {
    width: 100,
    height: 100,
  },
  icon: {
    width: 100,
    height: 35,
  },
};

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const viewBox = '0 0 207 75';
  const dimensions = DIMENSIONS[size];
  return size === 'icon' ? (
    <LogoIcon {...dimensions} className={smallLogoClassName} />
  ) : (
    <IconLogoLarge {...dimensions} viewBox={viewBox} className={LogoClassName} />
  );
};

export default Logo;
