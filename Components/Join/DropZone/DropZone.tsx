'use clinet';

import Image from 'next/image';
import { useCallback } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import icon_foot from '@/public/icon_foot.svg';

type onDropProps = <T extends File>(
	acceptedFiles: T[],
	fileRejections: FileRejection[],
	event: DropEvent,
) => void;

type DropZoneProps = {
	setFn: React.Dispatch<React.SetStateAction<string | undefined>>;
	baseImageUrl?: string;
};

const DropZone = ({ setFn, baseImageUrl }: DropZoneProps) => {
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

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
		maxFiles: 1,
		maxSize: 1024 * 1024,
		onDrop,
	});

	return (
		<div className="relative w-fit h-fit">
			<div
				{...getRootProps({
					className:
						'relative border-4 w-[200px] h-[200px] rounded-full overflow-hidden flex flex-col items-center justify-content',
				})}
			>
				<input {...getInputProps()} />
				{baseImageUrl ? (
					<Image
						src={baseImageUrl}
						alt="유저이미지"
						width={100}
						height={100}
						className="w-full h-full"
					/>
				) : (
					<div className="w-full h-full flex flex-col justify-center items-center bg-bglight "></div>
				)}
			</div>
			<Image
				src={icon_foot}
				width={100}
				alt="곰"
				height={100}
				className="w-8 absolute bottom-7 right-3"
			/>
		</div>
	);
};

export default DropZone;
