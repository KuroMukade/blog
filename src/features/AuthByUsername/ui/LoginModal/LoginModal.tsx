import React, { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Modal } from 'shared/ui/Modal/Modal';
import styles from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
   className?: string;
   isOpen?: boolean;
   onClose?: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, onClose, isOpen }) => (
    <Modal onClose={onClose} isOpen={isOpen} className={classNames(styles.wrapper, {}, [className])}>
        <LoginForm />
    </Modal>
);
