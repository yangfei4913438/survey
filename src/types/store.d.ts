// 编辑器组件类型
interface EditorComponentType {
  // 组件id 和 fe_id 一样，主要是用于一些特殊场景下需要id字段。
  id: string;
  // 表示前端生成的组件ID，和后端的ID进行区分
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
  // 拖拽的激活组件
  activeComponent: EditorComponentType | null;
  // 数据加载状态, 发起网络请求的时候会更新，多个组件共享。状态和数据放在一起，使用起来也会更方便
  isLoading: boolean;
}

// 问卷编辑器的页面信息
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
  // 问卷是否已经发布
  isPublished?: boolean;
}
