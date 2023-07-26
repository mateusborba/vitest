import { ChangeEvent, useReducer } from "react";

interface CounterState {
  count: number;
  step: number;
}

type CounterAction = {
  type: "increment" | "decrement" | "updateStep";
  step?: number;
};

function reducer(state: CounterState, action: CounterAction): CounterState {
  const { type, step } = action;

  switch (type) {
    case "decrement":
      return { ...state, count: state.count - (step || state.step) };
    case "increment":
      return { ...state, count: state.count + (step || state.step) };
    case "updateStep":
      return { ...state, step: step || state.step };
    default:
      return state;
  }
}

const initialState: CounterState = {
  count: 0,
  step: 1,
};

export function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAdd() {
    dispatch({ type: "increment" });
  }

  function handleSubtract() {
    dispatch({ type: "decrement" });
  }

  function handleUpdateStep({ target }: ChangeEvent<HTMLInputElement>) {
    const step = parseInt(target.value);

    dispatch({ type: "updateStep", step });
  }

  return (
    <div>
      <div data-testid="results">{state.count}</div>
      <div>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
        <button type="button" onClick={handleSubtract}>
          Subtract
        </button>
      </div>
      <div>
        <input
          type="number"
          data-testid="counter"
          onChange={handleUpdateStep}
        />
      </div>
    </div>
  );
}
