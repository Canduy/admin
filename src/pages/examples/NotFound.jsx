import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Image, Button, Container } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import { Routes } from '../../routes';
import NotFoundImage from '../../assets/img/illustrations/404.svg';

export default () => {
	return (
		<main>
			<section className='vh-100 d-flex align-items-center justify-content-center'>
				<Container>
					<Row>
						<Col xs={12} className='text-center d-flex align-items-center justify-content-center'>
							<div>
								<Card.Link as={Link} to={Routes.DashboardOverview.path}>
									<Image src={NotFoundImage} className='img-fluid w-75' />
								</Card.Link>
								<h1 className='text-primary mt-5'>Không tìm thấy trang</h1>
								<p className='lead my-4'>
									Úi! Có vẻ như bạn đã truy cập sai đường dẫn rồi. Nếu bạn nghĩ đây là lỗi của chúng
									tôi, xin hãy liên hệ với chúng tôi nhé.
								</p>
								<Button
									as={Link}
									variant='primary'
									className='animate-hover'
									to={Routes.DashboardOverview.path}
								>
									<FontAwesomeIcon icon={faChevronLeft} className='animate-left-3 me-3 ms-2' />
									Quay về trang chủ
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
