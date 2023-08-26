import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { Theme } from '../../src/shared/contexts/theme';

export const parametrs = {
  actions: { argTypeRegex: '^on[A-Z].*' },
  controls: {
    mathers: {
      color: /(background|color)$i/,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.SIMPLE));
addDecorator(RouterDecorator);
