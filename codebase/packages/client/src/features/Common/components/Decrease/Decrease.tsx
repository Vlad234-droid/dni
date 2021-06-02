import Icon from '@beans/icon';
import styled from 'styled-components';

const COLOR = '#cc3333';

type Props = {
  final: number;
  decrease: number;
};

const Decrease = ({ final, decrease }: Props) => {
  const percent = Math.round((decrease / final) * 100);

  return (
    <Wrapper>
      <Icon graphic={'arrowDown'} />
      <Text>{` ${percent}%`}</Text>
    </Wrapper>
  );
};

export default Decrease;

const Wrapper = styled.span`
  path {
    stroke: ${COLOR};
  }
`;

const Text = styled.span`
  color: ${COLOR};
`;
