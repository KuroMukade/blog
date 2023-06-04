import React, { FC, Suspense } from 'react';

import { Modal } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
   className?: string;
   isOpen?: boolean;
   onClose?: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ className, onClose, isOpen }) => (
    <Modal tabIndex={-1} onClose={onClose} isOpen={isOpen} className={className}>
        <Suspense fallback={<Loader />}>
            <LoginForm />
        </Suspense>
    </Modal>
);
