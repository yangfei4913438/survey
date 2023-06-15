import type { Meta, StoryObj } from '@storybook/react';

import EditorConf from '@/components/EditorComponents/EditorHeader';
import StorybookContainer from '@/stories/components/StorybookContainer';

// 取出需要的配置
const {
  Component,
  defaultProps: { disabled, onChange, ...defaultProps },
} = EditorConf;

const meta: Meta<typeof Component> = {
  title: '编辑器组件/Header',
  component: (props) => (
    <StorybookContainer>
      <Component {...props} />
    </StorybookContainer>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      name: '标题内容',
      description: '设置标题的显示内容',
      defaultValue: (defaultProps as EditorHeaderPropsType).title,
    },
    titleAlignment: {
      name: '标题对齐方式',
      description: '设置标题的文字对齐方式',
      defaultValue: (defaultProps as EditorHeaderPropsType).titleAlignment,
      control: { type: 'inline-radio' },
      options: ['left', 'center', 'right'],
    },
    titleLevel: {
      name: '标题等级',
      description: '设置标题的文字等级',
      defaultValue: (defaultProps as EditorHeaderPropsType).titleAlignment,
      control: { type: 'select', min: 1, max: 5 },
      options: [1, 2, 3, 4, 5],
    },
    desc: {
      name: '问卷描述',
      description: '设置问卷的描述内容',
      defaultValue: (defaultProps as EditorHeaderPropsType).desc,
    },
    descAlignment: {
      name: '描述的对齐方式',
      description: '设置描述文字的对齐方式',
      defaultValue: (defaultProps as EditorHeaderPropsType).descAlignment,
      control: { type: 'inline-radio' },
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultValue: Story = {
  args: defaultProps,
};
