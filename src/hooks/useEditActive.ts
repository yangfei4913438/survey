// 判断是否在编辑状态
const useEditActive = () => {
  const activeElemTag = document.activeElement?.tagName;
  if (activeElemTag) {
    return ['input', 'textarea'].includes(String(activeElemTag).toLowerCase());
  }
  return false;
};

export default useEditActive;
