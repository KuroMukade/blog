import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { CurrencySelect, Currency } from 'entities/Currency';
import { CountrySelect, Country } from 'entities/Country';

import { Profile } from '../../model/types/profile';

import s from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastName?: (value?: string) => void;
    onChangeFirstName?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,}: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  console.log({data, isLoading, error});
  if (isLoading) {
    return (
        <div className={classNames(s.ProfileCard, { [s.loading]: true }, [className])}>
            <Loader />
        </div>
    );
  }

  if (error) {
    return (
        <div className={classNames(s.ProfileCard, {}, [className, s.error])}>
            <Text
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
            />
        </div>
    );
  }

  const mods: Mods = {
    [s.editing]: !readonly,
  };

  return (
      <div className={classNames(s.ProfileCard, mods, [className])}>
          <div className={s.data}>
              {data?.avatar && (
              <div className={s.avatarWrapper}>
                  <Avatar size={200} alt="your avatar image" src={data?.avatar} />
              </div>
              )}
              <div className={s.inputs}>
                <Input
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                    className={s.input}
                    onChange={onChangeFirstName}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                    className={s.input}
                    onChange={onChangeLastName}
                    readonly={readonly}
                />
                <Input
                    type="number"
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    className={s.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    className={s.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Введите имя пользователя')}
                    className={s.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    className={s.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={s.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={s.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
              </div>
          </div>
      </div>
  );
};
