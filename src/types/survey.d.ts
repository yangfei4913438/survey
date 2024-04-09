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

// 请求列表数据的查询选项参数
interface RequestOptionType {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
}

// 后端返回的问卷详情
interface questionType {
  id: string;
  author: string;
  title: string;
  desc: string;
  isPublished: boolean;
  isStar: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  componentList: EditorComponentType[];
}

// 问卷列表返回数据结构
interface ResultSurveyDetailType {
  list: questionType[];
  total: number;
}

// 基础分页类型
interface BasePageInfoType {
  page: number;
  pageSize: number;
  total: number;
}

// 加载更多的分页信息类型
interface SurveyPagesType extends BasePageInfoType {
  list: questionType[];
}

// 问卷统计列表，分页信息
interface SurveyStatPageInfoType extends BasePageInfoType {
  list: { [key in string]: string | number }[];
}

// 问卷详情, 查询和更新都是这个
interface SurveyDetailType extends PageInfoType {
  componentList: EditorComponentType[];
}
