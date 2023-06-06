// 仅限编辑器画布使用的快捷键
import { useKeyPress } from 'ahooks';

import useEditActive from '@/hooks/useEditActive';
import useEditorComponents from '@/hooks/useEditorComponents';

const useEditorCanvasKeyPress = () => {
  const {
    removeSelectedComponent,
    copySelectComponent,
    selectPrevComponent,
    selectNextComponent,
    pasteCopiedComponent,
  } = useEditorComponents();
  const editActive = useEditActive();

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    // 编辑状态不能操作
    if (editActive) return;
    copySelectComponent();
  });

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    // 编辑状态不能操作
    if (editActive) return;
    pasteCopiedComponent();
  });

  // 删除监听
  // useKeyPress(['backspace', 'delete'], () => {
  //   // 编辑状态不能操作
  //   if (editActive) return;
  //   removeSelectedComponent();
  // });

  // 选中上一个
  useKeyPress('uparrow', () => {
    // 编辑状态不能操作
    if (editActive) return;
    selectPrevComponent();
  });

  // 选中下一个
  useKeyPress(40, () => {
    // 编辑状态不能操作
    if (editActive) return;
    selectNextComponent();
  });
};

export default useEditorCanvasKeyPress;
