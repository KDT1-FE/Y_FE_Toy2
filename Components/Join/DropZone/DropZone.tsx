'use clinet';

import { useCallback, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';

type onDropProps = <T extends File>(
	acceptedFiles: T[],
	fileRejections: FileRejection[],
	event: DropEvent,
) => void;

const DropZone = () => {
	const [image64, setImage64] = useState('');
	// eslint-disable-next-line
	const onDrop: onDropProps = useCallback((acceptedFiles, fileRejections) => {
		// Do something with the files
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64 = reader.result;
				if (typeof base64 === 'string') {
					console.log('실행');
					setImage64(base64);
				}
			};
		}

		if (fileRejections) {
			console.log('이딴거 여기다가 넣지 마라...');
		}
	}, []);

	console.log('컴포넌트 실행');
	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
		maxFiles: 1,
		maxSize: 1024 * 1024,
		onDrop,
	});

	if (isDragAccept) {
		console.log('isDragAccept', image64);
	}

	return (
		<div
			{...getRootProps({
				onClick: (e) => {
					e.stopPropagation();
					console.log('클릭');
				},
				className: 'bg-red-700',
				role: 'button',
			})}
		>
			<input {...getInputProps()} />
			<p>Drag drop some files here, or click to select files</p>
		</div>
	);
};

export default DropZone;
