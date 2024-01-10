import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes } from '../../routes';

export default () => {
	const dispatch = useDispatch();

	const handleSubmit = async data => {
		const dataSend = {
			email: data.email,
		};
		// try {
		// 	await dispatch(forgotPasswordAdmin(dataSend)).unwrap();
		// 	toast.success('Đã gửi yêu cầu thành công', { toastId: 'success-forgot-password' });
		// } catch (err) {
		// 	NotificationError(err);
		// }
	};

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: handleSubmit,
		// validationSchema: Validation.login()
	});

	return (
		<main>
			<section className='vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center'>
				<Container>
					<Row className='justify-content-center'>
						<p className='text-center'>
							<Card.Link as={Link} to={Routes.Login.path} className='text-gray-700'>
								<FontAwesomeIcon icon={faAngleLeft} className='me-2' /> Quay về trang đăng nhập
							</Card.Link>
						</p>
						<Col xs={12} className='d-flex align-items-center justify-content-center'>
							<div className='signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
								<h3>Bạn quên mật khẩu?</h3>
								<p className='mb-4'>
									Đừng lo lắng. Hãy điền vào email của bạn và chúng tôi sẽ gửi bạn mã OTP để bạn đặt
									lại mật khẩu.
								</p>
								<Form onSubmit={formik.handleSubmit}>
									<div className='mb-4'>
										<Form.Label htmlFor='email'>Email của bạn</Form.Label>
										<InputGroup id='email'>
											<Form.Control
												required
												autoFocus
												type='email'
												name='email'
												placeholder='admin@gmail.com'
												value={formik.values.email}
												onChange={formik.handleChange}
											/>
										</InputGroup>
									</div>
									<Button variant='primary' type='submit' className='w-100'>
										Lấy lại mật khấu
									</Button>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
