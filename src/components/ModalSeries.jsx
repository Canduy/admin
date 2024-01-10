import { Modal, InputGroup, Form, Col, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getMySeries } from 'reducers/series';
import { useDispatch } from 'react-redux';
import { NotificationError } from 'helpers/Error';
import { useFormik } from 'formik';
import { nameBookShelve } from 'helpers/Validation';
import { createSeri } from 'reducers/series';
import _ from 'lodash';
import { toast } from 'react-toastify';

function ModalSeries({
	showModalSeries,
	handleCloseModalSeries,
	seriData,
	setSeriData,
	inBookDetail,
	bookId,
	currentSeries,
	handleGetBookDetail,
}) {
	const [currentSeriList, setCurrentSeriList] = useState([]);
	const [allSeriList, setAllSeriList] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [updateListSeries, setUpdateListSeries] = useState(false);
	const [inputSearch, setInputSearch] = useState('');
	const [seriTemp, setSeriTemp] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		if (showModalSeries) {
			setSeriTemp(seriData);
		}
	}, [showModalSeries]);

	useEffect(() => {
		handleGetSeriesList();
	}, [updateListSeries]);

	const handleSearch = e => {
		setInputSearch(e.target.value);
		setCurrentSeriList(allSeriList.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
	};

	const handleGetSeriesList = async () => {
		try {
			const res = await dispatch(getMySeries()).unwrap();
			setAllSeriList(res);
			setCurrentSeriList(res);
		} catch (err) {
			NotificationError(err);
		}
	};

	const handleCreateSeri = async seriName => {
		if (!_.isEmpty(seriName)) {
			try {
				await dispatch(createSeri(seriName)).unwrap();
				toast.success('Tạo sê-ri thành công');
				setUpdateListSeries(!updateListSeries);
			} catch (err) {
				NotificationError(err);
			} finally {
				setShowInput(false);
			}
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: handleCreateSeri,
		validationSchema: nameBookShelve,
	});

	const addSeries = () => {
		if (!showInput) {
			setShowInput(true);
		}
	};

	const handleConfirm = async () => {
		setSeriData(seriTemp);
		handleCloseModalSeries();

		// // Trước hết kiểm tra xem sách đã ở trong một series chưa
		// if (currentSeries) {
		// 	// Đầu tiên xóa sách khỏi series cũ
		// 	const paramsForRemoveBookFromSeries = {
		// 		seriesId: currentSeries.id,
		// 		body: { bookIds: [Number(bookId)] },
		// 	};
		// 	await handleRemoveBookFromSeries(paramsForRemoveBookFromSeries);
		// 	// Sau đó thêm lại sách vào series mới chọn
		// 	const paramsForAddBookToSeries = {
		// 		seriesId: temporarySeries.id,
		// 		body: { bookIds: [Number(bookId)] },
		// 	};
		// 	handleAddBookToSeries(paramsForAddBookToSeries);
		// } else if (bookId) {
		// 	// Nếu sách chưa ở trong một series nào thì không cần xóa sách khỏi series cũ nữa
		// 	const paramsForAddBookToSeries = {
		// 		seriesId: temporarySeries.id,
		// 		body: { bookIds: [Number(bookId)] },
		// 	};
		// 	handleAddBookToSeries(paramsForAddBookToSeries);
		// }
	};

	return (
		<Modal className='modal-series' show={showModalSeries} onHide={handleCloseModalSeries} centered>
			<Modal.Header closeButton>
				<Modal.Title>Sê-ri</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Sê-ri bộ sách'
						readOnly
						disabled
						value={!_.isEmpty(seriTemp) ? seriTemp.name : ''}
					/>
				</Form.Group>
				<div className='px-3 modal-series__body'>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon={faSearch} />
						</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Tìm kiếm tên sê-ri'
							value={inputSearch}
							onChange={handleSearch}
						/>
					</InputGroup>
					<div className='modal-series__body__options'>
						{currentSeriList.length > 0 ? (
							currentSeriList.map(item => (
								<label key={item.id} className='row-options'>
									<Col xs={10}>
										<div className='modal-series-options-title'>{item.name}</div>
									</Col>
									<Col xs={2} className='modal-series-options-checkbox'>
										<div className='modal-series-options-container'>
											<input
												type='radio'
												name='title'
												checked={seriTemp.id === item.id}
												onChange={() => setSeriTemp(item)}
											/>
											<div className='modal-series-options-checkmark'></div>
										</div>
									</Col>
								</label>
							))
						) : (
							<h6 className='p-4 m-0' style={{ textAlign: 'center' }}>
								Không có sê-ri nào
							</h6>
						)}
					</div>
					{showInput ? (
						<Form onSubmit={formik.handleSubmit}>
							<Form.Group>
								<Form.Control
									type='text'
									name='name'
									placeholder='Nhập để thêm tên sê-ri bộ sách'
									value={formik.values.name}
									onChange={formik.handleChange}
									autoFocus
								/>
								{formik.errors.name && <p className='text-danger m-1'>{formik.errors.name}</p>}
							</Form.Group>
						</Form>
					) : (
						<div className='modal-series__body__button' onClick={addSeries}>
							<FontAwesomeIcon icon={faPlus} />
							<span>Thêm sê-ri</span>
						</div>
					)}
				</div>
				<Button
					onClick={handleConfirm}
					style={!seriTemp?.name ? { backgroundColor: '#d9dbe9' } : null}
					disabled={!seriTemp?.name ? true : false}
				>
					Xác nhận
				</Button>
			</Modal.Body>
		</Modal>
	);
}

ModalSeries.defaultProps = {
	showModalSeries: false,
	handleCloseModalSeries: () => {},
	seriData: {},
	setSeriData: () => {},
	inBookDetail: false,
	bookId: null,
	currentSeries: [],
	handleGetBookDetail: () => {},
};

export default ModalSeries;
