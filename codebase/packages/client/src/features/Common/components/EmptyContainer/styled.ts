import { textXS, textXX } from 'styles';
import styled from 'styled-components';
import Icon from '@beans/icon';

import Media from 'styles/media';
import { Level, LevelProps } from './config';
import { AppTheme } from 'theme';

const levelColor = (theme: AppTheme, level: Level) => {
  switch (level) {
    case Level.ERROR:
      return theme.colors.error;
    case Level.WARNING:
      return theme.colors.warning;
    case Level.INFO:
    default:
      return theme.colors.text.dark;
  }
};

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Media.small_desktop`
     padding: 30px 0;
  `}
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  ${Media.small_desktop`
     margin-bottom: 24px;
  `}
`;

const Description = styled.div<LevelProps>`
  margin-right: 12px;
  color: ${({ theme, level }) => levelColor(theme, level)};
  ${textXS};
  font-weight: bold;

  ${Media.small_desktop`
     margin-right: 22px;
     font-size: 22px;
     line-height: 40px;
  `}
`;

const StyledIcon = styled(Icon)`
  stroke-width: 2.2;
`;

const Explanation = styled.div`
  text-align: center;
  ${textXX};
  color: ${({ theme }) => theme.colors.grayscale};

  ${Media.large_phone`
    max-width: 420px;
  `}

  ${Media.tablet`
    max-width: 554px;
  `}

  ${Media.small_desktop`
     margin-bottom: 0;
     font-size: 20px;
     line-height: 28px;
  `}
`;

export { Wrapper, Inner, Description, StyledIcon, Explanation };
