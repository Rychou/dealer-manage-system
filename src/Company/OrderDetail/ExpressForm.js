import {
  Modal, Form, Input, Icon,
} from 'antd';
import React, { Component } from 'react';
import { bool, object, func } from 'prop-types';

const FormItem = Form.Item;

class expressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="关联物流单号"
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="物流单号">
            {getFieldDecorator('expressNumber', {
              rules: [{ required: true, message: '请输入物流单号！' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="物流单号"
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

expressForm.propTypes = {
  form: object,
  onCancel: func,
  onCreate: func,
  visible: bool,
};

export default Form.create()(expressForm);
