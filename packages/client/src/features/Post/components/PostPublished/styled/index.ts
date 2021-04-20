import styled from 'styled-components';

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
  color: ${({ theme }) => theme.colors.text.dark};
  padding: 6px;
`;

const PostPublisher = styled.div`
  display: flex;
  align-items: center;
`;

const PostPublishDate = styled.div`
  font-size: 14px;
  line-height: 22px;
  padding: 6px;
  color: ${({ theme }) => theme.colors.text.base};
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

const PostDescription = styled.div`
  margin: 0;
  padding-top: 8px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const PostContent = styled.div`
  padding-top: 12px;
`;

const PostPublishedWrapper = styled.div<{
  isMobile: boolean;
}>`
  box-sizing: border-box;
  padding: ${({ isMobile }) => (isMobile ? 16 : 24)}px;
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.background.base};
`;

export {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostPublisher,
  PostPublishDate,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostPublishedWrapper,
};
