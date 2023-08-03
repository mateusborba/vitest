interface CardListProps {
  size: number;
}

import { useState } from "react";

export function CardList({ size }: CardListProps) {
  const [cardsList, setCardsList] = useState(() => {
    const initialCards = [];
    for (let i = 0; i < size; i++) {
      initialCards.push({ isDown: true, id: i });
    }
    return initialCards;
  });

  const handleToggle = (cardId: number) => {
    const updatedCards = cardsList.map((card) => {
      if (card.id === cardId) {
        return { ...card, isDown: !card.isDown };
      }
      return { ...card, isDown: true };
    });
    setCardsList(updatedCards);
  };

  return (
    <div>
      <div data-testid="title">Card List</div>
      <ul>
        {cardsList.map((card, index) => (
          <div
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
            key={index}
          >
            <li
              role="menuitem"
              id={card?.id?.toString()}
              onClick={() => handleToggle(card.id)}
            >
              <p data-testid={`card-${card.id}`}>
                {card.isDown ? "down" : "up"}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
