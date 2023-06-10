import { Form, Input, Radio } from 'antd';
import { FC, useEffect } from 'react';

const PropComponent: FC<EditorParagraphPropsType> = ({ title, alignment, onChange, disabled }) => {
  const [form] = Form.useForm<EditorParagraphPropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, alignment });
  }, [alignment, form, title]);

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
      initialValues={{ title, alignment }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label='段落内容'
        name='title'
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <Input.TextArea size={'large'} className='max-h-80' />
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
