import EditorConf from '@/components/EditorComponents/EditorTitle';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的Title组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('段落标题');
    expect(p).toBeInTheDocument();

    expect(p.matches('h5')).toBeTruthy();
    expect(p.className.includes('text-sm')).toBeTruthy();
    expect(p.className.includes('text-left')).toBeTruthy();
  });

  it('测试传入属性', () => {
    render(<Component title={'hello'} level={3} alignment={'left'} />);

    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();

    expect(p.matches('h3')).toBeTruthy();
    expect(p.className.includes('text-lg')).toBeTruthy();
    expect(p.className.includes('text-left')).toBeTruthy();
  });
});
