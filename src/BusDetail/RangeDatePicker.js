import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, DatePicker, Button } from 'antd';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

class RangeDatePicker extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
      searchByRangeDate,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      const startTime = new Date(values['range-picker'][0]._d).getTime();
      const endTime = new Date(values['range-picker'][1]._d).getTime();
      searchByRangeDate(startTime, endTime);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '12px' }}>
        <FormItem>
          {getFieldDecorator('range-picker', {
            rules: [
              {
                type: 'array',
                required: true,
                message: '请选择日期范围！',
              },
            ],
          })(
            <RangePicker
              ranges={{
                今天: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                上个星期: [
                  moment()
                    .week(moment().week() - 1)
                    .startOf('week'),
                  moment()
                    .week(moment().week() - 1)
                    .endOf('week'),
                ],
                上个月: [
                  moment()
                    .month(moment().month() - 1)
                    .startOf('month'),
                  moment()
                    .month(moment().month() - 1)
                    .endOf('month'),
                ],
              }}
              format="YYYY/MM/DD HH:mm:ss"
              showTime={{
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
              }}
            />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}

RangeDatePicker.propTypes = {
  form: PropTypes.object.isRequired,
  searchByRangeDate: PropTypes.func.isRequired,
};

export default Form.create()(RangeDatePicker);
