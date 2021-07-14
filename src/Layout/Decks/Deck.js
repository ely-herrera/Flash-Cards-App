import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { deleteDeck } from '../../utils/api/index';

function Deck({ deck }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  function deleteHandler(deckId) {
    const confirmed = window.confirm(
      'Delete this deck?\n\nYou will not be able to recover it.'
    );
    if (confirmed) {
      deleteDeck(deckId).then(() => {
        if (url === `/decks/${deck.id}`) {
          history.push('/');
        }
      });
    }
  }

  return (
    <div className="container border border-secondary p-2 mt-2">
      <h2>{deck.name}</h2>
      {url === '/' ? <p>{deck.cards?.length} cards</p> : null}
      <p>{deck.description}</p>

      {url === '/' ? (
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          View
        </Link>
      ) : (
        <Link
          to={`/decks/${deck.id}/edit`}
          className="btn          btn-secondary"
        >
          Edit
        </Link>
      )}
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
        Study
      </Link>
      {path === '/decks/:deckId' && (
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Card
        </Link>
      )}
      <button className="btn btn-danger" onClick={() => deleteHandler(deck.id)}>
        <span className="oi oi-trash" />
      </button>
    </div>
  );
}
export default Deck;
