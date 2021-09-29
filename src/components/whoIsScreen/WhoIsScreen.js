import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const WhoIsScreen = () => {
	const { Dragger } = Upload;
	const props = {
		name: 'file',
		multiple: false,
		action: 'https://jsonplaceholder.typicode.com/posts',
		accept: '.png, .PNG, .jpg, .JPG',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
				alert('ok');
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};
	return (
		<>
			<div className='flex flex-center'>
				<div className='container_buscador'>
					<div className='flex flex-column flex-aling-center'>
						<h1>¿Quién es este actor?</h1>
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
