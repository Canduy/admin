import { faDownload, faFileExcel, faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@themesberg/react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	importExcelBooks,
	exportExcelAuthors,
	exportExcelBooks,
	exportExcelCategories,
	exportExcelPublishers,
} from 'reducers/excel';
import { NotificationError } from 'helpers/Error';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ButtonImport = ({ handleSuccessImport }) => {
	const [selectedFile, setSelectedFile] = useState('');
	const [isImporting, setIsImporting] = useState(false);

	const dispatch = useDispatch();
	const inputFile = useRef(null);

	useEffect(async () => {
		if (selectedFile) {
			setIsImporting(true);
			try {
				const data = await dispatch(importExcelBooks([selectedFile])).unwrap();
				toast.success(`Đã tạo mới ${data.create} cuốn, thay đổi ${data.update} cuốn`, {
					toastId: 'success-import-excel',
				});
				handleSuccessImport();
			} catch (err) {
				NotificationError(err);
			} finally {
				setSelectedFile('');
				setIsImporting(false);
			}
		}
	}, [selectedFile]);

	const uploadExcelFile = e => {
		setSelectedFile(e.target.files[0]);
	};

	const onClickImportExcel = () => {
		inputFile.current.click();
	};

	return (
		<div style={{ padding: '24px 0' }}>
			<input
				ref={inputFile}
				className='d-none'
				type='file'
				accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				onChange={uploadExcelFile}
			></input>
			<Button variant='success' disabled={isImporting} onClick={onClickImportExcel} title='Đăng tải file excel'>
				<FontAwesomeIcon icon={faUpload} style={{ marginRight: '12px' }} />
				{isImporting ? (
					<FontAwesomeIcon icon={faSpinner} className='spinner' />
				) : (
					<FontAwesomeIcon icon={faFileExcel} />
				)}
			</Button>
		</div>
	);
};

export const ButtonExport = () => {
	const [isExporting, setIsExporting] = useState(false);

	const dispatch = useDispatch();

	const isHTML = str => {
		return /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(str);
	};

	const handleGetBooksData = async () => {
		try {
			const result = await dispatch(exportExcelBooks()).unwrap();
			return result;
		} catch (err) {
			NotificationError(err);
		}
	};

	const handleGetAuthorsData = async () => {
		try {
			const result = await dispatch(exportExcelAuthors()).unwrap();
			return result;
		} catch (err) {
			NotificationError(err);
		}
	};

	const handleGetCategoriesData = async () => {
		try {
			const result = await dispatch(exportExcelCategories()).unwrap();
			return result;
		} catch (err) {
			NotificationError(err);
		}
	};

	const handleGetPublishersData = async () => {
		try {
			const result = await dispatch(exportExcelPublishers()).unwrap();
			return result;
		} catch (err) {
			NotificationError(err);
		}
	};

	const onClickExportExcel = () => {
		setIsExporting(true);
		Promise.all([
			handleGetBooksData(),
			handleGetAuthorsData(),
			handleGetCategoriesData(),
			handleGetPublishersData(),
		]).then(data => {
			const bookData = data[0];
			const authorData = data[1];
			const cateData = data[2];
			const publisherData = data[3];

			const publisherList = publisherData.rows.map(publisher => {
				return {
					publisherId: publisher.id,
					publisherName: publisher.name,
				};
			});

			const authorList = authorData.rows.map(author => {
				return {
					authorId: author.authorId,
					authorName: author.authorName,
					isUser: author.isUser,
				};
			});

			const cateList = cateData.rows.map(cate => {
				return {
					id: cate.id,
					name: cate.name,
				};
			});

			const bookList = bookData.rows.map(book => {
				const authors = [];
				const authorsIds = [];
				const trans = [];
				const transIds = [];
				book.authors.map(author => {
					authors.push(author.authorName);
					authorsIds.push(author.authorId);
				});
				book.translators.map(translator => {
					trans.push(translator.translatorName);
					transIds.push(translator.translatorId);
				});
				return {
					id: book.id,
					name: `${book.name}`,
					isbn: book.isbn,
					authorName: authors.toString(),
					authorId: authorsIds.toString(),
					subName: book.subName,
					translatorName: trans.toString() || '',
					translatorId: transIds.toString() || '',
					categoriesId:
						book.categories.length > 0 ? `${book.categories.map(cate => cate.categoryId).toString()}` : '',
					originalName: book.originalName,
					publishDate: book.publishDate
						? Number(
								25569.0 +
									(new Date(book.publishDate).getTime() -
										new Date(book.publishDate).getTimezoneOffset() * 60 * 1000) /
										(1000 * 60 * 60 * 24)
						  )
						: null,
					publisherId: book.publisherId ? book.publisherId : null,
					description: isHTML(book.description) ? null : book.description?.slice(0, 32766),
					page: book.page,
					verify: book.verify,
					language: book.language,
					images: book.images.length > 0 ? book.images.toString() : '',
					isChange: 0,
				};
			});

			const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
			const fileExtension = '.xlsx';
			const ws1 = XLSX.utils.json_to_sheet(bookList);
			const ws2 = XLSX.utils.json_to_sheet(authorList);
			const ws3 = XLSX.utils.json_to_sheet(cateList);
			const ws4 = XLSX.utils.json_to_sheet(publisherList);

			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');
			XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
			XLSX.utils.book_append_sheet(wb, ws3, 'Sheet3');
			XLSX.utils.book_append_sheet(wb, ws4, 'Sheet4');
			const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
			const rs = new Blob([excelBuffer], { type: fileType });
			FileSaver.saveAs(rs, 'books' + fileExtension);
			setIsExporting(false);
		});
	};
	return (
		<div style={{ padding: '24px 0' }}>
			<Button variant='success' onClick={onClickExportExcel} disabled={isExporting} title='Tải xuống file excel'>
				<FontAwesomeIcon icon={faDownload} style={{ marginRight: '12px' }} />
				{isExporting ? (
					<FontAwesomeIcon icon={faSpinner} className='spinner' />
				) : (
					<FontAwesomeIcon icon={faFileExcel} />
				)}
			</Button>
		</div>
	);
};

ButtonImport.defaultProps = {
	handleSuccessImport: () => {},
};

ButtonImport.propTypes = {
	handleSuccessImport: PropTypes.func,
};
