import { Dropdown } from '@themesberg/react-bootstrap';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

export default function CustomDropdownMenu({ title, dataArray, onFilterChange, filterValue }) {
	const CustomToggle = forwardRef(({ children, onClick }, ref) => (
		<span
			ref={ref}
			onClick={e => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			&#x25bc;
		</span>
	));
	return (
		<Dropdown className='custom-dropdown'>
			<Dropdown.Toggle as={CustomToggle}>{title}&nbsp;</Dropdown.Toggle>
			<Dropdown.Menu>
				{dataArray.map(item => (
					<Dropdown.Item
						key={item.value}
						onClick={() => onFilterChange(item.value)}
						className={filterValue === item.value && 'is-being-choosen'}
					>
						{item.title}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

CustomDropdownMenu.defaultProps = {
	title: '',
	dataArray: [],
	onFilterChange: () => {},
	filterValue: '',
	children: <></>,
	onClick: () => {},
};

CustomDropdownMenu.propTypes = {
	title: PropTypes.string,
	dataArray: PropTypes.array,
	onFilterChange: PropTypes.func,
	filterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	children: PropTypes.element,
	onClick: PropTypes.func,
};
