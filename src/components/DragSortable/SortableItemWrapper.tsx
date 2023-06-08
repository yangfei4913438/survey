import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FC, PropsWithChildren } from 'react';

import { SortableItem } from './SortableItem';

interface SortableItemWrapperProps extends PropsWithChildren {
  // 每个拖拽元素的ID
  itemId: UniqueIdentifier;
}

// 实际被拖拽的容器组件
export const SortableItemWrapper: FC<SortableItemWrapperProps> = ({ itemId, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SortableItem isDragging={isDragging}>{children}</SortableItem>
    </div>
  );
};

SortableItemWrapper.displayName = 'SortableItemWrapper';
