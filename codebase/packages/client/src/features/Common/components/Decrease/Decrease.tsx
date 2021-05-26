import Icon from '@beans/icon';
import styled from 'styled-components';

type Props = {
  final: number;
  decrease: number;
};

const Decrease = ({ final, decrease }: Props) => {
  const percent = Math.round((decrease / final) * 100);
  return (
    <>
      <Icon graphic={'arrowDown'} />
      <Text>{` ${percent}%`}</Text>
    </>
  );
};

export default Decrease;

const Text = styled.span`
  color: #cc3333;
`;
