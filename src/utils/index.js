/**
 *  跳转到锚点
 *
 * @param {*} location
 */
export const scrollToAnchor = location => {
  let anchorName = location.hash;
  if (anchorName) {
    anchorName = anchorName.replace('#', '');
    const anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  }
};

// 网络请求的三种默认状态, 在reducer的初始状态中使用。
export const fetchState = {
  isFetching: false,
  isResolved: false,
  isRejected: false,
};
