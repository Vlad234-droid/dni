import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.tost};
  }

  &:hover circle {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const Avatar = styled.div<{
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

export const Name = styled.div`
  flex: 1;
  margin: 0 10px;
  font-size: 14px;
  line-height: 20px;
`;

export const Count = styled.div`
  margin-right: 10px;
  text-align: right;
  font-size: 14px;
  line-height: 20px;
`;
