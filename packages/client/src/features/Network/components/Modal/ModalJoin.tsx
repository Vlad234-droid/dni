import React, { FC } from 'react';
import Button from '@beans/button';
import BeansModal from '@beans/modal';
import Link from '@beans/link';

import { Content, Actions } from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalJoin: FC<Props> = ({ isOpen, onClose, onConfirm }) => (
  <BeansModal open={isOpen} onChange={onClose} id='join-network'>
    <Content>
      <p>
        Thank you for taking the time to voluntarily share your personal
        diversity information. Any information you share will be completely
        confidential and by participating you will be helping us to:
      </p>
      <ul>
        <li>Better understand the diversity of our workforce</li>
        <li>
          Inform and improve our colleague policies and approaches to be fully
          inclusive
        </li>
        <li>Hold ourselves accountable for progress and taking action</li>
        <li>Participate in legislative and voluntary reporting</li>
      </ul>
      <p>
        This action is a vital part of our journey to better understanding and
        celebrating our diverse workforce and becoming a more inclusive business
        for all.
      </p>
      <p>
        For more information and frequently asked questions please go to{' '}
        <Link href='https://www.ourtesco.com/' target='_blank'>
          Our Tesco
        </Link>{' '}
        or speak to your manager.
      </p>
    </Content>
    <Actions>
      <Button onClick={onConfirm}>Confirm</Button>
    </Actions>
  </BeansModal>
);

export default ModalJoin;
