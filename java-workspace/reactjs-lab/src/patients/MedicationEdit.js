import PropTypes from 'prop-types';
import moment from "moment";
import React, {useState, useEffect} from 'react';
import { 
  Form, Input, Button, Radio, Divider,
  notification, DatePicker, Row, Col} from 'antd';
import {Modal} from '../components';
import {EditFilled, DeleteFilled, PlusSquareTwoTone} from '@ant-design/icons';
import {createMedication, updateMedication} from '../services';
import {SEVERITY, dateFormat} from '../constants/Constants'

const { TextArea } = Input;

const ACTION_EDIT = 'edit'
const ACTION_ADD =  'add'
 
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

function MedicationEdit ({pid, action=ACTION_EDIT, medication, refresh}) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
 
 
  const showDialog = () => {
    if (action == ACTION_EDIT){
      const startedTaking = (medication.startedTaking)?moment(medication.startedTaking):'';
      const endTaking = (medication.endTaking)?moment(medication.endTaking):'';
      form.setFieldsValue({...medication, startedTaking: startedTaking, endTaking: endTaking});
    }
    else if (action == ACTION_ADD)
      form.setFieldsValue({});
      
    setVisible(true);
    
  }
  
  const severities = Object.keys(SEVERITY).map(key => ({label: SEVERITY[key], value: key}))
  
  const onOk =  () => {
            form.validateFields()
                .then(fieldsValue => {
                       //form.resetFields(); 
                       const newMedication = {...medication, pid: pid, ...fieldsValue};
                       console.log(newMedication)
                       if (action == ACTION_ADD)
                          createMedication(newMedication);
                       else if (action == ACTION_EDIT)
                          updateMedication(newMedication);                                                                                                                   
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
  
  const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current >= moment().endOf('day');
  } 
   
  return (
    <>
       {(action==ACTION_EDIT)
          ?<EditFilled onClick={showDialog}/>
          :<PlusSquareTwoTone  onClick={showDialog} style={{fontSize: 24}}/>
       }     
        <Modal
            title="Medication"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Annuler"
            okText={(action==ACTION_ADD)?'Ajouter':'Save'}
          >

            <Form
                {...layout}
                form={form}
                name="Nouvelle Medication"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{paddingTop: '4px', }}
              >
                 <Item label="Medicament" name={['drug','name']}  rules={[required,]} >
                    <Input />
                 </Item>
                
                 <Item label="Dose" name="dose" rules={[required,]}>
                    <Input />
                 </Item>
                 
                 <Item label="Frequency" name="frequency" rules={[required,]}>
                    <Input />
                 </Item>

                
   
                 <Item label="Date debut" name="startedTaking">
                    <DatePicker format={dateFormat} placeholder={dateFormat} disabledDate={disabledDate}/>
                 </Item>

                 <Item label="Date fin" name="endTaking">
                    <DatePicker format={dateFormat} placeholder={dateFormat}/>
                 </Item>


                <Item label="Notes" name="notes">
                  <TextArea  span={4}/>
                </Item>
                
            </Form>
         </Modal>
      </>
    )
               
 }
 
 MedicationEdit.propTypes = {
  pid: PropTypes.string,
  action: PropTypes.oneOf([ACTION_ADD, ACTION_EDIT]),
  medication: PropTypes.object,
  refresh: PropTypes.func
};

export default  MedicationEdit;


