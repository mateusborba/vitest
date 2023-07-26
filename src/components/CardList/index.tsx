import { useState } from "react";

interface Props {
  size: number;
}

export function CardList({ size }: Props) {
  const [cards, setCards] = useState(() => {
    return Array(size)
      .fill(0)
      .map(() => "down");
  });

  function handleToggleCard(targetIndex: number) {
    setCards((state) =>
      state.map((_, index) => (targetIndex === index ? "up" : "down"))
    );
  }

  return (
    <div>
      <h1 data-testid="title">Card List</h1>
      <ul>
        {cards.map((card, index) => (
          <li
            key={index}
            role="menuitem"
            onClick={() => handleToggleCard(index)}
          >
            {card}
          </li>
        ))}
      </ul>
    </div>
  );
}
