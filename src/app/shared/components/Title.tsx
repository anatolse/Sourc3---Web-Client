import React from 'react';
import { styled } from '@linaria/react';

interface TitleProps {
  variant?: 'regular' | 'subtitle' | 'heading' | 'auth' | 'page',
  className?: string
}

const STYLE_BASE = {
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  textAlign: 'left',
  letterSpacing: 1,
  color: 'black',
};

const HeadingStyled = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 24px;
  margin: 16px 0 0 24px;
  width:220px;
  height: 24px;
  text-align:left;
  letter-spacing: 0.3px;
`;
const PageStyled = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 24px;
  margin: 16px 0 0 60px;
  width:auto;
  height: 24px;
  text-align:left;
  letter-spacing: 0.3px;
`;

const AuthTitleStyled = styled.h2`
position: absolute;
    font-size: 24px;
    font-weight: 900;
    line-height: 30px;
    width: 100%;
    height: 30px;
    text-align: center;
    top: 97px;
    left: 0;
    margin:0;
`;

const TitleStyled = styled.h3`
  ${STYLE_BASE}
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.1px;
`;

const SubtitleStyled = styled.h4`
  ${STYLE_BASE}
  opacity: 0.5;
  margin-bottom: 10px;
`;

const VARIANTS = {
  regular: TitleStyled,
  subtitle: SubtitleStyled,
  heading: HeadingStyled,
  auth: AuthTitleStyled,
  page: PageStyled,
};

const Title: React.FC<TitleProps> = ({ variant = 'regular', children, className }) => {
  const TitleComponent = VARIANTS[variant];
  return <TitleComponent className={className}>{children}</TitleComponent>;
};

export default Title;
