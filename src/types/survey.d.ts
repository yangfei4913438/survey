// 问卷简单类型，列表展示用
interface SurveySimpleType {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
}

// 问卷列表返回数据结构
interface ResultSurveySimpleType {
  list: SurveySimpleType[];
  total: number;
}
