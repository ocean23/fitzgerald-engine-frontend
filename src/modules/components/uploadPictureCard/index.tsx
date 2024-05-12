import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { httpRequest } from '@/utils';

interface UploadPictureCardProps {
  values: any[];
  onFormFieldChange?: (name, value) => void;
  name?: string;
  limit?: number;
}

function UploadPictureCard({
  values,
  onFormFieldChange = () => {},
  name = '',
  limit = 4,
}:UploadPictureCardProps) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  useEffect(() => {
    setFileList(values);
  }, [values]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = async (event) => {
    const { file } = event;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res: any = await httpRequest.post('common/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.code !== 0) {
        throw new Error(res.msg);
      } else {
        setFileList([
          ...fileList,
          { ...file, url: res.data.url, fileKey: res.data.fileKey },
        ]);
        onFormFieldChange(name, [
          ...fileList,
          { ...file, url: res.data.url, fileKey: res.data.fileKey },
        ]);
      }
    } catch (err) {
      message.error(err.message || '图片上传失败');
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传图片
      </div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        accept="image/*,"
        customRequest={(event) => {
          handleChange(event);
        }}
        onRemove={(file) => {
          onFormFieldChange(
            name,
            fileList.filter((item) => item.uid !== file.uid)
          );
          setFileList(fileList.filter((item) => item.uid !== file.uid));
        }}
      >
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
      <Modal
        open={previewVisible}
        title="图片预览"
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="图片预览"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default UploadPictureCard;
