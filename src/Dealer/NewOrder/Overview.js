import React from 'react';

const Overview = ({ address, products }) => {
  let totalPrice = 0;
  products.forEach(({ price, amount }) => {
    totalPrice += price * amount;
  });
  return (
    <div className="overview">
      <div>
        <span className="label">实付款：</span>
        <span className="price">
          <span style={{ color: 'gray' }}>￥</span>
          <span style={{ color: 'red' }}>{totalPrice.toFixed(2)}</span>
        </span>
      </div>
      <div>
        <span className="label">寄送至：</span>
        <span>
          {address.address
            ? address.address.map((item, index) => <span key={item}>{item} </span>)
            : null}
          {address.detailAddress}
        </span>
      </div>
      <div>
        <span className="label">收货人：</span>
        <span>
          {address.name} {address.phone}
        </span>
      </div>
    </div>
  );
};

export default Overview;
