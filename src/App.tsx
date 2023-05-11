import { Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AboutPageAsync } from './components/AboutPage/AboutPage.async';
import { MainPageAsync } from './components/MainPage/MainPage.async';

import './index.scss';

const App = () => {
  return (
    <div className="app">
      <Link to={'/about'}>About</Link>
      <Link to={'/'}>Home</Link>

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
