import EditorConf from '@/components/EditorComponents/EditorParagraph';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的 Paragraph 组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('段落文本');
    expect(p).toBeInTheDocument();

    expect(p.matches('div')).toBeTruthy();
    expect(p.className.includes('whitespace-pre-wrap')).toBeTruthy();
    expect(p.className.includes('text-left')).toBeTruthy();
  });

  it('测试传入属性', () => {
    render(<Component title={'hello'} alignment={'right'} />);

    const p = screen.getByText('hello');
    expect(p).toBeInTheDocument();
    expect(p.className.includes('text-right')).toBeTruthy();
  });
});
