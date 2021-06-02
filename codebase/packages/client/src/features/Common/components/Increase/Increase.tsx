import Icon from '@beans/icon';
import styled from 'styled-components';

const COLOR = '#008800';

type Props = {
  final: number;
  increase: number;
};

const Increase = ({ final, increase }: Props) => {
  const percent = Math.round((increase / final) * 100);
  return (
    <Wrapper>
      <Icon graphic={'arrowUp'} />
      <Text>{` ${percent}%`}</Text>
    </Wrapper>
  );
};

export default Increase;

const Wrapper = styled.span`
  path {
    stroke: ${COLOR};
  }
`;

const Text = styled.span`
  color: ${COLOR};
`;
