import { EditorComponentConfType } from './editorComponentTypes';
import EditorInputConf from './EditorInput';
import EditorParagraphConf from './EditorParagraph';
import EditorTitleConf from './EditorTitle';

// 导出编辑器组件相关类型
export * from './editorComponentTypes';

// 全部的组件配置列表
const editorComponentsConfList: EditorComponentConfType[] = [
  EditorInputConf,
  EditorTitleConf,
  EditorParagraphConf,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'G001',
    groupName: '文本显示',
    components: [EditorTitleConf],
  },
  {
    groupId: 'G002',
    groupName: '用户输入',
    components: [EditorInputConf, EditorParagraphConf],
  },
];

// 根据组件类型，查询组件配置
export const getComponentConfByType = (type: EditorComponentTypes) => {
  return editorComponentsConfList.find((comp) => comp.type === type);
};
