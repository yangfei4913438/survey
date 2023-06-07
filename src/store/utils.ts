// 组件数量大于1的时候，组件删除或者隐藏，变更选中组件ID
export const changeSelectedId = (state: EditorComponentsStateType, currentID: string) => {
  const currIndex = state.editorComponentList.findIndex((c) => c.fe_id === currentID);
  // 大于1个组件的处理方法
  // 如果已经是最后一个组件了，选中上一个组件
  if (currIndex + 1 >= state.editorComponentList.length) {
    state.selectedId = state.editorComponentList[currIndex - 1].fe_id;
  } else {
    // 如果不是最后一个，自动选中下一个组件
    state.selectedId = state.editorComponentList[currIndex + 1].fe_id;
  }

  return { index: currIndex };
};

// 添加新组件到组件列表中
export const pushComponent = (
  state: EditorComponentsStateType,
  newComponent: EditorComponentType
) => {
  const { selectedId, editorComponentList } = state;
  if (selectedId) {
    const idx = editorComponentList.findIndex((c) => c.fe_id === selectedId);
    // 已选中的时候，在选中组件的后面插入
    editorComponentList.splice(idx + 1, 0, newComponent);
  } else {
    // 没有选中任何组件，就追加到最后
    editorComponentList.push(newComponent);
  }
  // 最后选中新增组件
  state.selectedId = newComponent.fe_id;
};
