import { Form, Input } from 'antd';
import { useEffect } from 'react';

import useSurveyEditor from '@/hooks/store/useSurveyEditor';

const PageSetting = () => {
  const {
    pageInfo: { title, desc, js, css, id },
    setPageInfo,
  } = useSurveyEditor();
  const [form] = Form.useForm<Omit<PageInfoType, 'id'>>();

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css });
  }, [form, title, desc, js, css]);

  // 监听表单变化
  const handleValueChange = () => {
    // 取出当前表单中所有的值
    const values = form.getFieldsValue();
    // 返回最新表单数据
    setPageInfo({ id, ...values });
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, desc, js, css }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label='标题内容'
        name='title'
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='问卷描述' name='desc'>
        <Input.TextArea size={'large'} className='max-h-80' />
      </Form.Item>
      <Form.Item label='Javascript代码' name='js'>
        <Input.TextArea size={'large'} className='max-h-80' />
      </Form.Item>
      <Form.Item label='CSS代码' name='css'>
        <Input.TextArea size={'large'} className='max-h-80' />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
