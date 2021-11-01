import styled from 'styled-components';

import { iconsSrc } from '../../config/media';

const PostPublisherAvatar = styled.img``;

const PostPublisherAvatarBox = styled.div`
  margin-right: 6px;
  display: flex;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.tost};
`;

const PostPublisherName = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  padding: 6px;
  color: ${({ theme }) => theme.colors.text.base};
`;

const PostArchiveEllipse = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.grayscale};
`;

const PostArchiveLabel = styled.div`
  padding-left: 8px;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text.base};
`;

const PostArchiveMark = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 32px;
  padding: 6px;
  border-radius: 20px;
`;

const PostArchiveInfo = styled.div`
  padding: 6px;
  flex-grow: 1;
  font-size: 14px;
  line-height: 22px;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.base};
`;

const PostUnarchiveIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${iconsSrc.unarchive});
  background-color: ${({ theme }) => theme.colors.tost};
`;

const PostHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const PostDescription = styled.p`
  margin: 0;
  padding-top: 8px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const PostContent = styled.div`
  padding-top: 16px;
`;

const PostArchivedWrapper = styled.div<{
  isMobile: boolean;
}>`
  box-sizing: border-box;
  padding: ${({ isMobile }) => (isMobile ? 16 : 24)}px;
  border: 1px solid ${({ theme }) => theme.colors.lines.light};
  background-color: #f7f9fa;
`;

export {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostArchiveEllipse,
  PostArchiveLabel,
  PostArchiveMark,
  PostArchiveInfo,
  PostUnarchiveIcon,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostArchivedWrapper,
};
