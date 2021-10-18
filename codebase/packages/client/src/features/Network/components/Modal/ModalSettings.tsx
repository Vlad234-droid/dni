import React, { FC } from 'react';
import BeansModal from '@beans/modal';
import Link from '@beans/link';

import { ConfirmationModal } from 'features/Common';
import { Page } from 'features/Page';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSettings: FC<Props> = ({ isOpen, onClose }) => (
  <BeansModal open={isOpen} onChange={onClose} id='settings'>
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      renderContent={() => <p>Please note, to receive important update you need to update your settings. Here is the <Link href={Page.NOTIFICATION_SETTINGS}>link</Link> to the setting page. If you do not want to receive notifications just cancel this notification.</p>}
    />
  </BeansModal>
);

export default ModalSettings;
