// 问卷简单类型，列表展示用
interface SurveySimpleType {
  id: string;
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

// 问卷详情, 查询和更新都是这个
interface SurveyDetailType extends PageInfoType {
  componentList: ResultComponentType[];
}
