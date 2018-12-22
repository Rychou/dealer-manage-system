import {
  Modal, Form, Input, Icon,
 } from 'antd';
 import React, { Component } from 'react';

 const FormItem = Form.Item;

 export default Form.create()(
   // eslint-disable-next-line
   class extends Component {
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
   },
 );
