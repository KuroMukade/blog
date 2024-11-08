import { useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { ErrorBoundary } from './providers/ErrorBoundary';

const App = () => {
  const { theme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);

  return (
      <ErrorBoundary fallback="Error!">
          <div className={classNames('app', {}, [theme])}>
              <Navbar onBurgerClick={() => setCollapsed(!collapsed)} />
              <div className="content-page">
                  <Sidebar collapsed={collapsed} />
                  <AppRouter />
              </div>
          </div>
          <div />
      </ErrorBoundary>
  );
};

export default App;
