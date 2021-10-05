import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { SubHeading } from '@beans/typography';
import Icon from '@beans/icon';
import Button from '@beans/button';

import { ButtonGroup } from 'features/Common';
import { Partner as PartnerType } from '../../config/formFields';
import PartnerList from '../PartnerList';

type Props = {
  onClose?: () => void;
  partners: Array<PartnerType>;
};

enum Mode {
  ADD = 'add',
  EDIT = 'edit',
}

const PartnersEditor = ({ partners, onClose }: Props) => {
  const [mode, setMode] = useState<Mode>(Mode.ADD);
  const buttonList = useMemo(() => {
    return [
      {
        title: 'Add',
        action: () => setMode(Mode.ADD),
      },
      {
        title: 'Edit or Delete',
        action: () => setMode(Mode.EDIT),
      },
    ];
  }, []);

  return (
    <Wrapper>
      <Heading>
        <SubHeading>Edit list of Partners</SubHeading>
        {typeof onClose !== 'undefined' && (
          <Button onClick={onClose} variant='link'>
            <Icon graphic='close' />
          </Button>
        )}
      </Heading>
      <Content>
        <ModeContainer>
          <ButtonGroup
            list={buttonList}
            activeIndex={mode === Mode.ADD ? 0 : 1}
          />
        </ModeContainer>
        {mode !== Mode.ADD && (
          <PartnerList partners={partners} />
        )}
      </Content>
    </Wrapper>
  );
};

export default PartnersEditor;

const Wrapper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  // TODO temporary padding
  margin-bottom: 48px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModeContainer = styled.div`
  margin-bottom: 16px;
`;

const Content = styled.div``;
