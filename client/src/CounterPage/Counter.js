import React, { Component } from 'react';
import ModalPopup from './ModalPopup';
import './Counter.css';
import {getTextWidth, cssGet} from '../cssHelper.js';
import {API_LOCATION} from '../constants.js';

class Counter extends Component {
  state = {
    count: 0,
    nextCount: 1,
    modalIsOpen: false,
  };

  componentDidMount() {
    let span = document.getElementById("countLabel");
    //save the font for width calculation later
    let font = cssGet(span, 'font');
    this.setState({
      labelFont: font
    })
  }

  increment = async () => {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({count: this.state.count, token: this.props.authToken})
    }
    const response = await fetch(API_LOCATION +'/counter/nextCount', config);
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message)
    } else {
      this.setState({
        nextCount: body.increment
      })
    }
    return body;
  };

  //Keep element to the right of the absolute positioned center label
  calculateButtonStyle = () => {
    if(this.state.labelFont) {
      let padding = 5;//add a few px between count label & button for easier readability
      let textToMeasure = "Count: " + this.state.count;
      let width = getTextWidth(textToMeasure, this.state.labelFont);
      let buttonWidth = getTextWidth("Increment", this.state.labelFont);
      return (width/2 + buttonWidth/2 + padding) * -1;
    }
  }

  toggleModalPopup = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  incrementClicked = () => {
    this.increment();
    this.toggleModalPopup();
  }

  confirmIncrement = () => {
    this.setState({
      count: this.state.nextCount
    });
    this.toggleModalPopup();
  }

  render() {
    let modalPopup = <ModalPopup isOpen={this.state.modalIsOpen} closeModal={this.toggleModalPopup} confirm={this.confirmIncrement} count={this.state.count} nextCount={this.state.nextCount}/>
    return (
      <div className="Counter">
      {modalPopup}
        <div className="countLabelContainer">
          <span id="countLabel" className="countLabelSpan">Count: {this.state.count}</span>
          <button id="countButton" className="incrementButton" style={{right: this.calculateButtonStyle()}} onClick={this.incrementClicked}>Increment</button>
        </div>
      </div>
    );
  }
}

export default Counter;
