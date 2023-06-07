import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Space } from 'antd';
import { nanoid } from 'nanoid';
import { FC, useEffect } from 'react';

import { EditorRadioDefaultProps } from './interface';

const PropsRadio: FC<EditorRadioPropsType> = ({
  title,
  selected,
  options = EditorRadioDefaultProps.options,
  orientation,
  disabled,
  onChange,
}) => {
  const [form] = Form.useForm<EditorRadioPropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, selected, options, orientation });
  }, [form, title, selected, options, orientation]);

  // 监听表单变化
  const handleValueChange = () => {
    // 取出当前表单中所有的值
    const values = form.getFieldsValue();
    console.log('values:', values);
    // 返回最新表单数据
    onChange?.(values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, orientation, selected, options }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='排列方向' name='orientation'>
        <Radio.Group
          options={[
            { value: 'horizontal', label: '水平' },
            { value: 'vertical', label: '垂直' },
          ]}
        />
      </Form.Item>
      <Form.Item label='默认选项' name='selected'>
        <Select value={selected} options={options} />
      </Form.Item>
      <Form.Item label='选项列表'>
        <Form.List name={'options'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align={'baseline'}>
                    <Form.Item
                      name={[name, 'label']} // name 是组件库的用法，估计是和label关联的。。。
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, val) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt) => {
                              if (opt.label === val) num++; // 记录 label 相同的个数，预期只有 1 个（自己）
                            });
                            if (num === 1) return Promise.resolve();
                            // 大于1个相同的，就提示错误
                            return Promise.reject(new Error('和其他选项重复了'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder='输入选项文字...' />
                    </Form.Item>

                    {/* 最少要有3个选项，所以序号大于2，才显示删除按钮。name是关键字，操作属性删除只能这样操作 */}
                    {index > 2 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type='link'
                  onClick={() => add({ label: '', value: nanoid() })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </Form>
  );
};

export default PropsRadio;
