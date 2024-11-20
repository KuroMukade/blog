import { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'shared/lib/i18n';

type PropsType = {
    children: ReactNode;
};

export const I18nextWrapper: FC<PropsType> = ({ children }) => {
  return (
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );
};
