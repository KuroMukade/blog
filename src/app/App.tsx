import { Suspense, useEffect } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { Loader } from 'shared/ui/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
      <div className={classNames('app', {}, [theme])}>
          <Suspense fallback={<Loader />}>
              <Navbar />
              <div className="content-page">
                  <Sidebar />
                  {inited && <AppRouter />}
              </div>
          </Suspense>
      </div>
  );
};

export default App;
