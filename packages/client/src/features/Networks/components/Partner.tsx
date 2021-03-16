import React from 'react';

import { Partner as PartnerType } from '../config/formFields';

type Props = {
  partner: PartnerType;
};
const Partner = ({ partner }: Props) => (
  <div>
    {partner.name} {partner.link}
  </div>
);

export default Partner;
