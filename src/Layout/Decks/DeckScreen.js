import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  readDeck,
  deleteDeck,
  deleteCard,
  listCards,
} from '../../utils/api/index';

function DeckScreen() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  //console.log(deckId);
  useEffect(() => {
    async function loadData() {
      try {
        const deckData = await readDeck(deckId);
        console.log(deckData);
        setDeck(deckData);
        setCards(deckData.cards);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else throw error;
      }
    }
    loadData();
  }, [deckId]);

  const history = useHistory();
  const handleDeckDelete = async () => {
    const windowMsg = window.confirm(
      `Delete this deck? You will not be able to recover it.`
    );
    if (windowMsg) {
      async function deleteData() {
        try {
          await deleteDeck(deckId);
          history.push('/');
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Aborted');
          } else throw error;
        }
      }
      deleteData();
    }
  };

  const handleCardDelete = async ({ target }) => {
    const { value } = target;

    const windowMsg = window.confirm(
      `Delete this card? You will not be able to recover it.`
    );
    if (windowMsg) {
      async function deleteData() {
        try {
          await deleteCard(value);
          const deckData = await listCards(deckId);
          console.log(deckId, deckData);
          setCards(deckData);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Aborted');
          } else throw error;
        }
      }
      deleteData();
    }
  };

  if (cards.length > 0) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">
                {' '}
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="1">
              {deck.name}
            </li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="row justify-content-between">
          <div className="col-8">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
              {' '}
              <span className="oi oi-pencil" /> Edit
            </Link>{' '}
            &nbsp;
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
              {' '}
              <span className="oi oi-book" /> Study
            </Link>{' '}
            &nbsp;
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              <span className="oi oi-plus" /> Add Cards
            </Link>
          </div>
          <div className="col-2">
            <button onClick={handleDeckDelete} className="btn btn-danger">
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
        <br />
        <heading>
          <h2>Cards</h2>
        </heading>
        <br />
        {cards.map((card) => (
          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-6">{card.front}</div>
                  <div className="col-6">
                    {card.back}
                    <div className="row justify-content-end">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary mt-4"
                      >
                        <span className="oi oi-pencil" /> Edit
                      </Link>{' '}
                      &nbsp;
                      <button
                        onClick={handleCardDelete}
                        value={card.id}
                        className="btn btn-danger mt-4"
                      >
                        <span className="oi oi-trash" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item" key="0">
                <Link to="/">
                  <span className="oi oi-home" /> Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key="1"
              >
                {deck.name}
              </li>
            </ol>
          </nav>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <div className="row justify-content-between">
            <div className="col-8">
              <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                <span className="oi oi-pencil" /> Edit
              </Link>{' '}
              &nbsp;
              <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
                <span className="oi oi-book" /> Study
              </Link>{' '}
              &nbsp;
              <Link
                to={`/decks/${deckId}/cards/new`}
                className="btn btn-primary"
              >
                <span className="oi oi-plus" /> Add Cards
              </Link>
            </div>
            <div className="col-2">
              <button onClick={handleDeckDelete} className="btn btn-danger">
                <span className="oi oi-trash" />
              </button>
            </div>
          </div>
          <br />
          <p className=" p-3 bg-light font-italic border ">No Cards in Deck.</p>
        </div>
      </div>
    );
  }
}
export default DeckScreen;
