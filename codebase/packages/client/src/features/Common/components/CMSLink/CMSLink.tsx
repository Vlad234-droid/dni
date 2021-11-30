import React from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import Link from '@beans/link';
import { LINKS } from 'config/constants';

const CMSLink = () => (
  <Link title={'strappi | sso'} href={LINKS.cmsLink}>
    <Button>
      <Icon graphic='externalLink' />
      {'Create New'}
    </Button>
  </Link>
);

export default CMSLink;
