import { Form, Input } from 'antd';
import { FC, useEffect } from 'react';

const PropComponent: FC<EditorTextareaPropsType> = ({ placeholder, title, onChange, disabled }) => {
  const [form] = Form.useForm<EditorTextareaPropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [form, placeholder, title]);

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
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
