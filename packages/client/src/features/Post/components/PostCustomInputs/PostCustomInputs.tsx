import React from 'react';
import styled from 'styled-components';

import {
  TypeRenderCustomInputFile,
  TypeRenderCustomDropZone,
} from '../../config/types';
import {
  color,
  stylesTextMinBluePrimarytNormal,
  stylesTextMidBluePrimarytNormal,
  stylesWrapperIconInputFile,
  stylesWrapperIconInputFilePlus,
  stylesTextExtraMinBaseInfoTextNormal,
} from '../../styled';

const StyledInputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const StyledWrapperIconInputFile = styled.div`
  ${stylesWrapperIconInputFile}
  border-radius: 100%;
`;

const StyledInputFileName = styled.div`
  ${stylesTextMinBluePrimarytNormal}
  text-transform: capitalize;
`;

const StyledCustomInputFile = styled.div`
  display: flex;
  align-items: flex-end;
  min-height: 24px;
  box-sizing: border-box;
  margin: 9px 4px 0 0;
  padding: 0 12px 0 0;
  position: relative;
  border-radius: 30px;
  background-color: ${color.whitePrimary};
`;

const StyledWrapperIconInputFilePlus = styled.div`
  ${stylesWrapperIconInputFilePlus}
`;

const StyledDropZoneTitle = styled.div`
  ${stylesTextMidBluePrimarytNormal}
  padding: 13px 0 8px;
  &:first-letter {
    text-transform: capitalize;
  }
`;

const StyledDropZoneInfo = styled.div`
  ${stylesTextExtraMinBaseInfoTextNormal}
`;

const StyledCustomDropZone = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 22px 22px 17px;
  min-height: 120px;
  position: relative;
  border: 1px dashed ${color.bluePrimary};
  background-color: ${color.whitePrimary};
`;

const customInputFileTestId = 'custom-input-file-test-id';

const CustomInputFile: TypeRenderCustomInputFile = ({
  name,
  iconSrc,
  onChange,
}) => {
  return (
    <StyledCustomInputFile data-testid={customInputFileTestId}>
      <StyledWrapperIconInputFile>
        <img src={iconSrc} alt='alt' />
      </StyledWrapperIconInputFile>
      <StyledInputFileName>{name}</StyledInputFileName>
      <StyledInputFile type='file' onChange={onChange} />
    </StyledCustomInputFile>
  );
};

const customDropZoneTestId = 'custom-drop-zone-test-id';

const CustomDropZone: TypeRenderCustomDropZone = ({
  title,
  info,
  iconSrc,
  onChange,
}) => {
  return (
    <StyledCustomDropZone data-testid={customDropZoneTestId}>
      <StyledWrapperIconInputFilePlus>
        <img src={iconSrc} alt='plus-file' />
      </StyledWrapperIconInputFilePlus>
      <StyledDropZoneTitle>{title}</StyledDropZoneTitle>
      <StyledDropZoneInfo>{info}</StyledDropZoneInfo>
      <StyledInputFile type='file' onChange={onChange} />
    </StyledCustomDropZone>
  );
};

export {
  CustomInputFile,
  customInputFileTestId,
  CustomDropZone,
  customDropZoneTestId,
};
