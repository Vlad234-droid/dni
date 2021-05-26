import styled from 'styled-components';
import Button from '@beans/button';

import Media from 'styles/media';

type Button = {
  title: string;
  action: () => void;
};

type Props = {
  list: Array<Button>;
  activeIndex?: number;
};

const ButtonGroup = ({ list, activeIndex = 0 }: Props) => {
  return (
    <Wrapper>
      <Buttons>
        {list.map(({ title, action }, idx) => (
          <Button
            key={idx}
            className={'button_group'}
            onClick={action}
            variant={activeIndex === idx ? 'primary' : 'secondary'}
          >
            {title}
          </Button>
        ))}
      </Buttons>
    </Wrapper>
  );
};

export default ButtonGroup;

const Wrapper = styled.div`
  overflow: auto;
  margin-bottom: 15px;
  width: 100%;
`;

const Buttons = styled.div`
  width: min-content;
  display: flex;
  flex-wrap: nowrap;

  ${Media.tablet`
    width: auto;
  `}

  .button_group {
    border-radius: 0;
    white-space: nowrap;

    &:first-child {
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }

    &:last-child {
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }
  }

  .button_group ~ .button_group {
    border-left: none;
  }
`;
