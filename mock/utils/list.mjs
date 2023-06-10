import Mock from 'mockjs';
import { component_types } from '../consts/editorComponent.mjs';

const { Random, mock } = Mock;

// 提前生成一批ID,避免每次获取的id不一致。
const ids = mock({ 'list|10': ['@id'] }).list;

export const getComponentList = () => {
  return [
    {
      fe_id: ids[0], // 为了测试，所以这里的ID，需要写死，否则每次都不一样。
      type: component_types.header, // 组件类型不能重复，前后端一致
      title: '个人信息登记表',
      visible: true,
      locked: false,
      props: {
        title: '个人信息登记表',
        titleLevel: 1,
        titleAlignment: 'center',
        desc: '技术工程部员工专用',
        descAlignment: 'right',
      },
    },
    {
      fe_id: ids[1],
      type: component_types.title, // 组件类型不能重复，前后端一致
      title: '基本信息',
      visible: true,
      locked: false,
      props: {
        title: '基本信息',
        level: 3,
        alignment: 'left',
      },
    },
    {
      fe_id: ids[2],
      type: component_types.input,
      title: '姓名',
      visible: true,
      locked: false,
      props: {
        title: '姓名',
        placeholder: '请输入你的姓名...',
      },
    },
    {
      fe_id: ids[3],
      type: component_types.radio,
      title: '性别',
      visible: true,
      locked: false,
      props: {
        title: '性别',
        orientation: 'horizontal',
        options: [
          { value: 'boy', label: '男' },
          { value: 'girl', label: '女' },
          { value: 'lgbtq', label: 'LGBTQ' },
        ],
        selected: '',
      },
    },
    {
      fe_id: ids[4],
      type: component_types.input,
      title: '年龄',
      visible: true,
      locked: false,
      props: {
        title: '年龄',
        placeholder: '请输入你的年龄...',
      },
    },
    {
      fe_id: ids[5],
      type: component_types.title, // 组件类型不能重复，前后端一致
      title: '工作信息',
      visible: true,
      locked: false,
      props: {
        title: '工作信息',
        level: 3,
        alignment: 'left',
      },
    },
    {
      fe_id: ids[6],
      type: component_types.input,
      title: '职位',
      visible: true,
      locked: false,
      props: {
        title: '职位',
        placeholder: '请输入你的工作岗位...',
      },
    },
    {
      fe_id: ids[7],
      type: component_types.input,
      title: '入职时间',
      visible: true,
      locked: false,
      props: {
        title: '入职时间',
        placeholder: '请输入你的入职时间...',
      },
    },
    {
      fe_id: ids[8],
      type: component_types.checkbox,
      title: '技术栈',
      visible: true,
      locked: false,
      props: {
        title: '技术栈',
        orientation: 'horizontal',
        list: [
          { value: 'web', label: 'Web端', checked: false, disabled: false },
          { value: 'mobile', label: '移动端', checked: false, disabled: false },
          { value: 'client', label: '客户端', checked: false, disabled: false },
          { value: 'service', label: '后端', checked: false, disabled: false },
          { value: 'test', label: '测试', checked: false, disabled: false },
          { value: 'system', label: '系统运维', checked: false, disabled: false },
          { value: 'database', label: 'DBA', checked: false, disabled: false },
        ],
      },
    },
    {
      fe_id: ids[9],
      type: component_types.textarea,
      title: '其他',
      visible: true,
      locked: false,
      props: {
        title: '其他',
        placeholder: '',
      },
    },
  ];
};

// 根据表单的组件列表数据，生成统计数据
export const getStatList = (len = 10) => {
  const components = getComponentList();

  const res = [];

  for (let i = 0; i < len; i++) {
    // 一个用户的答卷
    const stat = {
      _id: Random.id(),
    };
    components.forEach(({ fe_id, type, title, props: { options, list } }) => {
      switch (type) {
        case component_types.input:
          if (title === '年龄') {
            stat[fe_id] = Random.integer(18, 80);
          } else if (title === '姓名') {
            stat[fe_id] = Random.cname();
          } else if (title === '职位') {
            stat[fe_id] = Random.pick([
              '研发',
              '产品',
              '客服',
              '销售',
              '设计',
              '管理',
              '行政',
              '人事',
              '财务',
            ]);
          } else if (title === '入职时间') {
            stat[fe_id] = Mock.mock('@datetime');
          }
          break;
        case component_types.textarea:
          stat[fe_id] = Random.cparagraph();
          break;
        case component_types.radio:
          const labels1 = options.map((o) => o.label);
          stat[fe_id] = Random.pick(labels1);
          break;
        case component_types.checkbox:
          const labels = list.map((l) => l.label);
          const l1 = Random.pick(labels);
          const l2 = Random.pick(labels);
          const l3 = Random.pick(labels);
          stat[fe_id] = [l1, l2, l3].join(',');
          break;
      }
    });
    res.push(stat);
  }

  return res;
};
