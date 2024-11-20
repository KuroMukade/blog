import { ReactNode } from 'react';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  const navigate = useNavigate();

  if (!auth) {
    return navigate(RoutePath.main, { state: { from: location }, replace: true });
  }

  return children;
}
