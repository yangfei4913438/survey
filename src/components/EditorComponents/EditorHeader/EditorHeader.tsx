import { Typography } from 'antd';
import cls from 'classnames';
import { FC } from 'react';

import { getFontSize, getTextAlign } from '../utils/styles';
import { EditorHeaderDefaultProps } from './interface';

const EditorHeader: FC<EditorHeaderPropsType> = ({
  title = EditorHeaderDefaultProps.title,
  titleLevel = EditorHeaderDefaultProps.titleLevel,
  titleAlignment = EditorHeaderDefaultProps.titleAlignment,
  desc = EditorHeaderDefaultProps.desc,
  descAlignment = EditorHeaderDefaultProps.descAlignment,
}) => {
  return (
    <div className='space-y-2'>
      <Typography.Title
        level={titleLevel}
        className={cls(getFontSize(titleLevel), getTextAlign(titleAlignment))}
      >
        {title}
      </Typography.Title>
      <Typography.Paragraph className={cls('whitespace-pre-wrap', getTextAlign(descAlignment))}>
        {desc}
      </Typography.Paragraph>
    </div>
  );
};

export default EditorHeader;
