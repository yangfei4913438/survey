import EditorConf from '@/components/EditorComponents/EditorTextarea';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的Textarea组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('文本区域输入框');
    expect(p).toBeInTheDocument();
    expect(p.matches('strong')).toBeTruthy();

    const t = screen.getByPlaceholderText('请输入...');
    expect(t).toBeInTheDocument();
    expect(t.matches('textarea')).toBeTruthy();
  });

  it('测试传入属性', () => {
    render(<Component title={'hello'} placeholder={'world'} />);

    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();

    const t = screen.getByPlaceholderText('world');
    expect(t).toBeInTheDocument();
  });
});
