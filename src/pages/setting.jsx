import React from 'react'
import { Upload, message, Button, Icon } from 'antd';


export default function Setting(props) {
  const upprops = {
    name: 'file',
    action: 'http://127.0.0.1:6001/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Upload {...upprops}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    </div>
  )
}