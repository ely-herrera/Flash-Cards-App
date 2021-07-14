import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createDeck, readDeck, updateDeck } from '../../utils/api';

function DeckForm({ formProps: { title, input, description, submitType } }) {
  const {
    url,
    params: { deckId },
  } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
        setFormData({
          name: response.name,
          description: response.description,
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted', deckId);
        } else {
          throw error;
        }
      }
    }

    if (url !== '/decks/new') {
      getDeck();
    }

    return () => {
      abortController.abort();
    };
  }, [deckId, url]);

  const initialFormState = {
    name: deck.name ? deck.name : '',
    description: deck.description ? deck.description : '',
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (submitType === 'editDeck') {
      formData.id = deckId;
    }
    submitType === 'newDeck'
      ? createDeck(formData).then((res) => {
          history.push(`/decks/${res.id}`);
        })
      : updateDeck(formData).then((res) => {
          history.push(`/decks/${res.id}`);
        });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <h2>{title}</h2>
      <form className="form-group" onSubmit={submitHandler}>
        <div>
          <label>
            {input}
            <input
              name="name"
              className="form-control"
              type="text"
              defaultValue={formData.name}
              onChange={handleChange}
              placeholder="Deck Name"
            />
          </label>
        </div>
        <div>
          <label>
            {description}
            <textarea
              name="description"
              className="form-control"
              defaultValue={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the deck"
            ></textarea>
          </label>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default DeckForm;
