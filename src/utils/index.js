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
