import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DeckForm from './DeckForm';
import { readDeck, updateDeck } from '../../utils/api/index';

function EditDeck() {
  const initialFormState = {
    name: '',
    description: '',
  };
  const { deckId } = useParams();
  const [deck, setDeck] = useState(initialFormState);
  useEffect(() => {
    async function loadData() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Ignore `AbortError`
          console.log('Aborted');
        } else throw error;
      }
    }
    loadData();
  }, [deckId]);

  const changeHandler = ({ target }) => {
    const { value, name } = target;
    setDeck({
      ...deck,
      [name]: value,
    });
  };

  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    //console.log("Submitted:", deck);
    async function updateData() {
      try {
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Ignore `AbortError`
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
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item" key="1">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" key="2">
            Edit Deck
          </li>
        </ol>
      </nav>
      <br />

      <h2>Edit Deck</h2>

      <form onSubmit={submitHandler}>
        <DeckForm formData={deck} changeHandler={changeHandler} />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>{' '}
        &nbsp;
        <button type="submit" value="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default EditDeck;
