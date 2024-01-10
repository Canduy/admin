import Editor from '@draft-js-plugins/editor';
import { hashtagRegex, urlRegex } from 'constants';
import { EditorState, ContentState, convertFromHTML, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

const RichTextEditor = ({
	setTextContent,
	setUrlAdded,
	placeholder,
	initialContent,
	toggleResetText,
	clearContentRichText,
}) => {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const editor = useRef(null);

	useEffect(() => {
		const contentData = ContentState.createFromBlockArray(convertFromHTML(initialContent)).getPlainText();
		const createMentionEntities = text => {
			const rawContent = convertToRaw(ContentState.createFromText(text));
			const contentState = convertFromRaw(rawContent);
			return EditorState.createWithContent(contentState);
		};
		const editorDataState = createMentionEntities(contentData);
		setEditorState(editorDataState);
	}, [toggleResetText]);

	useEffect(() => {
		const textValue = editorState.getCurrentContent().getPlainText().trim();
		const urlDetected = textValue.match(urlRegex);

		if (urlDetected) {
			detectUrl(urlDetected);
		} else {
			detectUrl('');
		}
		if (textValue.length) {
			const html = convertContentToHTML();
			setTextContent(html);
		} else {
			setTextContent('');
		}
	}, [editorState]);

	useEffect(() => {
		if (clearContentRichText) {
			setEditorState(() => EditorState.createEmpty());
		}
	}, [clearContentRichText]);

	const convertContentToHTML = () => {
		const contentState = editorState.getCurrentContent();
		return stateToHTML(contentState);
	};

	const detectUrl = useCallback(
		_.debounce(urlDetected => {
			setUrlAdded(urlDetected[urlDetected.length - 1]);
		}, 200),
		[]
	);

	// rich text editor
	const onChange = data => {
		setEditorState(data);
	};

	// decorator hashtags draft-js
	const hashtagStrategy = (contentBlock, callback) => {
		findWithHashtagRegex(hashtagRegex, contentBlock, callback);
	};

	const findWithHashtagRegex = (regex, contentBlock, callback) => {
		const text = contentBlock.getText();
		let matchArr, start;
		while ((matchArr = regex.exec(text)) !== null) {
			start = matchArr.index;
			callback(start, start + matchArr[0].length);
		}
	};

	const UrlSpan = ({ offsetKey, children }) => {
		return (
			<span
				style={{
					color: '#0576f0',
				}}
				data-offset-key={offsetKey}
			>
				{children}
			</span>
		);
	};

	const HashtagSpan = ({ offsetKey, children }) => {
		return (
			<span
				style={{
					color: '#5e93c5',
				}}
				data-offset-key={offsetKey}
			>
				{children}
			</span>
		);
	};
	//------------------------------------------------------------------

	// decorator url draft-js
	const urlStrategy = (contentBlock, callback) => {
		findWithUrlRegex(urlRegex, contentBlock, callback);
	};

	const findWithUrlRegex = (regex, contentBlock, callback) => {
		const text = contentBlock.getText();
		let matchArr, start;
		while ((matchArr = regex.exec(text)) !== null) {
			start = matchArr.index;
			callback(start, start + matchArr[0].length);
		}
	};

	//-----------------------------------------------------------------

	const customDecorators = [
		{
			strategy: hashtagStrategy,
			component: HashtagSpan,
		},
		{
			strategy: urlStrategy,
			component: UrlSpan,
		},
	];

	return (
		<Editor
			ref={editor}
			editorState={editorState}
			onChange={onChange}
			placeholder={placeholder}
			decorators={customDecorators}
			stripPastedStyles={true}
		/>
	);
};

RichTextEditor.defaultProps = {
	setUrlAdded: () => {},
	placeholder: 'Nhập nội dung bài viết',
	initialContent: '',
	toggleResetText: false,
};

RichTextEditor.propTypes = {
	setTextContent: PropTypes.func,
	setUrlAdded: PropTypes.func,
	placeholder: PropTypes.string,
	initialContent: PropTypes.string,
	toggleResetText: PropTypes.bool,
	clearContentRichText: PropTypes.bool,
	offsetKey: PropTypes.string,
	children: PropTypes.element,
};

export default RichTextEditor;
