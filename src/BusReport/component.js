import React, { Component } from 'react';
import { Radio, Layout } from 'antd';

const { Content } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BusReport extends Component {
    render() {
        return (
            <Layout>
                <Content style={
                    {
                        background: '#fff',
                        borderRadius: '2px',
                        padding: '32px',
                        marginTop: '24px',
                    }}>
                    <RadioGroup defaultValue="day" size="large">
                        <RadioButton value="day">日报</RadioButton>
                        <RadioButton value="month">月报</RadioButton>
                        <RadioButton value="year">年报</RadioButton>
                    </RadioGroup>
                </Content>
            </Layout>
        );
    }
}

export default BusReport;
