import cx from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface SortableItemProps extends PropsWithChildren {
  isDragging?: boolean;
  DragOverlay?: boolean;
}

// 拖拽组件最内层的组件，在你需要包裹的组件上层就是这个组件
export const SortableItem: FC<SortableItemProps> = ({ children, isDragging, DragOverlay }) => {
  return (
    <div
      className={cx(
        isDragging // isDragging 设置底部原来的样式，
          ? 'opacity-20 bg-gray-100 border border-dashed border-slate-500'
          : DragOverlay //  DragOverlay 设置拖拽对象的样式
          ? 'bg-gray-100 shadow rounded border-none hover:border-none cursor-move'
          : 'bg-white' // 默认样式
      )}
    >
      {children}
    </div>
  );
};

SortableItem.displayName = 'SortableItem';
