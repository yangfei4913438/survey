import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, message, Popover, Space, Tooltip, Typography } from 'antd';
import QRCode from 'qrcode.react';
import React, { useMemo, useRef } from 'react';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';

const StatHeader = () => {
  const { toPrevRoute, goToRoute } = useProjectRoute();
  const {
    pageInfo: { id, isPublished, title },
  } = useSurveyEditor();

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);

  const copy = () => {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中 input 的内容
    document.execCommand('copy'); // 拷贝选中内容 （富文本编辑器的操作）
    message.success('拷贝成功');
  };

  const handleEdit = () => {
    const path = surveyPath.edit(id);
    goToRoute<typeof path>(path);
  };

  // 使用 useMemo 1. 依赖项是否经常变化; 2. 缓存的元素是否创建成本较高
  const LinkAndQRCodeElem = useMemo(() => {
    // 未发布的不处理
    if (!isPublished) return null;

    // 拼接 url ，需要参考 C 端的规则
    const url = `${location.origin}/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title='拷贝链接'>
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <article className='flex h-16 items-center justify-between bg-white px-4 shadow-lg'>
      <Space className='flex-1'>
        <Button type='link' icon={<LeftOutlined />} onClick={toPrevRoute}>
          返回
        </Button>
        <Typography.Title level={4}>{title}</Typography.Title>
      </Space>
      <div className='flex-1 text-center'>{LinkAndQRCodeElem}</div>
      <Space className='flex flex-1 justify-end'>
        <Button type={'primary'} onClick={handleEdit}>
          编辑问卷
        </Button>
      </Space>
    </article>
  );
};

export default StatHeader;
