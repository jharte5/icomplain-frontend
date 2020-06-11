import React, { Component } from 'react'
import Modal from 'react-modal'

Modal.setAppElement("#root");
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: 400,
    },
};
export default class BlogModal extends Component {
    render() {
        const { isOpen, onModalClose, _id } = this.props;
        return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onModalClose}
            style={customStyles}
        >
            Modal here
        </Modal>
        );
    }
}