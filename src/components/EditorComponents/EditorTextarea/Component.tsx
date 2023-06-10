import { Input, Typography } from 'antd';
import { FC } from 'react';

import { EditorTextareaDefaultProps } from './interface';

const EditorInput: FC<EditorTextareaPropsType> = ({
  title = EditorTextareaDefaultProps.title,
  placeholder = EditorTextareaDefaultProps.placeholder,
}) => {
  return (
    <div className='space-y-2'>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Input.TextArea placeholder={placeholder} size={'large'} className='max-h-80' />
    </div>
  );
};

export default EditorInput;
