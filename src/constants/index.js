import Request from 'helpers/Request';
import Storage from 'helpers/Storage';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { deleteUserInfo } from 'reducers/auth';
import { Routes } from 'routes';

export const maxCategoriesNumberAdded = 5;

export const STATUS_BOOK = {
	reading: 'reading',
	read: 'read',
	wantToRead: 'wantToRead',
};

export const listLanguages = [
	{ value: 'vn', name: 'Tiếng Việt' },
	{ value: 'en', name: 'Tiếng Anh' },
];

export const blockInvalidChar = e => {
	return ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault();
};

export const urlRegex =
	/(www\.|http(s)?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9()@:%_\+.~#?&//=]*)([^"<\s]+)(?![^<>]*>|[^"]*?<\/a)/g;

export const hashtagRegex =
	/(^|\B)#(?![0-9_]+\b)[0-9a-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/gi;

export const breadcrumbsData = {
	booksManager: {
		books: { title: 'Danh sách Sách', path: Routes.Books.path },
		createBook: { title: 'Tạo sách', path: Routes.CreateBook.path },
		bookApproval: { title: 'Duyệt sách', path: Routes.BookApproval.path },
		editBook: { title: 'Chỉnh sửa sách', path: Routes.EditBook.path },
		confirmBook: { title: 'Xác thực sách', path: Routes.ConfirmMyBook.path },
	},
	categoryManager: {
		category: { title: 'Quản lý Chủ đề', path: Routes.Category.path },
	},
	hashtagManger: {
		hashtag: { title: 'Quản lý hashtag', path: Routes.Hashtag.path },
	},
	usersManager: {
		users: { title: 'Quản lý người dùng', path: Routes.Users.path },
		editUser: { title: 'Chỉnh sửa người dùng', path: Routes.EditUser.path },
	},
	groupsManager: {
		groups: { title: 'Quản lý nhóm', path: Routes.Groups.path },
	},
	feedManager: {
		newFeed: { title: 'New Feed', path: Routes.NewFeed.path },
		detailNewFeed: { title: 'Chi tiết new feed', path: Routes.DetailNewFeed.path },
		groupFeed: { title: 'Group Feed', path: Routes.GroupFeed.path },
		popularFeed: { title: 'Popular Feed', path: Routes.PopularFeed.path },
	},
	quotesManager: {
		quotes: { title: 'Quản lý quotes', path: Routes.Quotes.path },
	},
	publisherManager: {
		publisher: { title: 'Quản lý Nhà Xuất Bản', path: Routes.Publisher.path },
	},
};

export const BASE_URL = 'https://wisfeed.vn/';

export const useHookHandleLogout = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	return {
		handleLogout: () => {
			Storage.removeAccessToken();
			Storage.removeRefreshToken();
			Request.clearToken();
			// dispatch(deleteUserInfo());
			history.push('/login');
			const customId = 'custom-id-logout';
			toast.success('Đăng xuất thành công', { toastId: customId });
		},
	};
};

export const optionsListData = [
	{
		group: 'SÁCH',
		label: 'Danh sách Sách',
		path: Routes.Books.path,
	},
	{
		group: 'SÁCH',
		label: 'Tạo sách',
		path: Routes.CreateBook.path,
	},
	{
		group: 'SÁCH',
		label: 'Duyệt sách',
		path: Routes.BookApproval.path,
	},
	{
		group: 'SÁCH',
		label: 'Xác thực sách',
		path: Routes.ConfirmMyBook.path,
	},
	{
		group: 'NGƯỜI DÙNG',
		label: 'Quản lý người dùng',
		path: Routes.Users.path,
	},
	{
		group: 'NHÓM',
		label: 'Quản lý nhóm',
		path: Routes.Groups.path,
	},
	{
		group: 'QUOTE',
		label: 'Quản lý quote',
		path: Routes.Quotes.path,
	},
	{
		group: 'BÀI VIẾT',
		label: 'New feed',
		path: Routes.NewFeed.path,
	},
	{
		group: 'BÀI VIẾT',
		label: 'Group feed',
		path: Routes.GroupFeed.path,
	},
	{
		group: 'BÀI VIẾT',
		label: 'Bài viết nổi bật',
		path: Routes.PopularFeed.path,
	},
	{
		group: 'CHỦ ĐỀ',
		label: 'Quản lý Chủ đề',
		path: Routes.Category.path,
	},
	{
		group: 'HASHTAG',
		label: 'Quản lý hashtag',
		path: Routes.Hashtag.path,
	},
	{
		group: 'NHÀ XUẤT BẢN',
		label: 'Quản lý NXB',
		path: Routes.Publisher.path,
	},
];
