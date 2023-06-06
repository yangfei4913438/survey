// 导出的 redux store 类型
interface ReduxStoreType {
  userInfo: LocalUserType;
  editorComponents: EditorComponentsStateType;
}

// 编辑器组件类型
interface EditorComponentType {
  fe_id: string; // 表示前端生成的ID，和后端的ID进行区分
  type: EditorComponentTypes;
  title: string;
  visible: boolean;
  locked: boolean;
  props: EditorComponentsPropsType;
}

// 编辑器组件列表类型
interface EditorComponentsStateType {
  selectedId: string;
  editorComponentList: EditorComponentType[];
  copiedComponent: EditorComponentType | null; // 复制组件
}
