import styled from 'styled-components';

const PostEmotionIcon = styled.div<{
  iconSrc: any;
}>`
  overflow: hidden;
  border-radius: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ iconSrc }) => iconSrc});
`;

const PostEmotionIconBig = styled(PostEmotionIcon)`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const PostEmotionIconSmall = styled(PostEmotionIcon)`
  width: 24px;
  height: 24px;
`;

export { PostEmotionIconBig, PostEmotionIconSmall };
