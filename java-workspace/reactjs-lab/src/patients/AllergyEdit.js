import PropTypes from 'prop-types';
import moment from "moment";
import React, {useState, useEffect} from 'react';

import { 
  Form, Input, Button , Modal, Radio, Divider,
  notification, DatePicker, Row, Col} from 'antd';

import {EditFilled, DeleteFilled, PlusSquareTwoTone} from '@ant-design/icons';

import {createAllergy, updateAllergy} from '../services/allergyService';

import {dateFormat} from '../Config';

const { TextArea } = Input;


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  size: 'middle',
};

const Item = (props) =>
        <Form.Item {...props} style={{marginBottom: "8px" }}>{props.children}</Form.Item>

function AllergyEdit ({pid, action, allergy, refresh}) {
  const [visible, setVisible] = useState(false);
  const [fields, setFields]   = useState({});
  const [form] = Form.useForm();
  
  const showDialog = () => {
    setVisible(true);
    if (action == 'edit') {
      const beginDate = (allergy.beginDate)?moment(allergy.beginDate):'';
      const endDate = (allergy.endDate)?moment(allergy.endDate):'';
      setFields({...allergy, beginDate: beginDate, endDate: endDate});
    }
  }
  
  const onOk = async () => {
            form.validateFields()
                .then(fieldsValue => {
                       //form.resetFields(); 
                       const newAllergy = {...allergy, pid: pid, ...fieldsValue};
                       if (action == 'add')
                          createAllergy(newAllergy);
                       else if (action == 'edit')
                          updateAllergy(newAllergy);                                                                                                                   
                    })
                 .then (()=>{
                      setVisible(false);
                      form.resetFields();
                      refresh();
                  })
               
  }
  
  
  
  const onCancel = () => {form.resetFields(); setVisible(false)};
  
  const onFinish = (values) => alert("onFinish")
  
  const onFinishFailed = () => alert("onFinishFailed")
  
  const required = () => ({required:true, message: 'champ obligatoire'})
    
  return (
    <>
       {(action=='edit')
          ?<EditFilled onClick={showDialog}/>
          :<PlusSquareTwoTone  onClick={showDialog} style={{fontSize: 24}}/>
       }     
        <Modal
            title="Nouvelle Allergy"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Annuler"
            okText={(action=='add')?'Ajouter':'Save'}
            closable
            centered
            maskClosable={false}
            destroyOnClose={true}
          >

            <Form
                {...layout}
                form={form}
                name="Nouvelle Allergy"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{paddingTop: '4px', }}
                initialValues={fields}
              >
                 <Item label="Substance" name="substance"  rules={[required,]} >
                    <Input />
                 </Item>
                
                 <Item label="Reaction" name="reaction" rules={[required,]}>
                    <Input />
                 </Item>
                 
                 <Item label="Severity" name="severity" rules={[required,]}>
                    <Input />
                 </Item>

                 <Item label="Occurence" name="occurence">
                    <Input />
                 </Item>

                 <Item label="Status" name="status">
                    <Input />
                 </Item>
   
                 <Item label="Date de début" name="beginDate">
                    <DatePicker format={dateFormat} placeholder={dateFormat}/>
                 </Item>

                 <Item label="Date de fin" name="endDate">
                    <DatePicker format={dateFormat} placeholder={dateFormat}/>
                 </Item>


                 <Item label="Référencé par" name="referredBy">
                    <Input />
                 </Item>
  
                <Item label="Comments" name="comments">
                  <TextArea  span={4}/>
                </Item>
                
            </Form>
         </Modal>
      </>
    )
               
 }
 
 AllergyEdit.propTypes = {
  pid: PropTypes.string,
  action: PropTypes.oneOf(['add', 'edit']),
  allergy: PropTypes.object,
  refresh: PropTypes.func
};

export default  AllergyEdit;


