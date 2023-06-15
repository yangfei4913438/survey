import EditorConf from '@/components/EditorComponents/EditorHeader';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的Header组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('问卷标题');
    expect(p).toBeInTheDocument();
    expect(p.matches('h2')).toBeTruthy();
    expect(p.className.includes('text-xl')).toBeTruthy();
    expect(p.className.includes('text-center')).toBeTruthy();

    const t = screen.getByText('问卷描述');
    expect(t).toBeInTheDocument();
    expect(t.matches('div')).toBeTruthy();
    expect(t.className.includes('whitespace-pre-wrap')).toBeTruthy();
    expect(t.className.includes('text-right')).toBeTruthy();
  });

  it('测试传入属性', () => {
    render(
      <Component
        title={'hello'}
        titleAlignment={'right'}
        titleLevel={3}
        desc={'world'}
        descAlignment={'right'}
      />
    );

    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();
    expect(p.matches('h3')).toBeTruthy();
    expect(p.className.includes('text-lg')).toBeTruthy();
    expect(p.className.includes('text-right')).toBeTruthy();

    const t = screen.getByText('world');
    expect(t).toBeInTheDocument();
    expect(t.matches('div')).toBeTruthy();
    expect(t.className.includes('text-right')).toBeTruthy();
  });
});
