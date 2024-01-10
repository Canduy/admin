import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Col,
	Container,
	Dropdown,
	Form,
	Image,
	InputGroup,
	ListGroup,
	Nav,
	Navbar,
	Row,
} from '@themesberg/react-bootstrap';
import avatarDefault from 'assets/img/avatar-default.jpeg';
import { optionsListData } from 'constants';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NOTIFICATIONS_DATA from '../data/notifications';

export default () => {
	const [inputSearchValue, setInputSearchValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);
	const [intialSuggestionList, setIntialSuggestionList] = useState([]);
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
	const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

	const searchWrapper = useRef(null);

	const history = useHistory();

	const userInfo = {};
	// const { handleLogout } = useHookHandleLogout();

	const checkClickSearchBar = e => {
		if (!searchWrapper.current.contains(e.target)) {
			setShowSuggestion(false);
		} else {
			setShowSuggestion(true);
		}
	};

	useEffect(() => {
		const grouped = _.mapValues(_.groupBy(optionsListData, 'group'), optionsList =>
			optionsList.map(item => _.omit(item, 'group'))
		);
		setIntialSuggestionList(Object.entries(grouped));
		setSuggestionList(Object.entries(grouped));

		document.addEventListener('click', checkClickSearchBar);
		return () => {
			document.removeEventListener('click', checkClickSearchBar);
		};
	}, []);

	const markNotificationsAsRead = () => {
		setTimeout(() => {
			setNotifications(notifications.map(n => ({ ...n, read: true })));
		}, 300);
	};

	const Notification = props => {
		const { link, sender, image, time, message, read = false } = props;
		const readClassName = read ? '' : 'text-danger';

		return (
			<ListGroup.Item action href={link} className='border-bottom border-light'>
				<Row className='align-items-center'>
					<Col className='col-auto'>
						<Image src={image} className='user-avatar lg-avatar rounded-circle' />
					</Col>
					<Col className='ps-0 ms--2'>
						<div className='d-flex justify-content-between align-items-center'>
							<div>
								<h4 className='h6 mb-0 text-small'>{sender}</h4>
							</div>
							<div className='text-end'>
								<small className={readClassName}>{time}</small>
							</div>
						</div>
						<p className='font-small mt-1 mb-0'>{message}</p>
					</Col>
				</Row>
			</ListGroup.Item>
		);
	};

	const updateInputSearch = e => {
		setInputSearchValue(e.target.value);
		const valueSearch = e.target.value.trim();
		if (valueSearch) {
			const temp = optionsListData.filter(item => item.label.toLowerCase().includes(valueSearch.toLowerCase()));
			const grouped = _.mapValues(_.groupBy(temp, 'group'), optionsList =>
				optionsList.map(item => _.omit(item, 'group'))
			);
			setSuggestionList(Object.entries(grouped));
		} else {
			setSuggestionList(intialSuggestionList);
		}
	};

	const editAdmin = () => {
		history.push(`/edit-user/${userInfo.id}`);
	};

	const handleClickSearchItem = item => {
		setInputSearchValue('');
		setShowSuggestion(false);
		history.push(item.path);
	};

	return (
		<Navbar variant='dark' expanded className='ps-0 pe-2 pb-0'>
			<Container fluid className='px-0'>
				<div className='d-flex justify-content-between w-100'>
					<div className='navbar-search-wrapper' ref={searchWrapper}>
						<Form className='navbar-search'>
							<Form.Group id='topbarSearch'>
								<InputGroup className='input-group-merge search-bar'>
									<InputGroup.Text>
										<FontAwesomeIcon icon={faSearch} />
									</InputGroup.Text>
									<Form.Control
										type='text'
										placeholder='Tìm kiếm'
										value={inputSearchValue}
										onChange={updateInputSearch}
										onKeyPress={e => {
											if (e.key === 'Enter') {
												e.preventDefault();
											}
										}}
									/>
								</InputGroup>
							</Form.Group>
						</Form>
						{showSuggestion && (
							<div className='navbar-suggestion'>
								{suggestionList.length > 0 ? (
									<>
										{suggestionList.map((item, index) => (
											<div key={index} className='navbar-suggestion__group p-2'>
												<span className='navbar-suggestion__group__title p-1 fw-bolder'>
													{item[0]}
												</span>
												{item[1].map((subItem, subIndex) => (
													<div
														key={subIndex}
														className='navbar-suggestion__item p-1 rounded-3'
														onClick={() => handleClickSearchItem(subItem)}
													>
														{subItem.label}
													</div>
												))}
											</div>
										))}
									</>
								) : (
									<p className='w-100 m-0' style={{ textAlign: 'center' }}>
										Không có kết quả tìm kiếm nào
									</p>
								)}
							</div>
						)}
					</div>
					<Nav className='align-items-center'>
						{/* <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead}>
							<Dropdown.Toggle as={Nav.Link} className='text-dark icon-notifications me-lg-3'>
								<span className='icon icon-sm'>
									<FontAwesomeIcon icon={faBell} className='bell-shake' />
									{areNotificationsRead ? null : (
										<span className='icon-badge rounded-circle unread-notifications' />
									)}
								</span>
							</Dropdown.Toggle>
							<Dropdown.Menu className='dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0'>
								<ListGroup className='list-group-flush'>
									<Nav.Link
										href='#'
										className='text-center text-primary fw-bold border-bottom border-light py-3'
									>
										Notifications
									</Nav.Link>

									{notifications.map(n => (
										<Notification key={`notification-${n.id}`} {...n} />
									))}

									<Dropdown.Item className='text-center text-primary fw-bold py-3'>
										View all
									</Dropdown.Item>
								</ListGroup>
							</Dropdown.Menu>
						</Dropdown> */}

						<Dropdown as={Nav.Item}>
							<Dropdown.Toggle as={Nav.Link} className='pt-1 px-0'>
								<div className='media d-flex align-items-center'>
									<img
										src={userInfo.avatarImage || avatarDefault}
										className='user-avatar md-avatar rounded-circle'
									/>
									<div className='media-body ms-2 text-dark align-items-center d-none d-lg-block'>
										<span className='mb-0 font-small fw-bold'>
											{userInfo.fullName || `${userInfo.firstName} ${userInfo.lastName}`}
										</span>
									</div>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu className='user-dropdown dropdown-menu-right mt-2'>
								<Dropdown.Item className='fw-bold' onClick={editAdmin}>
									<FontAwesomeIcon icon={faUserCircle} className='me-2' />
									Thông tin cá nhân
								</Dropdown.Item>

								{/* <Dropdown.Item className='fw-bold'>
									<FontAwesomeIcon icon={faEnvelopeOpen} className='me-2' />
									Tin nhắn
								</Dropdown.Item> */}

								<Dropdown.Divider />

								<Dropdown.Item className='fw-bold' >
									<FontAwesomeIcon icon={faSignOutAlt} className='text-danger me-2' />
									Đăng xuất
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</div>
			</Container>
		</Navbar>
	);
};
