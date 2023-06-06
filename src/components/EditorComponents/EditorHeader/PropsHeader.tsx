import { Form, Input, Radio, Select } from 'antd';
import { FC, useEffect } from 'react';

const PropsHeader: FC<EditorHeaderPropsType> = ({
  title,
  titleAlignment,
  titleLevel,
  desc,
  descAlignment,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm<EditorHeaderPropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, titleAlignment, titleLevel, desc, descAlignment });
  }, [desc, descAlignment, form, title, titleAlignment, titleLevel]);

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
      initialValues={{ title, titleAlignment, titleLevel, desc, descAlignment }}
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
      <Form.Item label='标题级别' name='titleLevel'>
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
      <Form.Item label='标题对齐方式' name='titleAlignment'>
        <Radio.Group
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '右对齐' },
          ]}
          optionType={'button'}
        />
      </Form.Item>
      <Form.Item label='问卷描述' name='desc'>
        <Input.TextArea size={'large'} className='max-h-80' />
      </Form.Item>
      <Form.Item label='描述对齐方式' name='descAlignment'>
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

export default PropsHeader;
