import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, type TabsProps } from 'antd';
import React, { FC, useLayoutEffect, useState } from 'react';

import ComponentProps from '@/pages/survey/edit/ComponentProps';
import PageSetting from '@/pages/survey/edit/PageSetting';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const { selectedId, selectNextComponent } = useSurveyEditor();
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);

  useLayoutEffect(() => {
    if (!selectedId) {
      setActiveKey(TAB_KEYS.SETTING_KEY);
    } else {
      setActiveKey(TAB_KEYS.PROP_KEY);
    }
  }, [selectedId]);

  const tabsItems: TabsProps['items'] = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProps />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  const handleTabChange = (key: string) => {
    if (key === TAB_KEYS.PROP_KEY) {
      // 不存在就设置为第一个，存在就不用管了
      if (!selectedId) {
        selectNextComponent();
      }
    }
    // 更新tab
    setActiveKey(key as TAB_KEYS);
  };

  return (
    <Tabs activeKey={activeKey} items={tabsItems} onChange={handleTabChange} className='h-full' />
  );
};

export default RightPanel;
