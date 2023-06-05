import { Input, Typography } from 'antd';
import { FC } from 'react';

import { EditorInputDefaultProps } from './interface';

const EditorInput: FC<EditorInputPropsType> = ({
  title = EditorInputDefaultProps.title,
  placeholder = EditorInputDefaultProps.placeholder,
}) => {
  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default EditorInput;
