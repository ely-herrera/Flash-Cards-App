import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import CardForm from './CardForm';
import { readDeck, readCard, updateCard } from '../../utils/api/index';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  useEffect(() => {
    setDeck({});
    async function loadData() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);

        const cardData = await readCard(cardId);
        setCard(cardData);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else throw error;
      }
    }
    loadData();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setCard({
      ...card,
      [name]: value,
    });
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    let output = [];
    event.preventDefault();
    console.log('Submitted:', card);
    async function updateData() {
      try {
        await updateCard(card);

        history.push(`/decks/${deckId}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else throw error;
      }
    }
    updateData();
  };
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
          <li className="breadcrumb-item" key="1">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="2">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <br />

      <h2>Edit Card</h2>

      <form onSubmit={handleSubmit}>
        <CardForm formData={card} handleChange={handleChange} />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>{' '}
        &nbsp;
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
export default EditCard;
