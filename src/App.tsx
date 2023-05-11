import { Suspense, useContext, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AboutPageAsync } from './components/AboutPage/AboutPage.async';
import { MainPageAsync } from './components/MainPage/MainPage.async';
import { classNames } from './helpers/classNames/classNames';

import './styles/index.scss';
import { Theme, ThemeContext } from './theme/ThemeContext';
import { useTheme } from './theme/useTheme';

const App = () => {
  const {theme, toggleTheme} = useTheme();
    
  return (
    <div className={classNames('app', {}, [theme])}>
      <Link to={'/about'}>About</Link>
      <Link to={'/'}>Home</Link>
      <button onClick={toggleTheme} >Сменить тему</button>

      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
