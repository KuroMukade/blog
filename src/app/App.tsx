import { ReactNode, useEffect, useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { ErrorBoundaryWithSSR } from './providers/ErrorBoundary';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'entities/User';

const Layout = ({ children }: {children: ReactNode}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
      <div className={classNames('app', {}, [theme])}>
          <Navbar isAuthAvailable={Boolean(isLoggedIn)} onBurgerClick={() => setCollapsed(!collapsed)} />
          <div className="content-page">
              <Sidebar collapsed={collapsed} />
              {children}
          </div>
      </div>
  );
};

const App: React.FC = () => {
  return (
      <ErrorBoundaryWithSSR fallback="Error!">
          <Layout>
              <AppRouter />
          </Layout>
      </ErrorBoundaryWithSSR>
  );
};

export default App;
