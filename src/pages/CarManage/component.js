import React, { Component } from 'react';
import { Layout, Table } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

class CarManage extends Component {
    componentDidMount() {
        const { isResolve, fetchCarsInfo } = this.props;
        if (!isResolve) {
            fetchCarsInfo({ result: 10, page: 1 });
        }
    }

    render() {
        const columns = [{
            title: '使用单位',
            dataIndex: 'useUnit',
            key: 'useUnit',
        }, {
            title: '车辆自编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '车牌号',
            dataIndex: 'carNumber',
            key: 'carNumber',
        }, {
            title: 'VIN号',
            dataIndex: 'VINNumber',
            key: 'VINNumber',
        }, {
            title: '车辆型号',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '持续里程',
            dataIndex: 'distance',
            key: 'distance',
        }, {
            title: '修理公司',
            dataIndex: 'fixCompany',
            key: 'fixCompany',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span><a href="#">编辑</a> | <a href="#">删除</a> </span>
            ),
        }];

        return (
            <Layout>
                <Content style={
                    {
                        background: '#fff',
                        borderRadius: '2px',
                        padding: '32px',
                        marginTop: '24px',
                    }}>
                    <Table
                    rowKey="id"
                    bordered
                    loading={this.props.isFetching}
                    columns={columns}
                    dataSource={this.props.cars}
                    pagination={this.props.pagination}
                    // onChange={this.handleChange}
                />
                </Content>
            </Layout>
        );
    }
}

export default CarManage;
