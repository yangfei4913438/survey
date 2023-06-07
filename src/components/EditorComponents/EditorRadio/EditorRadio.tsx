import { Radio, Space, Typography } from 'antd';
import { FC } from 'react';

import { EditorRadioDefaultProps } from './interface';

const EditorRadio: FC<EditorRadioPropsType> = ({
  title = EditorRadioDefaultProps.title,
  selected = EditorRadioDefaultProps.selected,
  options = EditorRadioDefaultProps.options,
  orientation = EditorRadioDefaultProps.orientation,
}) => {
  return (
    <div className='space-y-2'>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Radio.Group value={selected}>
        <Space direction={orientation} wrap>
          {options.map((opt) => {
            return (
              <Radio value={opt.value} key={opt.value}>
                {opt.label}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default EditorRadio;
