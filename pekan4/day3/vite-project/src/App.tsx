// src/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';
import { increment, decrement, incrementByAmount } from './feature/counter/counterSlice';
import UserList from './components/UserList';
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

const App: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} style={{ margin: '5px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} style={{ margin: '5px' }}>
        Decrement
      </button>
      <button onClick={() => dispatch(incrementByAmount(5))} style={{ margin: '5px' }}>
        Increment by 5
      </button>
      <UserList />
    </div>
  );
};

export default App;