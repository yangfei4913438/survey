import EditorConf from '@/components/EditorComponents/EditorCheckbox';

import { render, screen } from '../../utils/test-utils';

// 取出组件
const Component = EditorConf.Component;

describe('测试问卷编辑器的 Checkbox 组件', () => {
  it('测试默认属性', () => {
    render(<Component />);

    const p = screen.getByText('多选输入框');
    expect(p).toBeInTheDocument();
    expect(p.matches('strong')).toBeTruthy();

    const r = screen.getByRole('menuitemcheckbox');
    expect(r.className.includes('ant-space-horizontal')).toBeTruthy();
    expect(r.className.includes('ant-space-align-center')).toBeTruthy();

    Array.from({ length: 3 }, (_, idx) => idx + 1).forEach((item) => {
      // value 的选择使用 getByDisplayValue
      const radio = screen.getByDisplayValue(`option${item}`);
      expect(radio).toBeInTheDocument();

      const parent = radio.parentElement!;
      expect(parent.className.includes('ant-checkbox-checked')).toBe(false);
      expect(parent.className.includes('ant-checkbox-disabled')).toBe(false);

      const label = screen.getByText(`选项${item}`);
      expect(label).toBeInTheDocument();
    });
  });

  it('测试传入属性', () => {
    const ops = {
      title: 'hello多选输入框',
      orientation: 'vertical',
      list: [
        { value: 'option1', label: '选项1', checked: true, disabled: false },
        { value: 'option2', label: '选项2', checked: false, disabled: true },
        { value: 'option3', label: '选项3', checked: false, disabled: false },
      ],
    };

    render(<Component {...ops} />);

    const p = screen.getByText('hello多选输入框');
    expect(p).toBeInTheDocument();

    const r = screen.getByRole('menuitemcheckbox');
    expect(r.className.includes('ant-space-vertical')).toBeTruthy();

    Array.from({ length: 3 }, (_, idx) => idx + 1).forEach((item) => {
      const radio = screen.getByDisplayValue(`option${item}`);
      expect(radio).toBeInTheDocument();

      const parent = radio.parentElement!;
      if (item === 1) {
        expect(parent.className.includes('ant-checkbox-checked')).toBe(true);
        expect(parent.className.includes('ant-checkbox-disabled')).toBe(false);
      } else if (item === 2) {
        expect(parent.className.includes('ant-checkbox-checked')).toBe(false);
        expect(parent.className.includes('ant-checkbox-disabled')).toBe(true);
      } else {
        expect(parent.className.includes('ant-checkbox-checked')).toBe(false);
        expect(parent.className.includes('ant-checkbox-disabled')).toBe(false);
      }

      const label = screen.getByText(`选项${item}`);
      expect(label).toBeInTheDocument();
    });
  });
});
