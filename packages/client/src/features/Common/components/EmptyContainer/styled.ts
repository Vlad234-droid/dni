import { textSM, textXX } from 'styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 30px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  ${textSM};
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.warning} !important;
`;

const Explanation = styled.div`
  ${textXX};
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.dark};
`;

export { Wrapper, Description, Explanation };
