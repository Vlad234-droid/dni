import React from 'react';
import styled from 'styled-components';

import { iconsSrc } from '../../config/media';
import {
  TypeFile,
  TypeRenderPostFilesView,
  TypeRenderPostFilesCreate,
  TypeRenderPostFileView,
  TypeRenderPostFileCreate,
  TypeRenderPostPDForPhoto,
  TypeRenderPostFileSuccessPhoto,
  TypeRenderPostFileSuccessPDF,
  TypeRenderPostFileError,
  TypeRenderPostFileLoad,
  TypeRenderFileLoadProgress,
} from '../../config/types';
import { drawProgress, cutString } from '../../utils';
import {
  color,
  stylesWrapperIconFile,
  stylesWrapperIconFileError,
  stylesTextExtraMinBluePrimaryNormal,
  stylesTextMidErrorPressedNormal,
  stylesTextMidWhitePrimaryNormal,
  stylesWrapperIconFilePDF,
  stylesWrapperIconControl,
} from '../../styled';

const stylesPostFile = `
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const stylesBorderBox = `
  ${stylesPostFile}
  width: 100%;
  height: 100%;
  padding: 8px;
  flex-direction: column;
`;

const StyledPostFile = styled.div`
  ${stylesPostFile}
  min-height: 186px;
`;

const StyledWrapperIconFileLoad = styled.div`
  ${stylesWrapperIconFile}
  margin-bottom: 16px;
`;

const StyledWrapperIconFileError = styled.div`
  ${stylesWrapperIconFileError}
  margin-bottom: 22px;
`;

const StyledWrapperIconFileSuccess = styled.div`
  ${stylesWrapperIconFilePDF}
  margin-bottom: 22px;
`;

const StyledFileLoadName = styled.div`
  ${stylesTextExtraMinBluePrimaryNormal}
`;

const StyledFileErrorName = styled.div`
  ${stylesTextMidErrorPressedNormal}
`;

const StyledFileSuccessName = styled.div`
  ${stylesTextMidWhitePrimaryNormal}
`;

const StyledPostFileLoad = styled.div`
  ${stylesBorderBox}
`;

const StyledPostFileError = styled.div`
  ${stylesBorderBox}
`;

const StyledPostFileSuccessPDF = styled.div`
  ${stylesBorderBox}
  background-color: ${color.bluePrimary};
`;

const StyledPostFileSuccessPhoto = styled.div`
  ${stylesBorderBox}
  & > img {
    position: absolute;
  }
`;

const StyledPostFileProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledWrapperIconControl = styled.div`
  ${stylesWrapperIconControl}
  cursor: pointer;
  position: absolute;
  right 8px;
  top: 8px;
  background-color: ${color.darkBaseBackground};
`;

const StyledPostFiles = styled.div`
  overflow: hidden;
  margin: 0 0 24px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  justify-content: space-between;
  background-color: ${color.whitePrimary};
  & > * {
    flex-basis: 50%;
    flex-grow: 1;
  }
`;

const FileLoadProgress: TypeRenderFileLoadProgress = ({ progress }) => (
  <StyledPostFileProgress
    style={{
      background: drawProgress({
        progress,
        colorMain: color.whitePrimary,
        colorFrom: color.loadingColorFrom,
        colorTo: color.loadingColorTo,
      }),
    }}
  />
);

const PostFileLoad: TypeRenderPostFileLoad = ({ progress, name }) => (
  <>
    <FileLoadProgress progress={progress} />
    <StyledPostFileLoad>
      <StyledWrapperIconFileLoad>
        <img src={iconsSrc.filePhoto} alt='icon-load' />
      </StyledWrapperIconFileLoad>
      <StyledFileLoadName>{name}</StyledFileLoadName>
    </StyledPostFileLoad>
  </>
);

const PostFileError: TypeRenderPostFileError = ({ error }) => (
  <StyledPostFileError>
    <StyledWrapperIconFileError>
      <img src={iconsSrc.fileError} alt='icon-error' />
    </StyledWrapperIconFileError>
    <StyledFileErrorName>{error}</StyledFileErrorName>
  </StyledPostFileError>
);

const PostFileSuccessPDF: TypeRenderPostFileSuccessPDF = ({ name }) => (
  <StyledPostFileSuccessPDF>
    <StyledWrapperIconFileSuccess>
      <img src={iconsSrc.filePDF} alt='icon-success' />
    </StyledWrapperIconFileSuccess>
    <StyledFileSuccessName>{name}</StyledFileSuccessName>
  </StyledPostFileSuccessPDF>
);

const PostFileSuccessPhoto: TypeRenderPostFileSuccessPhoto = ({
  path,
  name,
}) => (
  <StyledPostFileSuccessPhoto>
    <img src={path} alt={name} />
  </StyledPostFileSuccessPhoto>
);

const PostPDForPhoto: TypeRenderPostPDForPhoto = ({ type, path, name }) => (
  type === 'pdf'
    ? <PostFileSuccessPDF name={name} />
    : <PostFileSuccessPhoto path={path} name={name} />
);

const PostFileView: TypeRenderPostFileView = ({ type, path, name }) => (
  <StyledPostFile>
    <PostPDForPhoto type={type} path={path} name={name} />
  </StyledPostFile>
);

const PostFileEdit: TypeRenderPostFileCreate = ({
  file,
  type,
  path,
  name,
  status,
  progress,
  onFileDelete,
}) => (
  <StyledPostFile>
    {status === 'loading' && (
      <PostFileLoad name={name} progress={progress} />
    )}
    {status === 'success' && (
      <PostPDForPhoto type={type} path={path} name={name} />
    )}
    {status === 'error' && (
      <PostFileError error='Upload error. Please, try again' />
    )}
    <StyledWrapperIconControl onClick={() => onFileDelete(file)}>
      <img src={iconsSrc.delete} alt='icon-delete' />
    </StyledWrapperIconControl>
  </StyledPostFile>
);

const postFilesViewTestId = 'post-files-view-test-id';

const PostFilesView: TypeRenderPostFilesView = ({ files }) => {
  return (
    <StyledPostFiles data-testid={postFilesViewTestId}>
      {files.map((file: TypeFile) => {
        const { type, path } = file;
        const name = cutString({ value: file.name, maxLength: 24 });

        return (
          <PostFileView
            key={name}
            type={type}
            path={path}
            name={name}
          />
        );
      })}
    </StyledPostFiles>
  );
};

const postFilesCreateTestId = 'post-files-create-test-id';

const PostFilesCreate: TypeRenderPostFilesCreate = ({
  files,
  onFileDelete,
}) => {
  return (
    <StyledPostFiles data-testid={postFilesCreateTestId}>
      {files.map((file: TypeFile) => {
        const { type, path, status, progress } = file;
        const name = cutString({ value: file.name, maxLength: 24 });

        return (
          <PostFileEdit
            key={name}
            file={file}
            path={path}
            type={type}
            name={name}
            status={status}
            progress={progress}
            onFileDelete={onFileDelete}
          />
        );
      })}
    </StyledPostFiles>
  );
};

export {
  PostFilesView,
  postFilesViewTestId,
  PostFilesCreate,
  postFilesCreateTestId,
};
