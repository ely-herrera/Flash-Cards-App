import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({ front: '', back: '' });
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  const handleChange = ({ target: { name, value } }) => {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitButton(card) {
    updateCard(card).then(history.push(`/decks/${deck.id}`));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    submitButton({ ...card });
    setCard({ front: '', back: '' });
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card{cardId}
          </li>
        </ol>
      </nav>
      <h1> Edit Card </h1>
      <form onSubmit={submitHandler}>
        <label>Front</label>
        <textarea
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={card.front}
          placeholder="front side of card"
          class="form-control"
        ></textarea>
        <label>Back</label>
        <textarea
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={card.back}
          placeholder="back side of card"
          class="form-control"
        ></textarea>
        <button
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn btn-secondary mr-2"
        >
          Done
        </button>
        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
}

export default EditCard;
