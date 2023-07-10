import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/contexts/theme';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'user',
    age: 20,
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg',
    city: 'Kazan',
    country: Country.Russia,
    currency: Currency.RUB,
    first: 'Тимур',
    lastname: 'Гайнутдинов',
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Ошибка',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
