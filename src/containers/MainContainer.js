import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolioStocks: [],
    sort: 'None',
    filter: 'All'
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


  handleSellStock = (selectedStock) => {
    const newPortfolioStocks = this.state.portfolioStocks.filter(stock => stock !== selectedStock)

    this.setState(previousState => {
      return {
        stocks: [...previousState.stocks, selectedStock],
        portfolioStocks: newPortfolioStocks
      }
    })
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  displayStocks = () => {
    let filteredStocks = [...this.state.stocks]

    if(this.state.filter !== 'All') {
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    }

    switch(this.state.sort){
      case 'Alphabetically':
        return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case 'Price':
        return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
      default:
        return filteredStocks
    }

  }

  render() {


    return (
      <div>
        <SearchBar
        sort={this.state.sort}
        handleFormChange={this.handleFormChange}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
              stocks={this.displayStocks()}
              handleStock={this.handleAddStockToPortfolio}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
              portfolioStocks={this.state.portfolioStocks}
              handleStock={this.handleSellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
