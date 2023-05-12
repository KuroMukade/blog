import { Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';

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

      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/'} element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
