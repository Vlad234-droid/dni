import styled from 'styled-components';
import Breadcrumb from '@beans/breadcrumb';

import { GREY_COLOR } from 'styles';

const CustomBreadcrumb = styled(Breadcrumb)`
  background: ${GREY_COLOR};
  position: fixed;
  top: 237px;
  width: 100%;
  z-index: 100;
`;

export default CustomBreadcrumb;
