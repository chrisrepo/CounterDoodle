import React from 'react';
import Modal from 'react-modal';
import './ModalPopup.css';

export default class ModalPopup extends React.Component {
  render() {
    return <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Test Label"
          className="ModalPopup"
          ariaHideApp={false}
        >
        <div className="modalContainer">
          <div className="countDisplay">Count: {this.props.count}</div>
          <div className="countDisplay">Next Count: {this.props.nextCount}</div>
          <button className="closeButton" onClick={this.props.closeModal}>Cancel</button>
          <button className="confirmButton" onClick={this.props.confirm}>Confirm</button>
          </div>
        </Modal>
  }
}
