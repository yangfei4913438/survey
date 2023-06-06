import { Input, Typography } from 'antd';
import { FC } from 'react';

import { EditorInputDefaultProps } from './interface';

const EditorInput: FC<EditorInputPropsType> = ({
  title = EditorInputDefaultProps.title,
  placeholder = EditorInputDefaultProps.placeholder,
}) => {
  return (
    <div className='space-y-2'>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Input placeholder={placeholder} />
    </div>
  );
};

export default EditorInput;
