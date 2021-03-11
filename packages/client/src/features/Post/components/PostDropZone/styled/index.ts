import styled from 'styled-components';

import { iconsSrc, imagesSrc } from '../../../config/media';

const PostDropZonePlusIcon = styled.div`
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${iconsSrc.filePlus});
`;

const PostDropZoneTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  padding: 12px 0 7px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostDropZoneInfo = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.base};
`;

const PostDropZoneBackground = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${imagesSrc.dropZone});
`;

const PostDropZoneLayer = styled.div<{
  isActive: boolean;
}>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  position: absolute;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px
    ${({ isActive }) => (isActive ? 'solid #99BAD9' : 'dashed #00539F')};
`;

const PostDropZoneWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  padding: 22px 22px 17px;
  margin-top: 25px;
  min-height: 120px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
`;

export {
  PostDropZonePlusIcon,
  PostDropZoneBackground,
  PostDropZoneTitle,
  PostDropZoneInfo,
  PostDropZoneLayer,
  PostDropZoneWrapper,
};
