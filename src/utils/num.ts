// 随机产生一个指定长度的数字字符串
export const randomCode = (length = 4) => {
  return Math.floor(Math.random() * 10000000000000000)
    .toString()
    .slice(-1 * length);
};
