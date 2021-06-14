import React from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import Link from '@beans/link';

const CMSLink = () => (
  <Link title={'strappi | sso'} href={'https://ppe.ourtesco.com/colleague-cms/admin/'}>
    <Button>
      <Icon graphic='externalLink' />
    </Button>
  </Link>
);

export default CMSLink;
