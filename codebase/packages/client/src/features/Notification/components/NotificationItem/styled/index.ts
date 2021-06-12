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
  padding: 0 16px;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.text.dark};
`;

const NotificationCloser = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  align-self: flex-start;
  position: relative;
  z-index: 2;
`;

const NotificationHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotificationDate = styled.div`
  font-size: 14px;
  line-height: 22px;
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.text.base};
`;

const NotificactionContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 16px;
`;

const NotificationLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const NotificationCore = styled.div`
  flex-grow: 1;
`;

const NotificationWrapper = styled.div`
  padding: 16px;
  display: flex;
  position: relative;
  text-decoration: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
`;

export {
  CreatorAvatar,
  CreatorName,
  NotificationHead,
  NotificactionContent,
  NotificationCore,
  NotificationCloser,
  NotificationDate,
  NotificationLink,
  NotificationWrapper,
};
