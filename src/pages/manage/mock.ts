import type { IListCard } from '@/components/ListCard';
import { randomCode } from '@/utils/num';

export const list: IListCard[] = [
  {
    _id: randomCode(8),
    isPublished: false,
    answerCount: 80,
    createdAt: new Date().toLocaleString(),
    isStar: false,
    title: '问卷1',
  },
  {
    _id: randomCode(8),
    isPublished: true,
    answerCount: 100,
    createdAt: new Date().toLocaleString(),
    isStar: false,
    title: '问卷2',
  },
  {
    _id: randomCode(8),
    isPublished: false,
    answerCount: 120,
    createdAt: new Date().toLocaleString(),
    isStar: true,
    title: '问卷3',
  },
];
