import React, {useState} from 'react';

import { Form, Input, Button , Modal, Radio, Divider} from 'antd';

import {createPatient} from '../services/patientService';


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function PatientAddDialog () {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  
  const showDialog = (event) => setVisible(true);
  
  const onOk = () => {
            form.validateFields()
                .then(values => {
                       //form.resetFields(); 
                       createPatient(values); 
                       
                    })
                .catch (info => console.log("validation failed: "+info));
               
  }
  
  const onCancel = () => setVisible(false);
  
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
            closable
            centered
            maskClosable={false}
          >

            <Form
                {...layout}
                form={form}
                name="Nouveau patient"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Prenom" name="firstName" initialValue={'khaled'} rules={[required,]} >
                  <Input />
                </Form.Item>
            
                <Form.Item label="Nom" name="lastName" initialValue={'jilali'} rules={[required,]} >
                  <Input />
                </Form.Item>

                <Form.Item label="Sex"  name="sex" >
                  <Radio.Group name="sex">
                      <Radio value={'Male'}>Homme</Radio>
                      <Radio value={'Female'}>Femme</Radio>
                    </Radio.Group>
                </Form.Item>  
                
                <Form.Item label="CIN" name="cin" >
                  <Input />
                </Form.Item>

                <Divider/>

                <Form.Item label="Addresse">
                  <Input.Group compact>
                    <Form.Item  name={['address', 'address']} noStyle>
                      <Input placeholder="Addresse" style={{ width: '100%' }}/>
                    </Form.Item>
                    <br/>
                    <Form.Item  name={['address', 'zipCode']} noStyle>
                      <Input placeholder="Code Postal" style={{ width: '50%', marginTop: '8px', marginRight: '2%' }}/>
                    </Form.Item>
    
                    <Form.Item label="Ville" name={['address', 'city']} noStyle>
                      <Input placeholder="Ville" style={{ width: '48%', marginTop: '8px',}}/>
                    </Form.Item>
    
                  </Input.Group>      
                </Form.Item>  
                <Divider/>

                <Form.Item label="Telephone" name="cellPhone" >
                  <Input />
                </Form.Item>

                <Form.Item label="E-mail" name="email" >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                  Submit
                  </Button>
                </Form.Item>
            </Form>
         </Modal>
      </>
    )
               
 }