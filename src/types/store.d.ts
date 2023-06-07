// 导出的 redux store 类型
interface ReduxStoreType {
  userInfo: LocalUserType;
  editorComponents: EditorComponentsStateType;
  pageInfo: PageInfoType;
}

// 编辑器组件类型
interface EditorComponentType {
  // 表示前端生成的ID，和后端的ID进行区分
  fe_id: string;
  // 组件标题
  title: string;
  // 组件可见性
  visible: boolean;
  // 组件是否被锁定
  locked: boolean;
  // 组件类型
  type: SurveyEditorComponentType;
  // 组件参数
  props: EditorComponentsPropsType;
}

// 编辑器组件列表类型
interface EditorComponentsStateType {
  // 选中组件的ID
  selectedId: string;
  // 编辑组件的列表
  editorComponentList: EditorComponentType[];
  // 拷贝的组件
  copiedComponent: EditorComponentType | null;
}

// 页面信息
interface PageInfoType {
  // 问卷ID
  id: string;
  // 问卷标题
  title: string;
  // 问卷描述
  desc?: string;
  // 问卷的JS代码
  js?: string;
  // 问卷的css代码
  css?: string;
}
