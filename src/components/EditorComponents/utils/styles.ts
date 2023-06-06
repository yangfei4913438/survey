// 文本对齐控制
export const getTextAlign = (textAlignment: TextAlignType) => {
  switch (textAlignment) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    default:
      return 'text-right';
  }
};
