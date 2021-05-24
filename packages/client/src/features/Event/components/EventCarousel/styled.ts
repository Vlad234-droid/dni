import styled from 'styled-components';

const Wrapper = styled.div`
  & > h2 {
    padding: 10px;
  }
`;

const ErrorWrapper = styled.div`
  padding: 0 32px;
`;

export { Wrapper, ErrorWrapper };
