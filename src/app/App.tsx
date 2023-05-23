import { Suspense, useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { Loader } from 'shared/ui/Loader/Loader';

const App = () => {
  const { theme } = useTheme();

  return (
      <div className={classNames('app', {}, [theme])}>
          <Suspense fallback={<Loader />}>
              <Navbar />
              {/* <BugButton /> */}
              <div className="content-page">
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  );
};

export default App;
