import { ReactNode, useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'entities/User';
import { ErrorBoundaryWithSSR } from './providers/ErrorBoundary';

const Layout = ({ children }: {children: ReactNode}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { theme } = useTheme();
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
      <div className={classNames('app', {}, [theme])}>
          <Navbar
              isAuthAvailable={Boolean(isLoggedIn)}
              isSidebarExpanded={!collapsed}
              onBurgerClick={() => setCollapsed((previous) => !previous)}
          />
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
