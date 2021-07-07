import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CreatorAvatar = styled.div<{
  avatar: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: url(${({ avatar }) => avatar});
  background-color: ${({ theme }) => theme.colors.tost};
`;

const CreatorName = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const CreatorSubName = styled.div`
  font-size: 14px;
  line-height: 18px;
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const NameWrapper = styled.div`
  align-self: flex-start;
  flex-grow: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const Closer = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  align-self: flex-start;
  position: relative;
  z-index: 2;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Date = styled.div`
  font-size: 14px;
  line-height: 22px;
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.text.base};
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.base};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

const CustomLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const Core = styled.div`
  flex-grow: 1;
`;

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  position: relative;
  text-decoration: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

export {
  CreatorAvatar,
  CreatorName,
  CreatorSubName,
  NameWrapper,
  Head,
  Content,
  Core,
  Closer,
  Date,
  Title,
  CustomLink,
  Wrapper,
};
