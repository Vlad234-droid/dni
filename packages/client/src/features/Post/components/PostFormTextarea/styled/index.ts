import styled from 'styled-components';

const PostFormTextArea = styled.textarea<{
  height: number;
}>`
  outline: 0;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  line-height: 22px;
  resize: vertical;
  overflow: hidden;
  min-height: 40px;
  box-sizing: border-box;
  height: ${({ height }) => height}px;
  color: ${({ theme }) => theme.colors.base};
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.background.base};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const PostFormTextAreaToolTip = styled.div<{
  isVisible: boolean;
}>`
  top: 55px;
  left: -20px;
  z-index: 1;
  position: absolute;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 4px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  color: ${({ theme }) => theme.colors.background.base};
  background-color: ${({ theme }) => theme.colors.base};
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    right: 50%;
    top: -5px;
    position: absolute;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${({ theme }) => theme.colors.base};
  }
  transition: all 333ms ease-in-out;
`;

const PostFormTextAreaWrapper = styled.div`
  display: flex;
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    background-color: #ffffff;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 20px;
  }
`;

export { PostFormTextArea, PostFormTextAreaToolTip, PostFormTextAreaWrapper };
