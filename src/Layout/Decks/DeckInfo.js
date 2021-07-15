import { Link, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import Deck from './Deck';
import { deleteDeck } from '../../utils/api';
import React from 'react';

function DeckInfo({ deck, deleteDck, setDeck }) {
  const history = useHistory();

  function handleDelete() {
    const confirmed = window.confirm(
      'Deleted data cannot be recovered, do you want to continue?'
    );

    if (confirmed) {
      deleteDeck(deck.id).then(() => history.push('/decks/new'));
    }
  }
  return (
    <>
      <li className="list-group-item mb-4">
        <div className="mb-2 justify-content-between d-flex">
          <h3>{deck.name}</h3>
          <div className="float-right">{deck.cards.length} cards</div>
        </div>
        <div className="mb-2"> {deck.description}</div>
        <div>
          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-1">View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary mr-1">Study</button>
          </Link>
          <button onClick={handleDelete} className="btn btn-danger float-right">
            Delete
          </button>
        </div>
      </li>
      <Route exact path={`/decks/${deck.id}`}>
        <Deck deck={deck} setDeck={setDeck} />
      </Route>
    </>
  );
}

export default DeckInfo;
