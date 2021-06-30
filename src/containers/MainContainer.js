import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolioStocks: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(json => {
      this.setState({stocks: json})
    })
  }

  handleAddStockToPortfolio = (selectedStock) => {
    const newStocks = this.state.stocks.filter(stock => stock !== selectedStock)

    this.setState(previousState => {
      return {
        stocks: newStocks,
        portfolioStocks: [...previousState.portfolioStocks, selectedStock]
      }
    })
  }

  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer
              stocks={this.state.stocks}
              handleAddStockToPortfolio={this.handleAddStockToPortfolio}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
              portfolioStocks={this.state.portfolioStocks}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
