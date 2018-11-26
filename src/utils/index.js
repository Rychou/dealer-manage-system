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

// 0-未付款
// 1-已付款
// 2-集团确认
// 3-已发货
// 4-已签收
// 5-交易完成
// 6-退货申请
// 7-退货中
// 8-已退货
// 9-取消交易
export const orderStatus = (orderStatusCode) => {
  let status = "";
  switch(orderStatus){
    case 0 : status = "未付款";break;
    case 1 : status = "已付款";break;
    case 2 : status = "集团已确认";break;
    case 3 : status = "已发货";break;
    case 4 : status = "已签收";break;
    case 5 : status = "交易完成";break;
    case 6 : status = "退货申请";break;
    case 7 : status = "退货中";break;
    case 8 : status = "已退货";break;
    case 9 : status = "交易取消";break;
    default : status = "NotFound";
  }
  return status;
};
