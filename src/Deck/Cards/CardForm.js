import React from 'react';

const CardForm = ({ formData, handleChange }) => {
  return (
    <div className="form">
      <div className="col--6 mb-3">
        <label htmlFor="validationDefault01">Front:</label>
        <textarea
          className="form-control"
          id="front"
          type="text"
          name="front"
          rows="3"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of card"
        />
      </div>
      <div className="col--6 mb-3">
        <label>Back:</label>
        <textarea
          className="form-control"
          id="back"
          type="textarea"
          name="back"
          rows="3"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
        />
      </div>
    </div>
  );
};
export default CardForm;
