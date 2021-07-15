import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: '',
    back: '',
  };
  const [card, setCard] = useState(initialFormState);
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target: { name, value } }) => {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitButton(card) {
    createCard(deckId, card);
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
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name} :Add a Card</h1>
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

export default AddCard;
