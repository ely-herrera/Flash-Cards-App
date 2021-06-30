import React from 'react';
function DeckForm({ formData, changeHandler }) {
  return (
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label htmlFor="validationDefault01">Name:</label>
        <input
          className="form-control"
          id="validationDefault01"
          type="text"
          name="name"
          onChange={changeHandler}
          value={formData.name}
          placeholder="Deck Name"
          required
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="validationDefault02">Description:</label>
        <textarea
          className="form-control"
          id="validationDefault02"
          type="text"
          name="description"
          onChange={changeHandler}
          value={formData.description}
          placeholder="Brief description of the deck"
          required
        />
      </div>
    </div>
  );
}

export default DeckForm;
