import { CardList } from "./components/CardList";
import { Counter } from "./components/Counter";

export function App() {
  return (
    <>
      <CardList size={3} />
      <Counter />
    </>
  );
}
