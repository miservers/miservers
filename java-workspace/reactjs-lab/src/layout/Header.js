import React, {useState} from 'react';
import { Avatar,  Layout, Space, Row, Col} from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {PatientAdd, PatientSearch} from '../patients';
import Logo      from '../images/logo.png';
import '../css/MedLayout.less';


export default function Header ({menuCollapsed, toggleMenu}) {
 
  const MenuFold = () => 
          (menuCollapsed) 
              ? <MenuUnfoldOutlined className='trigger' onClick={toggleMenu}/>
              : <MenuFoldOutlined className='trigger' onClick={toggleMenu} />;
  
  return (
    <Layout.Header className='header'>

      <Row gutter={8} justify="space-around" align="top">
        <Col span={4}>
          <MenuFold />
        </Col>
        
        <Col span={4} >
          <Link to="/" >
            <Avatar shape="square" size="large" src={Logo} />
          </Link>
        </Col>
        
        <Col span={8} >
          <Space style={{width: '100%'}}>
            <PatientSearch />
            <PatientAdd />
          </Space>   
        </Col>      
        
        <Col span={4}  style={{textAlign:'right'}}>
          <Avatar size={32} icon={<UserOutlined/>} />
        </Col>
      </Row>
    </Layout.Header>
    
  );
}