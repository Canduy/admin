import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Routes } from 'routes';
import BgImage from '../../assets/img/illustrations/signin.svg';

export default () => {
	// const dispatch = useDispatch();
	// const history = useHistory();

	const handleSubmit = async data => {
		const dataSend = {
			email: data.email,
			password: data.password,
		};
		// try {
		// 	const infoUserLogin = await dispatch(login(dataSend)).unwrap();
		// 	if (infoUserLogin.role === 'admin') {
		// 		toast.success('Đăng nhập thành công');
		// 		history.push('/');
		// 	} else {
		// 		toast.error('Bạn không có quyền truy cập');
		// 	}
		// } catch (error) {
		// 	NotificationError(error);
		// }
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: handleSubmit,
		// validationSchema: Validation.login()
	});

	return (
		<main>
			<section className='d-flex align-items-center my-5 mt-lg-7 mb-lg-5'>
				<Container>
					<Row
						className='justify-content-center form-bg-image'
						style={{ backgroundImage: `url(${BgImage})` }}
					>
						<Col xs={12} className='d-flex align-items-center justify-content-center'>
							<div className='bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
								<div className='text-center text-md-center mb-4 mt-md-0'>
									<h3 className='mb-0'>Đăng nhập Admin</h3>
								</div>
								<Form className='mt-4' onSubmit={formik.handleSubmit} autoComplete='off'>
									<Form.Group id='email' className='mb-4'>
										<Form.Label>Email</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control
												autoFocus
												required
												type='email'
												placeholder='Email'
												name='email'
												value={formik.values.email}
												autoComplete='false'
												onChange={formik.handleChange}
											/>
										</InputGroup>
									</Form.Group>

									<Form.Group id='password' className='mb-4'>
										<Form.Label>Mật khẩu</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUnlockAlt} />
											</InputGroup.Text>
											<Form.Control
												required
												type='password'
												placeholder='Mật khẩu'
												name='password'
												value={formik.values.password}
												autoComplete='new-password'
												onChange={formik.handleChange}
											/>
										</InputGroup>
									</Form.Group>
									<Button variant='primary' type='submit' className='w-100 mt-5'>
										Đăng nhập
									</Button>
									<p className='text-center mt-3'>
										<Card.Link as={Link} className='text-gray-700' to={Routes.ForgotPassword.path}>
											Quên mật khẩu ?
										</Card.Link>
									</p>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
