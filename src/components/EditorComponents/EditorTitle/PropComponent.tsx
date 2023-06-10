import { Form, Input, Radio, Select } from 'antd';
import { FC, useEffect } from 'react';

const PropComponent: FC<EditorTitlePropsType> = ({
  title,
  level,
  alignment,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm<EditorTitlePropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, level, alignment });
  }, [alignment, form, level, title]);

  // 监听表单变化
  const handleValueChange = () => {
    // 取出当前表单中所有的值
    const values = form.getFieldsValue();
    // 返回最新表单数据
    onChange?.(values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, level, alignment }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label='标题内容'
        name='title'
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='标题级别' name='level'>
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 },
          ]}
        />
      </Form.Item>
      <Form.Item label='对齐方式' name='alignment'>
        <Radio.Group
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '右对齐' },
          ]}
          optionType={'button'}
        />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
