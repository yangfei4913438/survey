import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, type TabsProps } from 'antd';
import React, { FC, useState } from 'react';

import ComponentProps from '@/pages/survey/edit/ComponentProps';

// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);

  const tabsItems: TabsProps['items'] = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: (
        <div className='h-full w-full overflow-auto'>
          <ComponentProps />
        </div>
      ),
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置详情</div>,
    },
  ];

  return <Tabs defaultActiveKey={activeKey} items={tabsItems} className='h-full'></Tabs>;
};

export default RightPanel;
