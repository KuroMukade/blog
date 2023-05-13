import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';

import './styles/index.scss';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback='lang downloading'>
          <Navbar />
          <div className="content-page">
            <Sidebar />
            <AppRouter />
          </div>        
      </Suspense>

    </div>
  );
};

export default App;
