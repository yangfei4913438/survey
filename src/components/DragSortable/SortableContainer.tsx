import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { FC, PropsWithChildren } from 'react';

interface SortableContainerProps extends PropsWithChildren {
  // 容器的ID
  containerId: string;
  // 容器内部的元素ID数组
  itemIds: UniqueIdentifier[];
}

// 拖拽的容器，里面可以放很多拖拽的元素，默认垂直布局
export const SortableContainer: FC<SortableContainerProps> = ({
  containerId,
  itemIds,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  return (
    <SortableContext
      id={containerId} // 容器资深的ID
      items={itemIds} // 容器中的Ids
      strategy={verticalListSortingStrategy} // 垂直容器
    >
      <div ref={setNodeRef} className='flex-1'>
        {children}
      </div>
    </SortableContext>
  );
};

SortableContainer.displayName = 'SortableContainer';
