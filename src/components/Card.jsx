import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      removeClick,
      id,

    } = this.props;
    return (
      <div id={ id } className="card-container">
        <h2 data-testid="name-card" className="card-title">
          {cardName}
        </h2>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" className="card-image" />
        <p data-testid="description-card" className="card-description">{cardDescription}</p>
        <h2 data-testid="attr1-card" className="card-attr1">{cardAttr1}</h2>
        <h2 data-testid="attr2-card" className="card-attr2">{cardAttr2}</h2>
        <h2 data-testid="attr3-card" className="card-attr3">{cardAttr3}</h2>
        <h3 data-testid="rare-card" className="card-rare">{cardRare}</h3>
        {cardTrunfo && (
          <p data-testid="trunfo-card">Super Trunfo</p>
        )}
        {id !== 'preview' && (
          <button data-testid="delete-button" onClick={ removeClick }>Excluir</button>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.number.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.string.isRequired,
  removeClick: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
