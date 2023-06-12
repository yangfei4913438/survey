// 仅限编辑器画布使用的快捷键
import { useKeyPress } from 'ahooks';

import useSurveyEditor from '@/hooks/store/useSurveyEditor';

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
    componentOperationRedo,
    componentOperationUndo,
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
  useKeyPress('downarrow', () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    selectNextComponent();
  });

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      // 编辑状态不能操作
      if (isEditActive()) return;
      componentOperationUndo();
    },
    {
      exactMatch: true, // 严格匹配
    }
  );

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    // 编辑状态不能操作
    if (isEditActive()) return;
    componentOperationRedo();
  });
};

export default useEditorCanvasKeyPress;
