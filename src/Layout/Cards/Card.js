import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { deleteCard } from '../../utils/api/index';

function Card({ card }) {
  const { url } = useRouteMatch();

  function deleteHandler(cardId) {
    const confirmed = window.confirm(
      'Delete this card?\n\nYou will not be able to recover it.'
    );
    if (confirmed) {
      deleteCard(cardId).then();
    }
  }

  return (
    <div className="container border border-secondary p-2 mt-2">
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">
        {' '}
        <span className="oi oi-pencil" /> Edit
      </Link>
      <button className="btn btn-danger" onClick={() => deleteHandler(card.id)}>
        <span className="oi oi-trash" />
      </button>
    </div>
  );
}

export default Card;
