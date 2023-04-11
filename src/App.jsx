import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import FilterName from './components/FilterName';
import './index.css';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'Normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    cards: [],
    hasTrunfo: false,
    nomeFiltrado: '',
    resultadoFiltro: '',
    resultadoFiltro2: '',
    filtroRaridade: 'Normal',
  };

  validate = () => {
    const { cardName,
      cardImage,
      cardDescription,
      cardAttr1, cardAttr2,
      cardAttr3,
    } = this.state;

    const max = 90;
    const maxtotal = 210;
    const total = [parseFloat(cardAttr1), parseFloat(cardAttr2), parseFloat(cardAttr3)];
    const reducedTotal = total.reduce((acc, curr) => acc + curr, 0);
    if (
      cardName
      && cardImage
      && cardDescription
      && cardAttr1 >= 0
      && cardAttr1 <= max
      && cardAttr2 >= 0
      && cardAttr2 <= max
      && cardAttr3 >= 0
      && cardAttr3 <= max
      && reducedTotal <= maxtotal
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      cards,
    } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [...cards, newCard],
      hasTrunfo: cardTrunfo,
      nomeFiltrado: '',
    });
  };

  onInputChange = (event) => {
    event.preventDefault();
    const { target } = event;
    const { name, checked } = target;
    const value = target.type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    }, this.validate);
  };

  removeClick = (filtro) => {
    this.setState((prevState) => ({
      cards: prevState.cards.filter((card) => card.cardName !== filtro),
      hasTrunfo: false,
    }));
  };

  nameFilter = (event) => {
    event.preventDefault();
    const { cards } = this.state;
    const { value } = event.target;
    let resultadoFiltro;

    if (value === 'Todas') {
      resultadoFiltro = cards;
    } else {
      resultadoFiltro = cards.filter(
        (card) => card.cardName.includes(value) || card.cardRare === value,
      );
    }

    this.setState({
      nomeFiltrado: value,
      resultadoFiltro,
    });
  };

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
      isSaveButtonDisabled,
      hasTrunfo,
      cards,
      resultadoFiltro,
      nomeFiltrado,
    } = this.state;

    return (
      <>
        <header>
          <img src="https://i.ibb.co/X4SPFSZ/Captura-de-tela-de-2023-04-10-11-47-57-removebg-preview.png" id="logo" alt="Logo" />
        </header>
        <main>
          <div id="form" className="form-container">
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <div id="preview" className="preview-container">
            <Card
              id="preview"
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />

          </div>
          <div id="last-card" className="last-card-container">
            <FilterName
              id="filtro"
              onChange={ this.nameFilter }
              onInputChange={ this.nameFilter }
            />
            { nomeFiltrado.length > 0 && (
              <div>
                {resultadoFiltro.map((carta) => (
                  <Card
                    id={ carta.cardName }
                    key={ carta.cardName }
                    cardName={ carta.cardName }
                    cardDescription={ carta.cardDescription }
                    cardAttr1={ carta.cardAttr1 }
                    cardAttr2={ carta.cardAttr2 }
                    cardAttr3={ carta.cardAttr3 }
                    cardImage={ carta.cardImage }
                    cardRare={ carta.cardRare }
                    cardTrunfo={ carta.cardTrunfo }
                    removeClick={ () => this.removeClick(carta.cardName) }
                  />
                ))}
              </div>
            )}
            { nomeFiltrado.length <= 0 && (
              <div>
                {cards.map((carta) => (
                  <Card
                    id={ carta.cardName }
                    key={ carta.cardName }
                    cardName={ carta.cardName }
                    cardDescription={ carta.cardDescription }
                    cardAttr1={ carta.cardAttr1 }
                    cardAttr2={ carta.cardAttr2 }
                    cardAttr3={ carta.cardAttr3 }
                    cardImage={ carta.cardImage }
                    cardRare={ carta.cardRare }
                    cardTrunfo={ carta.cardTrunfo }
                    removeClick={ () => this.removeClick(carta.cardName) }
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </>
    );
  }
}

export default App;
