import {
  closestCorners,
  DndContext,
  DragOverEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { arrayMove } from '@dnd-kit/sortable';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface DragSortableSimplePropsType<T> extends PropsWithChildren {
  // 容器列表
  containers: T[];
  // 更新容器列表
  setContainers: (list: T[]) => void;
  // 更新当前拖拽的对象
  setActiveItem: (comp: T | null) => void;
  // 拖拽开始回掉
  onDragStart?: () => void;
  // 拖拽结束回掉
  onDragEnd?: () => void;
}

// 单容器处理
export const DragSortableSimple = <T extends { id: UniqueIdentifier }>({
  containers,
  setContainers,
  setActiveItem,
  onDragStart,
  onDragEnd,
  children,
}: DragSortableSimplePropsType<T>) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // 活动限制
      activationConstraint: {
        distance: 8, // 8px限制，拖动小于8px是点击
      },
    })
  );

  // 获取目标元素的相关信息
  const getItemInfo = (id: UniqueIdentifier) => {
    const list = containers as T[];
    return {
      item: list.find((o) => o.id === id)!,
      itemIndex: list.map((o) => o.id).indexOf(id),
    };
  };

  const overAction = ({ active, over }: DragOverEvent) => {
    if (!over || over.disabled || active.id === over.id) return;

    // 取出目标对象的数据
    const overItemInfo = getItemInfo(over.id);
    const activeItemInfo = getItemInfo(active.id);

    setContainers(arrayMove(containers, activeItemInfo.itemIndex, overItemInfo.itemIndex));
    return;
  };

  return (
    <div className='flex'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={({ active }) => {
          if (!active) return;
          // 获取当前的拖拽对象信息
          const activeItemInfo = getItemInfo(active.id);
          // 设置当前的拖拽对象
          setActiveItem(activeItemInfo.item);
          // 开始操作的回掉
          onDragStart?.();
        }}
        onDragOver={overAction}
        onDragEnd={() => {
          // 清除活动对象的信息
          setActiveItem(null);
          // 操作完成的回掉
          onDragEnd?.();
        }}
      >
        {children}
      </DndContext>
    </div>
  );
};

DragSortableSimple.displayName = 'DragSortableSimple';
