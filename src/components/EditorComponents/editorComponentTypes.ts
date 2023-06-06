import { FC } from 'react';

// 统一的组件配置类型
export type EditorComponentConfType = {
  title: string;
  type: EditorComponentTypes;
  Component: FC<EditorComponentsPropsType>;
  PropComponent: FC<EditorComponentsPropsType>;
  defaultProps: EditorComponentsPropsType;
};

// 编辑器组件对象Key数组
export const EditorComponentTypeKeyNames = <const>['title', 'input', 'paragraph'];
// 编辑器组件类型key
type EditorComponentTypeKeyName = (typeof EditorComponentTypeKeyNames)[number];
// 编辑器组件对象类型
export type EditorComponentTypesObjectType = {
  [k in EditorComponentTypeKeyName]: EditorComponentTypes;
};
