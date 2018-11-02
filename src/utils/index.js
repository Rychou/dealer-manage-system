/**
     * 转义状态码
     *
     * @param {*} status
     * @returns
     */
export const transformStatus = (status) => {
      switch (status) {
        case 1:
          return '启用';
        case 2:
          return '熄火';
        case 3:
          return '其他';
        case 254:
          return '异常';
        case 255:
          return '无效';
        default:
          return '';
      }
};

 /**
*
* @memberof BusDetail
*/
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
