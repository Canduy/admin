import { Modal, Button } from '@themesberg/react-bootstrap';

function MyModal(props) {
	return (
		<Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header>
				<Modal.Title className='h6'>{props.title}</Modal.Title>
				<Button variant='close' aria-label='Close' onClick={props.onHide} />
			</Modal.Header>
			<Modal.Body>
				<p>Bạn có chắc muốn xóa {props.type} này không?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='danger' onClick={props.onDelete}>
					Xóa
				</Button>
				<Button variant='light' className='text-gray' onClick={props.onHide}>
					Đóng
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MyModal;
