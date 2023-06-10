import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getFontSize, getTextAlign } from '../utils/styles';
import { EditorTitleDefaultProps } from './interface';

const Component: FC<EditorTitlePropsType> = ({
  title = EditorTitleDefaultProps.title,
  level = EditorTitleDefaultProps.level,
  alignment = EditorTitleDefaultProps.alignment,
}) => {
  return (
    <Typography.Title level={level} className={cls(getFontSize(level), getTextAlign(alignment))}>
      {title}
    </Typography.Title>
  );
};

export default Component;
