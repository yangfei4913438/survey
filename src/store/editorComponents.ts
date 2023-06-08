import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cloneDeep from 'lodash-es/cloneDeep';
import { nanoid } from 'nanoid';

import { changeSelectedId, getNextVisibleComponent, pushComponent } from '@/store/utils';

const initialState: EditorComponentsStateType = {
  editorComponentList: [],
  selectedId: '',
  copiedComponent: null,
  activeComponent: null,
};

const editorComponentsSlice = createSlice({
  name: 'editorComponents', // 模块名称
  initialState: initialState, // 初始值
  reducers: {
    // 重置编辑器组件，就是把里面的组件都重置了
    // produce 是不再需要返回，直接修改即可。
    resetEditorComponents: (
      state: EditorComponentsStateType,
      action: PayloadAction<EditorComponentsStateType>
    ) => {
      return action.payload;
    },
    // 设置编辑器组件列表
    setEditorComponentList: (
      state: EditorComponentsStateType,
      action: PayloadAction<EditorComponentType[]>
    ) => {
      state.editorComponentList = action.payload;
    },
    // 设置拖拽活动组件
    setActiveComponent: (
      state: EditorComponentsStateType,
      action: PayloadAction<EditorComponentType | null>
    ) => {
      state.activeComponent = action.payload;
    },
    // 修改选中ID
    changeSelectedId: (state: EditorComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    // 添加新组件到组件列表
    addComponent: (
      state: EditorComponentsStateType,
      action: PayloadAction<EditorComponentType>
    ) => {
      pushComponent(state, action.payload);
    },
    // 修改组件标题
    changeComponentTitle: (
      state: EditorComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      // 取出数据
      const { fe_id, title } = action.payload;
      // 找到目标组件
      const component = state.editorComponentList.find((comp) => comp.fe_id === fe_id);
      if (component) {
        component.title = title;
      }
    },
    // 修改组件的参数
    changeComponentProps: (
      state: EditorComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: EditorComponentsPropsType }>
    ) => {
      // 取出数据
      const { fe_id, newProps } = action.payload;
      // 找到目标组件
      const component = state.editorComponentList.find((comp) => comp.fe_id === fe_id);
      if (component) {
        component.props = newProps;
      }
    },
    // 从列表里面移除当前选中的组件
    removeSelectedComponent: (state: EditorComponentsStateType) => {
      // 长度就1个，删除就全部清空
      if (state.editorComponentList.length === 1) {
        state.selectedId = '';
        state.editorComponentList = [];
      } else {
        const { index } = changeSelectedId(state, state.selectedId);
        // 移除之前选中的组件
        state.editorComponentList.splice(index, 1);
      }
    },
    // 设置组件的隐藏/显示状态
    setComponentVisible: (
      state: EditorComponentsStateType,
      action: PayloadAction<{ fe_id: string; visible: boolean }>
    ) => {
      const { fe_id, visible } = action.payload;
      // 找到目标组件
      const component = state.editorComponentList.find((comp) => comp.fe_id === fe_id);
      // 找到才能继续处理
      if (component) {
        component.visible = visible;

        // 处理选中组件
        // 判断显示还是隐藏
        if (visible) {
          // 显示操作
          state.selectedId = fe_id;
        } else {
          const visibleList = state.editorComponentList.filter((c) => c.visible);
          // 隐藏操作
          // 如果显示组件的数量就1个，清空选中组件ID
          if (visibleList.length === 1) {
            state.selectedId = '';
            visibleList[0].visible = false;
          } else {
            const { index } = changeSelectedId(state, fe_id);
            // 更新组件状态
            state.editorComponentList[index].visible = false;
          }
        }
      }
    },
    // 切换组件的锁定状态
    toggleComponentLockStatus: (
      state: EditorComponentsStateType,
      action: PayloadAction<string>
    ) => {
      const fe_id = action.payload;
      // 找到目标组件
      const component = state.editorComponentList.find((comp) => comp.fe_id === fe_id);
      if (component) {
        component.locked = !component.locked;
      }
    },
    // 复制当前选中组件
    copySelectComponent: (state: EditorComponentsStateType) => {
      // 找到目标组件
      const component = state.editorComponentList.find((comp) => comp.fe_id === state.selectedId);
      if (component) {
        // 深拷贝，必须互相影响
        state.copiedComponent = cloneDeep(component);
      }
    },
    // 粘贴组件
    pasteCopiedComponent: (state: EditorComponentsStateType) => {
      // 没有复制内容的时候不处理
      if (!state.copiedComponent) return;
      // 粘贴的时候，需要替换原来的fe_id，id不能重复。
      state.copiedComponent.fe_id = nanoid();
      // 插入组件
      pushComponent(state, state.copiedComponent);
    },
    // 选中上一个组件
    selectPrevComponent: (state: EditorComponentsStateType) => {
      const visibleList = state.editorComponentList.filter((c) => c.visible);

      // 当前索引
      const idx = visibleList.findIndex((c) => c.fe_id === state.selectedId);
      if (idx < 0) {
        // 没选中
        return;
      } else if (idx === 0) {
        // 已经是第一个了
        return;
      } else {
        // 其他情况，上移
        state.selectedId = visibleList[idx - 1].fe_id;
      }
    },
    // 选中下一个组件
    selectNextComponent: (state: EditorComponentsStateType) => {
      const visibleList = state.editorComponentList.filter((c) => c.visible);
      // 当前索引
      const idx = visibleList.findIndex((c) => c.fe_id === state.selectedId);
      if (idx < 0) {
        // 当前没选中, 就选中第一个
        state.selectedId = visibleList[0].fe_id;
      } else if (idx === visibleList.length - 1) {
        // 已经是最后一个了
        return;
      } else {
        // 其他情况，下移
        state.selectedId = visibleList[idx + 1].fe_id;
      }
    },
    // 可见组件位置前移
    moveComponentToPrev: (state: EditorComponentsStateType, action: PayloadAction<number>) => {
      const currIndex = action.payload;
      const target = getNextVisibleComponent(state.editorComponentList, currIndex, false);
      if (target) {
        const targetIndex = state.editorComponentList.findIndex((c) => c.fe_id === target.fe_id);
        state.editorComponentList = arrayMove(state.editorComponentList, currIndex, targetIndex);
      }
    },
    // 可见组件位置后移
    moveComponentToNext: (state: EditorComponentsStateType, action: PayloadAction<number>) => {
      const currIndex = action.payload;
      const target = getNextVisibleComponent(state.editorComponentList, currIndex, true);
      if (target) {
        const targetIndex = state.editorComponentList.findIndex((c) => c.fe_id === target.fe_id);
        state.editorComponentList = arrayMove(state.editorComponentList, currIndex, targetIndex);
      }
    },
  },
});

// 导出 action 方法
export const editorComponentActions = editorComponentsSlice.actions;

// 导出 reducer
export const editorComponentsReducer = editorComponentsSlice.reducer;
