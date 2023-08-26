import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (story: () => Story) => (
    <BrowserRouter>
        <Suspense fallback>
            {story()}
        </Suspense>
    </BrowserRouter>
);
