import styled from 'styled-components';
import { defaultUserState } from '../User';

export const Wrapper = styled.div`
  display: flex;
`;

export const ReactionsList = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
  border-radius: 19px;
  background-color: ${({ theme }) => theme.colors.background.darkest};

  & > :not(:first-child) {
    margin-left: 8px;
  }
`;

export const ReactionsItem = styled.div`
  display: flex;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

export const TotalCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

const Details = styled.div`
  position: absolute;
  bottom: 38px;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  padding: 8px;
  border-radius: 4px;
  box-shadow: 1px 1px 6px 0 ${({ theme }) => theme.colors.lines.base};
  display: none;
`;

export const CountDetails = styled(Details)``;

export const DetailsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const ReactionCount = styled(Details)`
  min-width: 40px;
  text-align: center;
`;

export const PostEmotionIcon = styled.div<{
  activeIconSrc: any;
  defaultIconSrc?: any;
  isActive?: boolean;
}>`
  overflow: hidden;
  border-radius: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const PostEmotionIconBig = styled(PostEmotionIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-image: url(${({ activeIconSrc, defaultIconSrc, isActive }) =>
    isActive ? activeIconSrc : defaultIconSrc});
`;

export const PostEmotionIconSmall = styled(PostEmotionIcon)`
  width: 24px;
  height: 24px;
  background-image: url(${({ activeIconSrc }) => activeIconSrc});
`;
