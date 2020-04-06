import React, { Component } from 'react';

import CardContainer from './Card/card-container';

import './App.css';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };

    this.data = data;
    this.dataMap = {};
  }

  componentDidMount() {
    // Sort in descending order of `edge.order`
    this.data.sort((a, b) => a.edge.order < b.edge.order);

    // Get parent cards into `dataMap`
    this.data.forEach((item, index) => {
      if (item.edge.type === 0)
        this.dataMap[item.id] = { ...item,
                             child: [] };
    });

    // Add child cards to corresponding parent card
    this.data.forEach((item, index) => {
      if (item.edge.type === 2)
        this.dataMap[item.edge.parent].child.push(item);
    });

    // Filter out child cards in `data`
    this.data = this.data.filter(item => item.edge.type === 0);

    this.setState({ loaded: true });
  }

  render() {
    let cards = null;

    if (this.state.loaded)
      cards = this.data.map((item, index) => {
        return <CardContainer key={item.id} data={this.dataMap[item.id]}/>;
      });

    return (
      <div className="App-container">
        <div className="App-content">
          {cards}
        </div>
      </div>
    );
  }
}

export default App;
