import { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import styles from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

const Loader: FC<LoaderProps> = ({ className }) => (
    <div className={classNames(styles.loader, {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);

export default Loader;
