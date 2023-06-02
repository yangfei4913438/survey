import { FormRule } from 'antd';

import patterns from '@/consts/patterns';

const keyNames = <const>['username', 'password', 'conform', 'nickname'];

export type KeyType = (typeof keyNames)[number];

type RulesType = { [k in KeyType]?: FormRule[] };

export const rules: RulesType = {
  username: [
    { required: true, message: '请输入你的用户名！' },
    { type: 'string', min: 5, max: 12, message: '用户名的长度在5-12个字符之间' },
  ],
  password: [
    { required: true, message: '请输入你的登录密码！' },
    { type: 'string', min: 6, max: 20, message: '密码的长度在6-20个字符之间' },
    {
      pattern: patterns.password,
      message: '密码必须包含数字，字母和特殊符号',
    },
  ],
  conform: [
    { required: true, message: '请再次输入你的登录密码！' },
    // 这里不需要再校验一次密码的长度和输入类型了，因为下面这条规则，确保两次输入是一致的。只要上面正确，下面就必然正确。
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('两次输入的密码不一致！'));
        }
      },
    }),
  ],
  nickname: [
    { required: true, message: '请输入你的显示昵称!' },
    { type: 'string', min: 2, max: 12, message: '昵称的长度在5-12个字符之间' },
  ],
};
