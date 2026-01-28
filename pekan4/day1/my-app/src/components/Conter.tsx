import React, { useState, useCallback, useMemo } from 'react';

// Komponen dengan typed props dan events
interface CounterProps {
  initialCount?: number;
  step?: number;
  onCountChange?: (count: number) => void;
  disabled?: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface CounterState {
  count: number;
  isEven: boolean;
  lastUpdated: Date | null;
}

const Counter: React.FC<CounterProps> = ({
  initialCount = 0,
  step = 1,
  onCountChange,
  disabled = false
}) => {
  const [state, setState] = useState<CounterState>({
    count: initialCount,
    isEven: initialCount % 2 === 0,
    lastUpdated: null
  });

  const increment = useCallback((): void => {
    if (disabled) return;

    setState(prevState => {
      const newCount = prevState.count + step;
      const newState: CounterState = {
        count: newCount,
        isEven: newCount % 2 === 0,
        lastUpdated: new Date()
      };

      onCountChange?.(newCount);
      return newState;
    });
  }, [step, onCountChange, disabled]);

  const decrement = useCallback((): void => {
    if (disabled) return;

    setState(prevState => {
      const newCount = prevState.count - step;
      const newState: CounterState = {
        count: newCount,
        isEven: newCount % 2 === 0,
        lastUpdated: new Date()
      };

      onCountChange?.(newCount);
      return newState;
    });
  }, [step, onCountChange, disabled]);

  const reset = useCallback((): void => {
    setState({
      count: initialCount,
      isEven: initialCount % 2 === 0,
      lastUpdated: new Date()
    });
    onCountChange?.(initialCount);
  }, [initialCount, onCountChange]);

  // Computed values dengan useMemo
  const displayInfo = useMemo((): string => {
    const status = state.isEven ? 'Genap' : 'Ganjil';
    const timeInfo = state.lastUpdated
      ? ` (terakhir diupdate: ${state.lastUpdated.toLocaleTimeString()})`
      : '';
    return `${status}${timeInfo}`;
  }, [state.isEven, state.lastUpdated]);

  return (
    <div>
      <h2>Counter: {state.count}</h2>
      <p>{displayInfo}</p>
      <div>
        <button onClick={increment} disabled={disabled}>
          +{step}
        </button>
        <button onClick={decrement} disabled={disabled}>
          -{step}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;