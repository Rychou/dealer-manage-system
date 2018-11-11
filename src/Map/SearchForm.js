import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { func, object } from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
      fetchMapData,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      fetchMapData(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const unitSelector = getFieldDecorator('useUnit', {
      initialValue: '全部公司',
      rules: [
        {
          require: false,
          message: '请输入公司名称！',
        },
      ],
    })(
      <Select>
        <Option value="全部公司">全部公司</Option>
        <Option value="一公司">一公司</Option>
      </Select>,
    );
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('selfNum', {
              rules: [
                {
                  require: false,
                  message: '请输入车辆自编号！',
                },
              ],
            })(
              <Input
                addonBefore={unitSelector}
                suffix={<Button icon="search" type="primary" htmlType="submit" />}
                placeholder="车辆自编号"
                className="search-form-selfNum"
              />,
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  fetchMapData: func,
  form: object,
};

export default Form.create()(SearchForm);
