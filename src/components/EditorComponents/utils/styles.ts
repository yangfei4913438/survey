// 文本对齐
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

// 字体大小
export const getFontSize = (titleLevel: TitleLevelType) => {
  switch (titleLevel) {
    case 1:
      return 'text-2xl';
    case 2:
      return 'text-xl';
    case 3:
      return 'text-lg';
    case 4:
      return 'text-base';
    default:
      return 'text-sm';
  }
};
