import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const { deckId } = useParams();

  console.log(deckId);
  const [cardFront, setCardFront] = useState(true);
  const [cardAmount, setCardAmount] = useState(0);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setCards({});
    const abortController = new AbortController();
    async function loadData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        setCards(data.cards);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted!');
        } else throw error;
      }
    }
    loadData();
    return () => abortController.abort();
  }, [deckId]);

  function cardFlip() {
    setCardFront(!cardFront);
  }
  const history = useHistory();

  function cardSwitch() {
    if (cardAmount + 1 < cards.length) {
      setCardAmount(cardAmount + 1);
      setCardFront(true);
    } else {
      const windowMsg = window.confirm(`Restart cards?
      
      Click "cancel" to return to the home page. `);
      if (windowMsg) {
        setCardAmount(0);
        setCardFront(true);
      } else history.push('/');
    }
  }

  const BreadCrumbBar = () => {
    return (
      <div className="navigation  row-col">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" key="1">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="2">
              Study
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  if (cards.length > 2) {
    return (
      <div>
        <BreadCrumbBar />
        <h2>Study: {deck.name}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardAmount + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {cardFront
                ? `${cards[cardAmount].front}`
                : `${cards[cardAmount].back}`}
            </p>
            <button className="btn btn-secondary" onClick={cardFlip}>
              Flip
            </button>{' '}
            &nbsp;
            {cardFront ? (
              ' '
            ) : (
              <button className="btn btn-primary" onClick={cardSwitch}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BreadCrumbBar />
      <h2>Study: {deck.name}</h2>
      <div className="card border-danger">
        <div className="card-body text-danger">
          <h5 className="card-title">Not Enough Cards.</h5>
          <p className="card-text">
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            <span className="oi oi-plus" /> Add Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Study;
