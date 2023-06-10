import EditorCheckboxConf from './EditorCheckbox';
import type { EditorComponentConfType } from './editorComponentTypes';
import EditorHeaderConf from './EditorHeader';
import EditorInputConf from './EditorInput';
import EditorParagraphConf from './EditorParagraph';
import EditorRadioConf from './EditorRadio';
import EditorTextareaConf from './EditorTextarea';
import EditorTitleConf from './EditorTitle';

// 导出编辑器组件相关类型
export * from './editorComponentTypes';

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'G001',
    groupName: '文本显示',
    components: [EditorHeaderConf, EditorTitleConf, EditorParagraphConf],
  },
  {
    groupId: 'G002',
    groupName: '用户输入',
    components: [EditorInputConf, EditorTextareaConf, EditorRadioConf, EditorCheckboxConf],
  },
];

// 全部的组件配置列表
const editorComponentsConfList: EditorComponentConfType[] = componentConfGroup
  .map((group) => group.components)
  .reduce((a, b) => a.concat(b));

// 根据组件类型，查询组件配置
export const getComponentConfByType = (type: SurveyEditorComponentType) => {
  return editorComponentsConfList.find((comp) => comp.type === type);
};
