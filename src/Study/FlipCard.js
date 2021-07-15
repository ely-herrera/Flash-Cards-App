import React, { useEffect, useState } from 'react';

const nextView = {
  front: 'back',
  back: 'front',
};

function FlipCard({ card = {}, title, children }) {
  const [view, setView] = useState('front');
  const [flipped, setFlipped] = useState(false);

  function flipHandler() {
    setView((prevState) => nextView[prevState]);
    setFlipped(true);
  }

  useEffect(() => {
    setView('front');
    setFlipped(false);
  }, [card]);

  return (
    <div className={`card ${view} study-card`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{card[view]}</p>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={flipHandler}
        >
          Flip
        </button>
        {flipped && children}
      </div>
    </div>
  );
}

export default FlipCard;
