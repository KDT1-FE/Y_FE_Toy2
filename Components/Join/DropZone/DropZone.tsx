'use clinet';

import { useCallback } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

type onDropProps = <T extends File>(
	acceptedFiles: T[],
	fileRejections: FileRejection[],
	event: DropEvent,
) => void;

type DropZoneProps = {
	setFn: React.Dispatch<React.SetStateAction<string | null>>;
};

const DropZone = ({ setFn }: DropZoneProps) => {
	const onDrop: onDropProps = useCallback(
		(acceptedFiles, fileRejections) => {
			if (acceptedFiles.length > 0) {
				const file = acceptedFiles[0];

				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const base64 = reader.result;
					if (typeof base64 === 'string') {
						setFn(base64);
					}
				};
			}

			if (fileRejections && fileRejections.length > 0) {
				Swal.fire({
					text: '이미지만 넣으세요.',
					showCancelButton: false,
					confirmButtonText: '확인',
					confirmButtonColor: 'red',
				});
			}
		},
		[setFn],
	);

	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
		maxFiles: 1,
		maxSize: 1024 * 1024,
		onDrop,
	});

	if (isDragAccept) {
		console.log('isDragAccept');
	}

	return (
		<div
			{...getRootProps({
				className: 'bg-red-700',
			})}
		>
			<input {...getInputProps()} />
			<p>Drag drop some files here, or click to select files</p>
		</div>
	);
};

export default DropZone;
