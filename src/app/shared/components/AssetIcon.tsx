import React from 'react';

import { WalletTotal } from '@core/types';

import {
  IconSR3Asset, Sourc3Icon, IconLittleSC3, AssetIcon as AssetIconSvg,
} from '@app/shared/icons';

import { styled } from '@linaria/react';
import { PALLETE_ASSETS } from '@app/shared/constants';

export interface AssetIconProps extends Partial<WalletTotal> {
  asset_id?: number;
  className?: string;
  size?: 'small' | 'large' | 'little';
}

const ContainerStyled = styled.div<AssetIconProps>`
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  color: ${({ asset_id }) => (PALLETE_ASSETS[asset_id] ? PALLETE_ASSETS[asset_id] : PALLETE_ASSETS[asset_id % PALLETE_ASSETS.length])};
`;

const AssetIcon: React.FC<AssetIconProps> = ({
  asset_id = 0, className,
  size = 'small',
}) => {
  // const iconSC3 = (size === 'large' ? IconSR3Asset : Sourc3Icon);
  const iconSC3 = () => {
    switch (size) {
      case 'large': {
        return IconSR3Asset;
      }
      case 'little': {
        return IconLittleSC3;
      }
      default: {
        return Sourc3Icon;
      }
    }
  };
  const IconComponent = asset_id === 0 ? iconSC3() : AssetIconSvg;
  return (
    <ContainerStyled asset_id={asset_id} className={className}>
      <IconComponent />
    </ContainerStyled>
  );
};

export default AssetIcon;
