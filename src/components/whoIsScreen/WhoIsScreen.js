import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const WhoIsScreen = ({ history }) => {
	const { Dragger } = Upload;

	//Estado de error
	const [errorState, setErrorState] = useState('');

	const props = {
		name: 'file',
		multiple: false,
		action: 'https://whois.nomada.cloud/upload',
		headers: {
			Nomada: 'MWM0MmU4NzUtNjQ0Yi00ZjJlLWIyZmQtZDM2ZTBkMWJlNGRi',
			Type: 'multipart/form-data',
		},
		accept: '.png, .PNG, .jpg, .JPG',
		maxCount: 1,
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				const actorName = info.fileList[0].response.actorName;
				const error = info.fileList[0].response.error;

				if (error === '') {
					setErrorState('');
					history.push(`/${actorName}`);
				} else {
					setErrorState(error);
				}
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
				setErrorState('file upload failed');
			}
		},
		onDrop(e) {
			// console.log('Dropped files', e.dataTransfer.files);
		},
	};
	return (
		<>
			<div className='flex flex-center'>
				<div className='container_buscador'>
					<div className='flex flex-column flex-aling-center'>
						<h1>¿Quién es este actor?</h1>
						{errorState === '' ? null : <div className='error_Msg'>{errorState}</div>}
						<div>
							<Dragger {...props} style={{ padding: '0 5% ' }}>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>Haz click o arrastra una imagen</p>
								<p
									className='ant-upload-hint'
									style={{
										maxWidth: '100%',
									}}
								>
									Selecciona la foto de un actor famoso para saber quién es y en qué
									películas ha salido
								</p>
							</Dragger>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WhoIsScreen;
