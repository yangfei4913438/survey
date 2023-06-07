import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Radio, Space, Switch, Tooltip } from 'antd';
import { nanoid } from 'nanoid';
import { FC, useEffect } from 'react';

const PropsCheckbox: FC<EditorCheckboxPropsType> = ({
  title,
  list,
  orientation,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm<EditorCheckboxPropsType>();

  useEffect(() => {
    form.setFieldsValue({ title, list, orientation });
  }, [form, title, list, orientation]);

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
      initialValues={{ title, list, orientation }}
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
      <Form.Item label='选项列表'>
        <Form.List name={'list'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <>
                    <Space key={key} align={'baseline'}>
                      {/* 当前选项 是否选中 */}
                      <Form.Item name={[name, 'checked']} valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'label']} // name 是组件库的用法，估计是和label关联的。。。
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, val) => {
                              const { list = [] } = form.getFieldsValue();
                              let num = 0;
                              list.forEach((opt) => {
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
                      <Tooltip title={'打开表示禁用'}>
                        <Form.Item name={[name, 'disabled']} key={key}>
                          <Switch />
                        </Form.Item>
                      </Tooltip>
                      {/* 最少要有3个选项，所以长度大于3，才显示删除按钮。name是关键字，操作属性删除只能这样操作 */}
                      {fields.length > 3 && (
                        <Tooltip title={'删除该选项'}>
                          <MinusCircleOutlined onClick={() => remove(name)} />{' '}
                        </Tooltip>
                      )}
                    </Space>
                  </>
                );
              })}
              <Form.Item>
                <Button
                  type='link'
                  onClick={() =>
                    add({ label: '', value: nanoid(), checked: false, disabled: false })
                  }
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

export default PropsCheckbox;
