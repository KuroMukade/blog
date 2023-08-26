import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/contexts/theme/ThemeContext';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'timur tv',
      first: 'asd',
      city: 'asf',
      currency: Currency.USD,
      avatar: 'https://animalreader.ru/wp-content/uploads/2015/12/tukan-i-ego-universalnyj-kljuv-animal-reader.-ru-004.jpg',
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'timur tv',
      first: 'asd',
      city: 'asf',
      currency: Currency.USD,
      avatar: 'https://animalreader.ru/wp-content/uploads/2015/12/tukan-i-ego-universalnyj-kljuv-animal-reader.-ru-004.jpg',
    },
  },
})];
