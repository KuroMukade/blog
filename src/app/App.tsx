import { useEffect, useState } from 'react';

import { AppRouter } from 'app/providers/router';

import { Navbar } from 'widgets/Navbar';

import { classNames } from 'shared/lib/classNames';
import { useTheme } from 'shared/contexts/theme/useTheme';

import { Sidebar } from 'widgets/Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(false);

  return (
      <div className={classNames('app', {}, [theme])}>
          <Navbar onBurgerClick={() => setCollapsed(!collapsed)} />
          <div className="content-page">
              <Sidebar collapsed={collapsed} />
              {inited && <AppRouter />}
          </div>
      </div>
  );
};

export default App;
