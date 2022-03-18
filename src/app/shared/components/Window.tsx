import React from 'react';
import { styled } from '@linaria/react';
// import { css } from '@linaria/core';
import { CancelIcon } from '@app/shared/icons';

import { useNavigate } from 'react-router-dom';

// import useOutsideClick from '@app/shared/hooks/OutsideClickHook';
// import { useDispatch, useSelector } from 'react-redux';
// import { actions } from '@app/shared/store';
// import { selectIsBalanceHidden } from '@app/shared/store/selectors';
import Logo from './Logo';
import Title from './Title';
import Button from './Button';
import Menu from './Menu';

interface WindowProps {
  title?: string;
  primary?: boolean;
  auth?: boolean
  padding?:'auth' | 'page';
  // pallete?: 'default' | 'blue' | 'purple';
  onPrevious?: React.MouseEventHandler | undefined;
}

// function getColor(auth: boolean): string {
//   switch (auth) {
//     case true:
//       return '130px 32px 30px';
//     default:
//       return '60px 0 30px';
//   }
// }

const ContainerStyled = styled.div<WindowProps>`
  position: relative;
  min-height: 600px;
  padding: ${({ padding }) => (padding === 'auth' ? '145px 32px 30px' : '60px 0 30px')};
  text-align: center;
  background: white;
`;

const HeadingStyled = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 375px;
  height: 56px;
  background-color: var(--color-white);
  border-bottom: 1px solid rgba(0,0,0, 0.05);

  // &:before {
  //   content: '';
  //   position: absolute;
  //   z-index: -1;
  //   top: 50px;
  //   left: 0;
  //   width: 100%;
  //   height: 100px;
  //   background-color: white;
  // }
`;

const FrameStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  // width: 375px;
  // height: 56px;
  text-align: left;
  margin:11px 0 0 24px;
  width:108px
`;

// const menuButtonStyle = css`
//   position: fixed;
//   z-index: 3;
//   top: 74px;
//   left: 12px;
//   margin: 0;
// `;

// const menuEyeStyle = css`
//   position: fixed;
//   z-index: 3;
//   top: 74px;
//   right: 12px;
//   margin: 0;
// `;

const CancelButton = styled.div`
position: absolute;
width: 25px;
right: 20px;
top: 18px;
`;

export const Window: React.FC<WindowProps> = ({
  title,
  primary = false,
  auth = false,
  children,
  onPrevious,
  padding = 'page',
}) => {
  // const dispatch = useDispatch();
  // const wrapperRef = useRef(null);
  // const { isOutside } = useOutsideClick(wrapperRef);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isOutside) {
  //     setIsOpened(false);
  //   }
  // }, [isOutside]);

  const handlePrevious: React.MouseEventHandler = () => {
    navigate(-1);
  };

  const handleBackClick = !onPrevious ? handlePrevious : onPrevious;

  return (
    <ContainerStyled padding={padding}>
      <HeadingStyled>
        { title && !auth ? (
          <Title variant="heading">{title}</Title>
        )
          : (
            <FrameStyled>
              <Logo size="icon" />
            </FrameStyled>
          )}
        { !title && primary ? (
          <Menu />
        ) : (
          <CancelButton>
            <Button variant="icon" icon={CancelIcon} onClick={handlePrevious} />
          </CancelButton>
        )}
      </HeadingStyled>
      {!primary && title && auth && (
        <Title variant="auth">{title}</Title>
      )}
      {/* {auth
        && <BackButton onClick={handleBackClick} />} */}
      { children }
    </ContainerStyled>
  );
};

export default Window;
