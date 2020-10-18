import React, {useState} from 'react';
import { 
  Form, Input, Button , Radio, Divider,
  notification, DatePicker} from 'antd';
import {Modal} from '../components';
import {createPatient} from '../services';
import '../css/commons.less';

import {dateFormat} from '../constants/Constants'

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

export default function PatientAdd () {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  const showDialog = () => setVisible(true);
  
  const onOk = async () => {
            form.validateFields()
                .then(fieldsValue => {
                       //form.resetFields(); 
                       const patient = fieldsValue;
                       createPatient(patient)
                       .then(data => {
                          setVisible(false);
                          form.resetFields();
                          notification.info({
                            message: 'Patient cree avec id '+data.pid,
                            placement: 'topLeft',
                          });
                          });                                                                                   
                    });
               
  }
  
  
  const onCancel = () => {form.resetFields(); setVisible(false)};
  
  const onFinish = (values) => alert("onFinish")
  
  const onFinishFailed = () => alert("onFinishFailed")
  
  const required = () => ({required:true, message: 'champ obligatoire'})
  
  return (
    <>
        <Button type="primary" onClick={showDialog}>
              Nouveau patient
         </Button>
            
        <Modal
            title="Noueau Patient"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Annuler"
            okText="Ajouter"
          >

            <Form
                {...layout}
                form={form}
                name="Nouveau patient"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{paddingTop: '4px', }}
              >
                 <Item label="Nom" name="lastName"  rules={[required,]} >
                    <Input />
                 </Item>
                
                 <Item label="Prenom" name="firstName" rules={[required,]}>
                    <Input />
                 </Item>
                 
                 <Item label="Sexe"  name="sex" rules={[required,]}>
                    <Radio.Group name="sex">
                        <Radio value={'Male'}>Homme</Radio>
                        <Radio value={'Female'}>Femme</Radio>
                      </Radio.Group>
                 </Item>  
   
                 <Item label="Date de naissance" name="birthDate">
                    <DatePicker format={dateFormat} placeholder={dateFormat}/>
                 </Item>
                
                 <Item label="Addresse">
                    <Input.Group compact>
                      <Item  name={['address', 'address']} noStyle>
                        <Input placeholder="Addresse" style={{ width: '100%' }}/>
                      </Item>
                      <br/>
                      <Item  name={['address', 'zipCode']} noStyle>
                        <Input placeholder="Code Postal" style={{ width: '50%', marginTop: '8px', marginRight: '2%' }}/>
                      </Item>
      
                      <Item label="Ville" name={['address', 'city']} noStyle>
                        <Input placeholder="Ville" style={{ width: '48%', marginTop: '8px',}}/>
                      </Item>
      
                    </Input.Group>      
                </Item>  
               
                <Item label="Telephone" name="cellPhone" >
                  <Input />
                </Item>
    
                <Item label="E-mail" name="email" >
                  <Input />
                </Item>
    
                <Item label="Notes" name="notes">
                  <TextArea  span={4}/>
                </Item>
                
            </Form>
         </Modal>
      </>
    )
               
 }