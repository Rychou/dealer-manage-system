import React from 'react';
import { List, Menu, Timeline } from 'antd';
import './index.less';

// const { Meta } = Card;
const { Item } = Timeline;


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
          <List.Item><span className="time">{item.time}</span> ：{item.desc}</List.Item>
        )}
      />
      {/* <Timeline mode="alternate">
      {
        express.RESULT.context.map((deliver,index)=>{
          return (<Item key={index}>
                    {deliver.time}
                  </Item>)
        })
      }

        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
      </Timeline> */}
    </div>
  );
};

// {
//   "ERRORCODE": "0",
//   "RESULT": {
//       "com": "申通快递",
//       "context": [
//           {
//               "time": "2018-12-09 10:58:05",
//               "desc": "杭电代签-已签收"
//           },
//           {
//               "time": "2018-12-09 06:29:41",
//               "desc": "浙江杭州下沙公司-学校自取件86926527(18967165848,)-派件中"
//           },
//           {
//               "time": "2018-12-09 05:44:41",
//               "desc": "已到达-浙江杭州下沙公司"
//           },
//           {
//               "time": "2018-12-09 03:36:32",
//               "desc": "浙江杭州中转部-已发往-浙江杭州下沙公司"
//           },
//           {
//               "time": "2018-12-08 23:31:35",
//               "desc": "上海中转部-已装袋发往-浙江杭州中转部"
//           },
//           {
//               "time": "2018-12-08 21:31:42",
//               "desc": "上海青浦开发区公司-已装袋发往-上海中转部"
//           },
//           {
//               "time": "2018-12-08 21:27:28",
//               "desc": "上海青浦开发区公司-已发往-上海中转部"
//           },
//           {
//               "time": "2018-12-08 21:27:28",
//               "desc": "上海青浦开发区公司-已进行装袋扫描"
//           },
//           {
//               "time": "2018-12-08 21:09:44",
//               "desc": "上海青浦开发区公司-合雨(18656679648)-已收件"
//           }
//       ]
//   }
// }


export default Express;
