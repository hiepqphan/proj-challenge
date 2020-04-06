import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

import Card from './card';

import './card.css';

/*
  This component takes the data of a parent card and its children to display their info.
  @props
  data: object contains info of a parent. `data.child` is an array of objects containing children's info.
*/
export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { showChild: false, };
  }

  toggleChild = () => {
    this.setState(prevState => { return { showChild: !prevState.showChild}; });
  }

  render() {
    let children = null;

    if (typeof(this.props.data.child) === typeof([])) {
      children = this.props.data.child.map((item, index) => {
        return <Card key={item.id} data={item} isChild={true}/>;
      });
    }

    return (
      <div className="card-container">
        <Card data={this.props.data} toggleChild={this.toggleChild} showChild={this.state.showChild}/>
          <div className="card-child-container">
            <AnimateHeight duration={300} height={this.state.showChild ? "auto" : 0}>
              {children}
            </AnimateHeight>
          </div>
      </div>
    );
  }
}
