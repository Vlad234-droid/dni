const color = {
  errorPressed: '#CC3333',
  bluePrimary: '#00539F',
  blueBackground: '#F7F9FA',
  baseInfoText: '#666666',
  darkBaseText: '#333333',
  darkBaseBackground: '#F2F6FA',
  lightPrimary: '#E6EEF5',
  whitePrimary: '#FFFFFF',
  innerPostBorder: '#D9E5F1',
  innerPostBorder2: '#CCCCCC',
  innerPostBorder3: '#E5E5E5',
  outerInputBorder: '#00539F',
  loadingColorFrom: '248, 228, 165',
  loadingColorTo: '197, 242, 175, 0',
};

const stylesTextSizeExtraMin = `
  font-size: 12px;
  line-height: 16px;
`;

const stylesTextSizeMin = `
  font-size: 14px;
  line-height: 22px;
`;

const stylesTextSizeMid = `
  font-size: 16px;
  line-height: 24px;
`;

const stylesTextExtraMinBluePrimaryNormal = `
  ${stylesTextSizeExtraMin}
  font-weight: 400;
  color: ${color.bluePrimary};
`;

const stylesTextExtraMinBaseInfoTextNormal = `
  ${stylesTextSizeExtraMin}
  font-weight: 400;
  color: ${color.baseInfoText};
`;

const stylesTextMinBaseInfoTextNormal = `
  ${stylesTextSizeMin}
  font-weight: 400;
  color: ${color.baseInfoText};
`;

const stylesTextMinDarkBaseNormal = `
  ${stylesTextSizeMin}
  font-weight: 400;
  color: ${color.darkBaseText};
`;

const stylesTextMinBluePrimarytNormal = `
  ${stylesTextSizeMin}
  font-weight: 400;
  color: ${color.bluePrimary};
`;

const stylesTextMidErrorPressedNormal = `
  ${stylesTextSizeMid}
  font-weight: 400;
  color: ${color.errorPressed};
`;

const stylesTextMidBluePrimarytNormal = `
  ${stylesTextSizeMid}
  font-weight: 400;
  color: ${color.bluePrimary};
`;

const stylesTextMidWhitePrimaryNormal = `
  ${stylesTextSizeMid}
  font-weight: 400;
  color: ${color.whitePrimary};
`;

const stylesTextMidWhitePrimaryBold = `
  ${stylesTextSizeMid}
  font-weight: 700;
  color: ${color.whitePrimary};
`;

const stylesTextMidDarkBaseBold = `
  ${stylesTextSizeMid}
  font-weight: 700;
  color: ${color.darkBaseText};
`;

const stylesWrapperImage = `
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const stylesWrapperAvatar = `
  ${stylesWrapperImage}
  width: 40px;
  height: 40px;
  border-radius: 100%;
  & > img {
    width: 100%;
  }
`;

const stylesWrapperIconControl = `
  ${stylesWrapperImage}
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const stylesWrapperIconFile = `
  ${stylesWrapperImage}
  width: 54px;
  height: 40px;
`;

const stylesWrapperIconFilePDF = `
  ${stylesWrapperImage}
  width: 42px;
  height: 54px;
`;

const stylesWrapperIconFileError = `
  ${stylesWrapperImage}
  width: 40px;
  height: 44px;
`;

const stylesWrapperIconEmotion = `
  ${stylesWrapperImage}
  border-radius: 100%;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const stylesWrapperIconInputFile = `
  ${stylesWrapperImage}
  width: 24px;
  height: 24px;
`;

const stylesWrapperIconInputFilePlus = `
  ${stylesWrapperImage}
  width: 30px;
  height: 30px;
`;

const stylesWrapperImageFile = `
  ${stylesWrapperImage}
  width: 100%;
  height: 100%;
`;

const stylesPost = `
  max-width: 569px;
  padding: 24px;
  box-sizing: border-box;
  cursor: default;
`;

export {
  color,
  stylesTextSizeExtraMin,
  stylesTextSizeMin,
  stylesTextSizeMid,
  stylesTextExtraMinBluePrimaryNormal,
  stylesTextExtraMinBaseInfoTextNormal,
  stylesTextMinBaseInfoTextNormal,
  stylesTextMinDarkBaseNormal,
  stylesTextMinBluePrimarytNormal,
  stylesTextMidErrorPressedNormal,
  stylesTextMidBluePrimarytNormal,
  stylesTextMidWhitePrimaryNormal,
  stylesTextMidWhitePrimaryBold,
  stylesTextMidDarkBaseBold,
  stylesWrapperImageFile,
  stylesWrapperAvatar,
  stylesWrapperIconControl,
  stylesWrapperIconFile,
  stylesWrapperIconFilePDF,
  stylesWrapperIconFileError,
  stylesWrapperIconEmotion,
  stylesWrapperIconInputFile,
  stylesWrapperIconInputFilePlus,
  stylesWrapperImage,
  stylesPost,
};
