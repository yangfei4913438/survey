import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getFontSize, getTextAlign } from '../utils/styles';
import { EditorTitleDefaultProps } from './interface';

const EditorTitle: FC<EditorTitlePropsType> = ({
  text = EditorTitleDefaultProps.text,
  level = EditorTitleDefaultProps.level,
  alignment = EditorTitleDefaultProps.alignment,
}) => {
  return (
    <Typography.Title level={level} className={cls(getFontSize(level), getTextAlign(alignment))}>
      {text}
    </Typography.Title>
  );
};

export default EditorTitle;
