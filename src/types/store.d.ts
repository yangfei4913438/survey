// 导出的 redux store 类型
interface ReduxStoreType {
  userInfo: LocalUserType;
  editorComponents: EditorComponentsStateType;
}

// 编辑器组件类型
interface EditorComponentsType {
  fe_id: string;
  type: EditorComponentTypes;
  title: string;
  props: EditorComponentsPropsType;
}

// 编辑器组件列表类型
interface EditorComponentsStateType {
  selectedId: string;
  editorComponentList: EditorComponentsType[];
}
