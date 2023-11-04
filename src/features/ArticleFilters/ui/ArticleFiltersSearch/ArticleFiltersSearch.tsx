import { memo } from 'react';
import { useSelector } from 'react-redux';

import searchIcon from 'shared/assets/icons/magnify.svg';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import { getArticleFiltersSearch } from '../../model/selectors/articleFiltersSelector';
import { articlesFiltersActions } from '../../model/slice/articleFiltersSlice';

import s from './ArticleFiltersSearch.module.scss';

export const ArticleFiltersSearch = memo(() => {
  const searchValue = useSelector(getArticleFiltersSearch);
  const dispatch = useAppDispatch();

  const onChange = (value: string) => {
    dispatch(articlesFiltersActions.setSearch(value));
  };

  return (
      <div className={s.ArticleFiltersSearch}>
          <img className={s.searchIcon} src={searchIcon} alt="search" />
          <Input placeholder="Найти..." className={s.input} onChange={onChange} value={searchValue} />
      </div>
  );
});
