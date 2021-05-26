import React, { FC, ComponentProps } from 'react';

import { Control } from './styled';

type Props = ComponentProps<typeof Control['props']>;

const CarouselControl: FC<Props> = (props) => (
  <Control {...props} icon={{ ...props.icon, size: 'xs' }} />
);

export { CarouselControl };
