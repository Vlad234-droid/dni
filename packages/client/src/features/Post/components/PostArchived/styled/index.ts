import styled from 'styled-components';

import { iconsSrc } from '../../../config/media';

const PostPublisherAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const PostPublisherAvatarBox = styled.div`
  margin-right: 6px;
  max-width: 50px;
`;

const PostPublisherName = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  width: 110px;
  margin: 0 14px 0 6px;
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
  align-items: center;
  min-height: 32px;
  padding: 5px 8px;
  border-radius: 20px;
`;

const PostArchiveInfo = styled.div`
  padding: 5px 8px;
  font-size: 14px;
  line-height: 22px;
  flex-grow: 1;
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
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
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

const PostArchivedWrapper = styled.div`
  max-width: 561px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.lines.light};
  background-color: #f7f9fa; ;
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
