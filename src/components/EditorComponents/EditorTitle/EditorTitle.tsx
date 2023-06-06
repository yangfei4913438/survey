import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getTextAlign } from '../utils/styles';
import { EditorTitleDefaultProps } from './interface';

const EditorTitle: FC<EditorTitlePropsType> = ({
  text = EditorTitleDefaultProps.text,
  level = EditorTitleDefaultProps.level,
  alignment = EditorTitleDefaultProps.alignment,
}) => {
  const getFontSize = (titleLevel: TitleLevelType) => {
    switch (titleLevel) {
      case 1:
        return 'text-2xl';
      case 2:
        return 'text-xl';
      case 3:
        return 'text-lg';
      case 4:
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  return (
    <Typography.Title level={level} className={cls(getFontSize(level), getTextAlign(alignment))}>
      {text}
    </Typography.Title>
  );
};

export default EditorTitle;
