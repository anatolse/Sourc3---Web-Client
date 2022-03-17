import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { IconQuestion } from '@app/shared/icons';
import { Button, Popup } from '@app/shared/components';

const STRENGTH_CRITERIA = [
  /^.{10,63}$/, // at least 10 chars
  /^(?=.*?[a-z])/, // at least 1 lower case char
  /^(?=.*?[A-Z])/, // at least 1 upper case char
  /^(?=.*?[0-9])/, //  at least 1 digit
  /^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/, // at least 1 special char
];

function getStrengthTitle(value: number) {
  switch (value) {
    case 6:
      return 'Very strong';
    case 5:
      return 'Strong';
    case 3:
      return 'Medium strength';
    case 2:
      return 'Weak';
    case 1:
      return 'Very Weak';
    default:
      return null;
  }
}

function ratePassword(password: string): number {
  return STRENGTH_CRITERIA.reduce((result, regExp) => {
    const unit = regExp.test(password) ? 1 : 0;
    const bonus = result === 4 ? 1 : 0;
    return result + unit + bonus;
  }, 0);
}

interface PasswordStrengthProps {
  value: string;
}

const BARS_MAX = 6;

const ContainerStyled = styled.div`
  position: relative;
  height: 40px;
  margin: 20px 0;
`;

const ListStyled = styled.ol`
  display: flex;
  align-content: stretch;
  align-items: center;
  margin: 0 -4px;
`;

const ListItemStyled = styled.li<{ points: number }>`
  flex-grow: 1;
  height: 6px;
  margin: 0 2px;
  // border-radius: 3px;
  width: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-width: ${({ points }) => (points > 0 ? 0 : 1)}px;
  background-color: ${({ points }) => {
    switch (true) {
      case points >= 5:
        return 'var(--color-black)';
      case points === 3:
        return 'var(--color-black)';
      case points === 0:
        return 'rgba(0, 0, 0, 0.1)';
      default:
        return 'var(--color-black)';
    }
  }};
`;

const StrengthTitleStyled = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const IconItem = styled.li`
margin-left: 52px
`;
const ParagraphStyled = styled.p`
opacity: 0.5;
text-align: left;
line-height:20px;
font-size: 14px;
font-weight:500;
width: 80%
position: absolute;
top: 18px;
left: 24px;
`;

const PopupListStyled = styled.ol`
list-style: square;
color: rgba(0, 0, 0, 0.5);
text-align: left;
line-height:20px;
font-size: 14px;
margin-left: 24px;
`;

const PopupListItemStyled = styled.li`
`;

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ value }) => {
  const points = ratePassword(value);
  const title = getStrengthTitle(points);
  const bars = new Array(BARS_MAX).fill(null).map((v, index) => (index < points ? points : 0));
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <>
      {' '}
      <ContainerStyled>
        <ListStyled>
          {bars.map((p, index) => (
            <ListItemStyled key={index} points={p} />
          ))}
          <IconItem><Button variant="icon" icon={IconQuestion} onClick={() => setPopupVisible(true)} /></IconItem>
        </ListStyled>
        {title && (
        <StrengthTitleStyled>
          {title}
          {' '}
          password
        </StrengthTitleStyled>
        )}
      </ContainerStyled>
      <Popup
        visible={popupVisible}
        onCancel={() => setPopupVisible(false)}
      >
        <ParagraphStyled>Strong password needs to meet the following requirements:</ParagraphStyled>
        <br />
        <PopupListStyled>
          <PopupListItemStyled>the length must be at least 10 characters</PopupListItemStyled>
          <PopupListItemStyled>must contain at least one lowercase letter</PopupListItemStyled>
          <PopupListItemStyled>must contain at least one uppercase letter</PopupListItemStyled>
          <PopupListItemStyled>must contain at least one number</PopupListItemStyled>
        </PopupListStyled>
      </Popup>
    </>
  );
};

export default PasswordStrength;
