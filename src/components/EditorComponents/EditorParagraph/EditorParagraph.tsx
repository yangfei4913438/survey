import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getTextAlign } from '../utils/styles';
import { EditorParagraphDefaultProps } from './interface';

const EditorParagraph: FC<EditorParagraphPropsType> = ({
  text = EditorParagraphDefaultProps.text,
  alignment = EditorParagraphDefaultProps.alignment,
}) => {
  return (
    <Typography.Paragraph className={cls('whitespace-pre-wrap', getTextAlign(alignment))}>
      {text}
    </Typography.Paragraph>
  );
};

export default EditorParagraph;
