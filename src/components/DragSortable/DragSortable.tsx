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
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import React from 'react';

interface DragSortablePropsType<T, P extends UniqueIdentifier> extends PropsWithChildren {
  // 是否只有一个容器
  simpleContainer: boolean;
  // 容器列表
  containers: { [key in P]: T[] };
  // 更新容器列表
  setContainers: Dispatch<SetStateAction<{ [key in P]: T[] }>>;
  // 更新当前拖拽的对象
  setActiveItem: Dispatch<SetStateAction<T | undefined>>;
  // 拖拽开始回掉
  onDragStart?: () => void;
  // 拖拽结束回掉
  onDragEnd?: () => void;
}

// 拖拽容器的最外层，包含了处理逻辑
export const DragSortable = <T extends { id: UniqueIdentifier }, P extends UniqueIdentifier>({
  containers,
  setContainers,
  setActiveItem,
  onDragStart,
  onDragEnd,
  children,
}: DragSortablePropsType<T, P>) => {
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
    const keys = Object.keys(containers) as P[];
    const key = keys.find((key) => containers[key].find((o) => o.id === id))!;
    const list = containers[key];
    return {
      key,
      list,
      item: list.find((o) => o.id === id)!,
      itemIndex: list.map((o) => o.id).indexOf(id),
    };
  };

  const overAction = ({ active, over }: DragOverEvent) => {
    if (!over || over.disabled || active.id === over.id) return;

    const activeItemInfo = getItemInfo(active.id);

    // over.id 移动到空容器的时候, 可能是容器的ID
    // over.id 当移动到一个非空容器，那就是普通的元素ID

    // 在当前容器中，表示移动到了一个空容器，需要从原来的列表里面删掉，追加到空容器中
    if (over.id in containers) {
      const overId = over.id as P;
      setContainers((prevState) => {
        const ids = containers[overId].map((o) => o.id);
        return {
          ...prevState,
          [activeItemInfo.key]: activeItemInfo.list.filter((o) => o.id !== activeItemInfo.item.id),
          [overId]: !ids.includes(active.id)
            ? containers[overId].concat([activeItemInfo.item])
            : containers[overId],
        };
      });
      return;
    }

    // 下面表示移动到了一个非空容器
    // 取出目标对象的数据
    const overItemInfo = getItemInfo(over.id);

    // 更新数据
    setContainers((prevState) => {
      // 如果是同一个容器，直接交换位置即可。
      if (activeItemInfo.key === overItemInfo.key) {
        return {
          ...prevState,
          [activeItemInfo.key]: arrayMove(
            activeItemInfo.list,
            activeItemInfo.itemIndex,
            overItemInfo.itemIndex
          ),
        };
      }

      // 不是同一个容器，需要删掉原来的，追加到新的里面，指定位置
      // 追加操作
      overItemInfo.list.splice(overItemInfo.itemIndex - 1, 0, activeItemInfo.item);
      return {
        ...prevState,
        [activeItemInfo.key]: activeItemInfo.list.filter((o) => o.id !== activeItemInfo.item.id), // 移除移走的元素
        [overItemInfo.key]: overItemInfo.list, // 追加后的列表
      };
    });
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
          setActiveItem(undefined);
          // 操作完成的回掉
          onDragEnd?.();
        }}
      >
        {children}
      </DndContext>
    </div>
  );
};

DragSortable.displayName = 'DragSortable';
