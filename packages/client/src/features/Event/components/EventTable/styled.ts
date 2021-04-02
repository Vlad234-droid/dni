import styled from 'styled-components';
import Media from 'styles/media';

const Wrapper = styled.div`
  padding: 16px;
  margin-top: -16px;

  ${Media.tablet`
    padding: 32px;
    margin-top: -32px;
  `}
`;

export { Wrapper };
