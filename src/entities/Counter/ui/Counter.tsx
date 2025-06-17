import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter: FC = () => {
  const dispatch = useAppDispatch();

  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  return (
      <div>
          <h1>{counterValue}</h1>
          <Button onClick={increment}>+</Button>
          <Button onClick={decrement}>-</Button>
      </div>
  );
};
