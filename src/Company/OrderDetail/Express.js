import React from 'react';
import { List, Menu } from 'antd';
import './index.less';


const Express = ({ express }) => {
  return (
    <div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['express']}
        style={{ fontSize: 18, fontWeight: 'bold' }}
      >
        <Menu.Item key="express">
            物流信息
        </Menu.Item>
      </Menu>
      <List
        header={<div>物流公司 ：{express.RESULT.com}</div>}
        bordered
        dataSource={express.RESULT.context}
        renderItem={item => (
          <List.Item>
            <span className="time">{item.time}</span> ：<span className="desc">{item.desc}</span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Express;
