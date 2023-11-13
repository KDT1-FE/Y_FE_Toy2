import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API,
			api_secret: process.env.CLOUDINARY_SECRET,
		});

		const file = req.body;
		if (!file) {
			return res.status(400).json({ message: '파일이 없습니다.' });
		}

		const uploadResponse = await cloudinary.uploader.upload(
			file,
			{
				folder: 'Home',
				public_id: 'userImage0',
				overwrite: true,
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			function (error: any) {
				if (error) {
					return res.status(500).json({ message: '서버 에러' });
				}
			},
		);
		return res.status(200).json({ data: uploadResponse.url });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: '서버 에러' });
	}
};

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '3mb',
		},
	},
};

export default handler;
