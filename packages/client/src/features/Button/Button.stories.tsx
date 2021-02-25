import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default { component: Button, title: 'Examples / Button' } as Meta;

export const WithArgs: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);
WithArgs.args = { label: 'With args' };
export const Basic = () => <Button label='Click me' />;
