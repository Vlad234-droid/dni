import styled from 'styled-components';

const PostPublisherAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const PostPublisherAvatarBox = styled.div`
  margin-right: 6px;
`;

const PostPublisherName = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: #333333;
  margin: 0 14px 0 6px;
`;

const PostPublisher = styled.div`
  display: flex;
  align-items: center;
`;

const PostPublisDate = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #666666;
`;

const PostHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #333333;
`;

const PostDescription = styled.p`
  margin: 0;
  padding-top: 8px;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`;

const PostContent = styled.div`
  padding-top: 12px;
`;

const PostPublishedWrapper = styled.div`
  max-width: 561px;
  padding: 24px;
  border: 1px solid #cccccc;
  background: #ffffff;
`;

export {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostPublisher,
  PostPublisDate,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostPublishedWrapper,
};
