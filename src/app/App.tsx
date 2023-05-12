import { Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

import { AppRouter } from 'app/providers/router';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import './styles/index.scss';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Link to={'/about'}>About</Link>
      <Link to={'/'}>Home</Link>
      <button onClick={toggleTheme}>Сменить тему</button>
      <AppRouter />
    </div>
  );
};

export default App;
