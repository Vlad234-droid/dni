import { RootElement } from '@beans/foundation';
import styled from 'styled-components';

export default styled(RootElement)`
  ${(props) => props.styles}
`;
