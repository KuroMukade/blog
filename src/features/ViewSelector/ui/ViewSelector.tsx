import ListViewIcon from 'shared/assets/icons/list-view.svg';
import GridViewIcon from 'shared/assets/icons/grid-view.svg';
import { classNames } from 'shared/lib/classNames';

import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ViewSelector.module.scss';

type ViewType = 'grid' | 'list';

interface ViewSelectorProps {
  className?: string;
  view?: ViewType;
  onViewClick?: (view: ViewType) => void;
}

type View = {
  view: ViewType;
  icon: string;
}

const viewItems: readonly View[] = [
  {
    view: 'list',
    icon: ListViewIcon,
  },
  {
    view: 'grid',
    icon: GridViewIcon,
  },
] as const;

export const ViewSelector = memo(({ className, onViewClick, view }: ViewSelectorProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (newView: ViewType) => {
    if (typeof newView !== 'string') {
      throw new Error('View mode must be string');
    }
    onViewClick?.(newView);
    searchParams.set('view', newView);
    setSearchParams(searchParams);
  };

  return (
      <div className={classNames(styles.ViewSelector, {}, [className])}>
          <div className={styles.wrapper}>
              {viewItems.map((item) => (
                  <Button
                      className={classNames(
                        styles.button,
                        {
                          [styles.activeView]: item.view === view,
                        },
                        [],
                      )}
                      theme={ThemeButton.CLEAR}
                      type="button"
                      key={item.view}
                      onClick={() => onClick(item.view)}
                  >
                      <img alt={item.view} src={item.icon} />
                  </Button>
              ))}
          </div>
      </div>
  );
});

ViewSelector.displayName = 'ViewSelector';
