import { ReactNode, useEffect, useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { removeStyles } from 'used-styles/dist/es2015/moveStyles';
import { ErrorBoundaryWithSSR } from './providers/ErrorBoundary';

const Layout = ({ children }: {children: ReactNode}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
      <div className={classNames('app', {}, [theme])}>
          <Navbar onBurgerClick={() => setCollapsed(!collapsed)} />
          <div className="content-page">
              <Sidebar collapsed={collapsed} />
              {children}
          </div>
      </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    removeStyles();
  }, []);

  return (
      <ErrorBoundaryWithSSR fallback="Error!">
          <Layout>
              <AppRouter />
          </Layout>
      </ErrorBoundaryWithSSR>
  );
};

export default App;
