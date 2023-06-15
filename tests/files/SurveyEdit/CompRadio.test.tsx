import EditorConf from '@/components/EditorComponents/EditorRadio';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的 Radio 组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('单选输入框');
    expect(p).toBeInTheDocument();
    expect(p.matches('strong')).toBeTruthy();

    const r = screen.getByRole('radiogroup');
    expect(r.className.includes('ant-space-horizontal')).toBeTruthy();
    expect(r.className.includes('ant-space-align-center')).toBeTruthy();

    Array.from({ length: 3 }, (_, idx) => idx + 1).forEach((item) => {
      // value 的选择使用 getByDisplayValue
      const radio = screen.getByDisplayValue(`option${item}`);
      expect(radio).toBeInTheDocument();

      const label = screen.getByText(`选项${item}`);
      expect(label).toBeInTheDocument();
    });
  });

  it('测试传入属性', () => {
    const ops = {
      title: 'hello输入框',
      orientation: 'vertical',
      options: [
        { value: 'option11', label: '选项11' },
        { value: 'option12', label: '选项12' },
        { value: 'option13', label: '选项13' },
        { value: 'option14', label: '选项14' },
        { value: 'option15', label: '选项15' },
      ],
      selected: 'option11',
    };

    render(<Component {...ops} />);

    const p = screen.getByText('hello输入框');
    expect(p).toBeInTheDocument();

    const r = screen.getByRole('radiogroup');
    expect(r.className.includes('ant-space-vertical')).toBeTruthy();

    Array.from({ length: 5 }, (_, idx) => idx + 1).forEach((item) => {
      const radio = screen.getByDisplayValue(`option1${item}`);

      expect(radio).toBeInTheDocument();
      expect(radio.matches('input')).toBeTruthy();

      const parent = radio.parentElement!;
      if (item === 1) {
        expect(parent.className.includes('ant-radio-checked')).toBeTruthy();
      } else {
        expect(parent.className.includes('ant-radio-checked')).not.toBeTruthy();
      }

      const label = screen.getByText(`选项1${item}`);
      expect(label).toBeInTheDocument();
    });
  });
});
