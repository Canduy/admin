import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export const convertUnitNumberToWord = length => {
	if (length < 4) {
		return '';
	} else if (length < 7) {
		return 'k';
	} else if (length < 10) {
		return 'tr';
	} else if (length < 13) {
		return 'tỉ';
	} else {
		return 'too big';
	}
};

export const generateTime = string => {
	return `${moment(string).format('DD-MM-YYYY')} lúc ${moment(string).format('kk:mm')}`;
};

export const calculateDurationTime = date => {
	const end = new Date();
	const start = new Date(date);
	const duration = (end.getTime() - start.getTime()) / 1000;
	const secondsPerMinute = 60;
	const secondsPerHour = secondsPerMinute * 60;
	const secondsPerDay = secondsPerHour * 24;
	const secondsPerWeek = secondsPerDay * 7;

	if (duration < secondsPerMinute) {
		return 'Vừa xong';
	} else if (duration < secondsPerHour) {
		return `${Math.floor(duration / secondsPerMinute)} phút trước`;
	} else if (duration < secondsPerDay) {
		return `${Math.floor(duration / secondsPerHour)} giờ trước`;
	} else if (duration < secondsPerWeek) {
		return ` Khoảng ${Math.floor(duration / 86400)}  ngày trước`;
	} else {
		return `${moment(start).format('DD MMM')} lúc ${moment(start).format('kk:mm')}`;
	}
};

export const generateQuery = (
	current = 0,
	perPage = 10,
	filter = '[]',
	sort = '[{ "property": "createdAt", direction: "DESC }]'
) => {
	return {
		start: current * perPage,
		limit: perPage,
		filter,
		sort,
	};
};

export const generateAuthorsName = authorsArray => {
	if (authorsArray && authorsArray.length) {
		const str = authorsArray.map(item => item.authorName || item.fullName).join(', ');
		return str;
	} else {
		return 'Chưa xác định';
	}
};

export const generateTranslatorsName = translatorsArray => {
	if (translatorsArray && translatorsArray.length) {
		const str = translatorsArray.map(item => item.translatorName).join(', ');
		return str;
	} else {
		return 'Chưa xác định';
	}
};

export const generateCategories = categoriesArray => {
	if (categoriesArray && categoriesArray.length) {
		const str = categoriesArray
			.map(item => {
				if (item.category) {
					return item.category.name;
				} else {
					return item.name;
				}
			})
			.join(', ');
		return str;
	} else {
		return 'Không có chủ đề';
	}
};

export const toSlug = str => {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();

	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');

	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');

	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');

	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');

	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');

	// return
	return str;
};

export const hasHTMLTags = string => {
	const htmlTagReg = /(<([^>]+)>)/gi;
	if (string && htmlTagReg.test(string)) {
		return true;
	}
	return false;
};

export const strippedHTMLTags = string => {
	const htmlTagReg = /(<([^>]+)>)/gi;
	if (string && htmlTagReg.test(string)) {
		return string.replace(htmlTagReg, '');
	}
	return string;
};

export const convertToPlainString = string => {
	const htmlTagReg = /(<([^>]+)>)/gi;
	if (string && htmlTagReg.test(string)) {
		const temporalDiv = document.createElement('div');
		temporalDiv.innerHTML = string;

		return temporalDiv.textContent || temporalDiv.innerText || '';
	}
	return string;
};
