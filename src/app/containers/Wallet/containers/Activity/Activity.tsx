/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';

import { Window } from '@app/shared/components';

const TitleStyled = styled.h2`
position: absolute;
    top: 50px;
    left: 29px;
    font-weight: 900;
font-size: 24px;
line-height: 24px;
`;

const Activity = () => (
  <Window type="pageMain">
    <TitleStyled>Activity</TitleStyled>
  </Window>
);

export default Activity;
