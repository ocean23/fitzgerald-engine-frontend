import { useEffect, useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip } from 'antd';


interface FormItemTagProps {
  name: string;
  values: any[];
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFormFieldChange?: (name, value) => void;
}

function FormItemTag({
  name = '',
  values = [],
  color = '',
  onFormFieldChange = () => {},
}:FormItemTagProps) {
  const [tags, setTags] = useState<any[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef:any = useRef(null);
  const editInputRef:any = useRef<any>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  useEffect(() => {
    setTags(values);
  }, [values]);
  const handleClose = (removedTag) => {
    onFormFieldChange(
      name,
      tags.filter((tag) => tag !== removedTag)
    );
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    onFormFieldChange(name, [...tags, inputValue]);
    if (inputValue) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setInputValue('');
  };
  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 5;
        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            color={color}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined />
          添加标签
        </Tag>
      )}
    </>
  );
}

export default FormItemTag;
