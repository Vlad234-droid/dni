import { textSM, textXX } from 'styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 30px 20px;
  widht: 100%;
  display: flex;
  flex-direction: column;
  justity-content: center;
  align-items: center;
`;

const Description = styled.p`
  ${textSM}
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.warning};
`;

const Explanation = styled.p`
  ${textXX}
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.dark};
`;

export { Wrapper, Description, Explanation };
