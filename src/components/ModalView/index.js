// @flow
import { css } from "aphrodite";
import React, { useState } from "react";
import { Button } from "..";
import PropTypes from "prop-types";
import styles from "./styles";
import { Modal } from "react-bootstrap";

const ModalView = (props) => {
	const {
		title,
		children,
		cancelText,
		cancelOnClick,
		submitText,
		submitOnClick,
		showModal,
		setShowModal,
    isLoading
	} = props;

	return (
		<Modal
			centered
			show={showModal}
			onHide={() => {
				setShowModal(false);
				cancelOnClick();
			}}
			dialogClassName="modal-90w"
			aria-labelledby="modal-confirm"
			backdrop={props.backdrop}
			keyboard={false}
			className={`${css(styles.main)}`}
		>
			{title && (
				<Modal.Header
					className={`justify-content-center border-0 ${css(
						styles.modalHeder
					)}`}
				>
					<Modal.Title
						id="modal-confirm"
						className={`${css(styles.modalTitle)}`}
					>
						{title}
					</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body className={`border-0 ${css(styles.modalBody)}`}>
				{children}
			</Modal.Body>
			{props.showFooter && (
				<Modal.Footer className={`border-0 ${css(styles.modalFooter)}`}>
					<strong
						onClick={cancelOnClick}
						className={`cursor-pointer ${css(styles.noThanks)}`}
					>
						{cancelText}
					</strong>
					<Button
						onClick={submitOnClick}
						className={`${css(styles.cancelBtn)}`}
            isLoading={isLoading}
					>
						{submitText}
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

ModalView.propTypes = {
	title: PropTypes.string,
	cancelText: PropTypes.string,
	cancelOnClick: PropTypes.func,
	submitText: PropTypes.string,
	submitOnClick: PropTypes.func,
	isLoading: PropTypes.bool,
};

ModalView.defaultProps = {
	title: "",
	cancelText: "",
	cancelOnClick: () => {},
	submitText: "",
	submitOnClick: () => {},
	backdrop: true,
	showFooter: true,
	isLoading: false,
};

export default ModalView;
