import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { useHistory } from 'react-router-dom';

function BreadcrumbComponent({ subItems, pageTitle }) {
	const history = useHistory();

	return (
		<div className='breadcrumb-component d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
			<div className='d-block mb-4 mb-md-0'>
				<Breadcrumb
					className='d-none d-md-inline-block'
					listProps={{
						className: 'breadcrumb-dark breadcrumb-transparent',
					}}
				>
					<Breadcrumb.Item
						onClick={() => {
							history.push('/');
						}}
					>
						<FontAwesomeIcon icon={faHome} />
					</Breadcrumb.Item>
					{!!subItems.length &&
						subItems.map((item, index) => (
							<Breadcrumb.Item
								active={index === subItems.length - 1}
								key={index}
								onClick={() => history.push(item.path)}
							>
								{item.title}
							</Breadcrumb.Item>
						))}
				</Breadcrumb>
				<h4>{pageTitle}</h4>
			</div>
		</div>
	);
}

BreadcrumbComponent.defaultProps = { subItems: [] };

export default BreadcrumbComponent;
