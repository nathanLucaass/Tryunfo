import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilterName extends Component {
  render() {
    const { nameFilter, onInputChange, onInputChange2, cardRare, cardTrunfo } = this.props;

    return (
      <div id="filtra">
        {' '}

        <label htmlFor="" onChange={ nameFilter } id="abc">
          <h2>Filtros</h2>
          <input
            id="filtra"
            data-testid="name-filter"
            type="text"
            name="nomeFiltrado"
            onChange={ onInputChange }
          />
          <select
            name="filtraradidade"
            value={ cardRare }
            onChange={ onInputChange }
            data-testid="rare-filter"
          >
            <option value="Todas">Todas</option>
            <option value="Normal">Normal</option>
            <option value="Raro">Raro</option>
            <option value="Muito Raro">Muito Raro</option>
          </select>
          <div>
            Super Trunfo
            <input
              id="filtrocheck"
              name="filtrotrunfo"
              type="checkbox"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </div>
        </label>
      </div>
    );
  }
}

FilterName.propTypes = {
  nameFilter: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  cardRare: PropTypes.string.isRequired,
};
