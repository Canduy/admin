import PropTypes from 'prop-types';
import bookImageDefault from 'assets/img/default-book.png';

const BookThumbnail = ({ src, name, className }) => {
	return (
		<div className={`book-thumbnail ${className}`} title={name}>
			<img
				src={src || bookImageDefault}
				alt={name}
				onError={e => {
					e.target.setAttribute('src', `${bookImageDefault}`);
				}}
			/>
		</div>
	);
};

BookThumbnail.defaultProps = {
	src: '',
	name: '',
	className: '',
};

BookThumbnail.propTypes = {
	src: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
};

export default BookThumbnail;
