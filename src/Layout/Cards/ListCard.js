import React from 'react';
import Card from './Card';

function ListCard({ deck }) {
  const { cards = [] } = deck;

  const cardList = cards.map((card) => <Card key={card.id} card={card} />);

  return (
    <>
      <div>{cardList}</div>
    </>
  );
}
export default ListCard;
