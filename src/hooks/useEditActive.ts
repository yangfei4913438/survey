// 判断是否在编辑状态
const useEditActive = () => {
  const activeElem = document.activeElement;
  return activeElem !== document.body;
};

export default useEditActive;
