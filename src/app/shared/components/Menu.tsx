import React from 'react';

import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { IconProfile, IconSettings } from '@app/shared/icons';

import { ROUTES } from '@app/shared/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

const MENU_ITEMS = [
  {
    title: 'Wallet',
    value: ROUTES.WALLET.PROFILE,
    icon: IconProfile,
  },
  // {
  //   title: 'UTXO',
  //   value: View.UTXO,
  // },
  {
    title: 'Settings',
    value: ROUTES.SETTINGS.BASE,
    icon: IconSettings,
  },
];

const ContainerStyled = styled.nav`
position: absolute;
width: 95px;
right: 0;
`;

const ListStyled = styled.ul`
display: flex;
width: 95px;
align-items: center;
justify-content: flex-end;
margin: 12px 0;
`;
const ListItemStyled = styled.li`
`;

const buttonStyle = css`
  position: absolute;
  top: 24px;
  left: 24px;
  margin: 0;
`;

interface MenuProps {
  onCancel?: React.MouseEventHandler;
}

const Menu: React.FC<MenuProps> = ({ onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick: React.MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    const index = parseInt(currentTarget.dataset.index, 10);
    navigate(MENU_ITEMS[index].value);
  };

  return (
    // <ContainerStyled>
    //   <ListStyled>
    //     {MENU_ITEMS.map(({ title, value }, index) => (
    //       <ListItemStyled key={value} active={location.pathname === value} data-index={index} onClick={handleClick}>
    //         {title}
    //       </ListItemStyled>
    //     ))}
    //   </ListStyled>
    // </ContainerStyled>
    <ContainerStyled>
      <ListStyled>
        {/* <ListItemStyled>
        Profile
      </ListItemStyled>
      <ListItemStyled>
        <Button variant="link" icon={IconSettings} />
      </ListItemStyled> */}
        {MENU_ITEMS.map(({ title, value, icon }, index) => (
          <ListItemStyled key={value} data-index={index} onClick={handleClick}>
            <Button variant="icon" icon={icon} />
          </ListItemStyled>
        ))}
      </ListStyled>
    </ContainerStyled>
  );
};

export default Menu;
