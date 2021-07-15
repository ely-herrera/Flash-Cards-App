import { readDeck, updateDeck } from '../../utils/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target: { name, value } }) => {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function clickSubmit(deck) {
    updateDeck(deck).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    clickSubmit(deck);
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-group">
            Deck Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={deck.name}
            placeholder="Name your deck"
            className="form-control"
            width=" 100%"
          />

          <p></p>
          <label className="form-group">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={deck.description}
            placeholder="1-2 sentences describing content of your deck"
            class="form-control"
          ></textarea>

          <p></p>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => history.push('/')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default EditDeck;
