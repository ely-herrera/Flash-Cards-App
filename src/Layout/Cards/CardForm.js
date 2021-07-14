import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createCard, readCard, updateCard } from '../../utils/api';

function CardForm({
  formProps: { title, input, description, submitType },
  deck,
}) {
  const {
    params: { cardId },
  } = useRouteMatch();
  const [card, setCard] = useState({});
  const history = useHistory();
  const initialFormState = {
    front: card.front ? card.front : '',
    back: card.back ? card.back : '',
  };

  function getCard() {
    if (cardId) {
      readCard(cardId).then((res) => {
        setCard(res);
        setFormData({ front: res.front, back: res.back });
      });
    }
  }

  useEffect(getCard, [cardId]);

  const [formData, setFormData] = useState(initialFormState);
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (submitType === 'editCard') {
      formData.id = cardId;
    }
    submitType === 'newCard'
      ? createCard(deck.id, formData).then(() =>
          history.push(`/decks/${deck.id}`)
        )
      : updateCard(formData).then(() => history.push(`/decks/${deck.id}`));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <h3>
        <span>{deck.name}</span>: <span>{title}</span>
      </h3>
      <form className="form-group" onSubmit={submitHandler}>
        <div>
          <label>
            {input}
            <textarea
              name="front"
              className="form-control"
              onChange={handleChange}
              defaultValue={formData.front}
              placeholder="Front Side of card"
            ></textarea>
          </label>
        </div>
        <div>
          <label>
            {description}
            <textarea
              name="back"
              className="form-control"
              onChange={handleChange}
              defaultValue={formData.back}
              placeholder="Back side of card"
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

export default CardForm;
