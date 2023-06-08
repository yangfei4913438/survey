// 仅限编辑器画布使用的快捷键
import { useKeyPress } from 'ahooks';

import useSurveyEditor from '@/hooks/useSurveyEditor';

const isEditActive = () => {
  const activeElemTag = document.activeElement?.tagName;
  if (activeElemTag) {
    return ['INPUT', 'TEXTAREA'].includes(activeElemTag);
  }
  return false;
};

const useEditorCanvasKeyPress = () => {
  const {
    removeSelectedComponent,
    copySelectComponent,
    selectPrevComponent,
    selectNextComponent,
    pasteCopiedComponent,
  } = useSurveyEditor();

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    copySelectComponent();
  });

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    pasteCopiedComponent();
  });

  // 删除监听
  useKeyPress(['backspace', 'delete'], () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    removeSelectedComponent();
  });

  // 选中上一个
  useKeyPress('uparrow', () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    selectPrevComponent();
  });

  // 选中下一个
  useKeyPress(40, () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    selectNextComponent();
  });
};

export default useEditorCanvasKeyPress;
