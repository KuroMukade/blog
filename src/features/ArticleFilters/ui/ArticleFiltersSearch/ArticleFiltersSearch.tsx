import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import searchIcon from 'shared/assets/icons/magnify.svg';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import { useTranslation } from 'react-i18next';
import { getArticleFiltersSearch } from '../../model/selectors/articleFiltersSelector';
import { articlesFiltersActions } from '../../model/slice/articleFiltersSlice';

import s from './ArticleFiltersSearch.module.scss';

export const ArticleFiltersSearch = memo(() => {
  const searchValue = useSelector(getArticleFiltersSearch);
  const dispatch = useAppDispatch();

  const { t } = useTranslation('articlesFiltersSearch');

  const onChange = useCallback((value: string) => {
    dispatch(articlesFiltersActions.setSearch(value));
  }, [dispatch]);

  return (
      <div className={s.ArticleFiltersSearch}>
          <img className={s.searchIcon} src={searchIcon} alt="search" />
          <Input placeholder={t('Найти...')} className={s.input} onChange={onChange} value={searchValue} />
      </div>
  );
});

ArticleFiltersSearch.displayName = 'ArticleFiltersSearch';
