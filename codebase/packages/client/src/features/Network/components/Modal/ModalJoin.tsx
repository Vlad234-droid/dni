import React, { FC } from 'react';

import { ConfirmationModal } from 'features/Common';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalJoin: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      renderContent={() => (
        <>
          <p>
            By signing up to one or more of our networks,
            you will receive updates throughout the year
            and priority invites to network-run events for
            the network(s) of your choice. Occasionally we
            might send an update to all our networks but
            don’t worry, this won’t be too often.
          </p>
            <br />
          <p>
            We recognise that some colleagues may prefer
            for their participation in the network(s) to
            be confidential so any information you share
            with us will not be linked to you as an
            individual, it will be saved securely and
            anonymously. In order to better understand
            our Networks and how they can improve their
            offer to our colleagues they will receive
            aggregated demographic reporting. This reporting
            is anonymous and no individuals can be identified
            from it.
          </p>
          <br />
          <p>
            We’ve had some great webinars and events over the
            last few years and with your participation we hope
            to make them bigger and better in the future!
          </p>
        </>
      )}
    />
  );
};

export default ModalJoin;
