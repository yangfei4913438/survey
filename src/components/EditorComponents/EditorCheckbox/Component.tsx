import { Checkbox, Space, Typography } from 'antd';
import { FC } from 'react';

import { EditorCheckboxDefaultProps } from './interface';

const Component: FC<EditorCheckboxPropsType> = ({
  title = EditorCheckboxDefaultProps.title,
  list = EditorCheckboxDefaultProps.list,
  orientation = EditorCheckboxDefaultProps.orientation,
}) => {
  return (
    <div className='space-y-2'>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Space direction={orientation} wrap>
        {list?.map((opt) => {
          const { value, label, checked, disabled } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked} disabled={disabled}>
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
