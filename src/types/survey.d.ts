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

// 请求问卷列表数据的查询参数
interface RequestSurveyListType {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
}

// 加载更多的分页信息类型
interface SurveyPageInfoType {
  page: number;
  pageSize: number;
  total: number;
  list: SurveySimpleType[];
}

// 返回的组件数据类型
type ResultComponentType = EditorComponentType;

// 返回的问卷详情
interface ResultSurveyDetailType {
  id: string;
  title: string;
  componentList: ResultComponentType[];
}
