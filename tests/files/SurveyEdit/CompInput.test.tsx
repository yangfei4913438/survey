import EditorConf from '@/components/EditorComponents/EditorInput';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的Input组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('普通输入框');
    expect(p).toBeInTheDocument();
    expect(p.matches('strong')).toBeTruthy();

    const input = screen.getByPlaceholderText('请输入...');
    expect(input).toBeInTheDocument();
    expect(input.matches('input')).toBeTruthy();
  });

  it('测试传入属性', () => {
    render(<Component title={'hello'} placeholder={'word'} />);

    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();

    const input = screen.getByPlaceholderText('word');
    expect(input).toBeInTheDocument();
  });
});
