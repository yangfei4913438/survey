import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getTextAlign } from '../utils/styles';
import { EditorParagraphDefaultProps } from './interface';

const Component: FC<EditorParagraphPropsType> = ({
  title = EditorParagraphDefaultProps.title,
  alignment = EditorParagraphDefaultProps.alignment,
}) => {
  return (
    <Typography.Paragraph className={cls('whitespace-pre-wrap', getTextAlign(alignment))}>
      {title}
    </Typography.Paragraph>
  );
};

export default Component;
