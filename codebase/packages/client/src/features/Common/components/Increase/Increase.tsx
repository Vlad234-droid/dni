import Icon from '@beans/icon';
import styled from 'styled-components';

type Props = {
  final: number;
  increase: number;
};
const Increase = ({ final, increase }: Props) => {
  const percent = Math.round((increase / final) * 100);
  return (
    <>
      <Icon graphic={'arrowUp'} />
      <Text>{` ${percent}%`}</Text>
    </>
  );
};

export default Increase;

const Text = styled.span`
  color: #008800;
`;
