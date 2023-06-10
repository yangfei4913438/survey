// 问卷编辑器组件类型对象
export const editorComponentTypes: SurveyEditorComponentTypes = {
  header: 'editor_header',
  title: 'editor_title',
  paragraph: 'editor_paragraph',
  input: 'editor_input',
  textarea: 'editor_textarea',
  radio: 'editor_radio',
  checkbox: 'editor_checkbox',
};

// 可交互(输入、选中等交互行为)的组件类型
export const interoperableTypes: SurveyEditorComponentType[] = [
  editorComponentTypes.input,
  editorComponentTypes.radio,
  editorComponentTypes.checkbox,
  editorComponentTypes.textarea,
];
