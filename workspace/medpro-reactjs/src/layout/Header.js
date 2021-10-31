import React, {useState} from 'react';
import { Avatar,  Layout, Space, Row, Col} from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {PatientAdd, PatientSearch} from '../patients';
import {PatientIcon, WaitingRoomIcon, AppointmentIcon} from '../icons';
import '../css/MedLayout.less';


export default function Header ({menuCollapsed, toggleMenu}) {
 
  const MenuFold = (props) => 
          (menuCollapsed) 
              ? <MenuUnfoldOutlined {...props} className='trigger' onClick={toggleMenu}/>
              : <MenuFoldOutlined {...props} className='trigger' onClick={toggleMenu} />;
  
  return (
      <Row gutter={8} 
           justify="space-around" 
           align="top" 
           className='header'>
        <Col span={2}>
          <MenuFold />
        </Col>
        
        <Col span={2} >
          <Link to="/waitingroom" >
            <Avatar shape="square" size="default" src={WaitingRoomIcon} />
          </Link>
        </Col>
       
        <Col span={2} >
          <Link to="/appointment" >
            <Avatar shape="square" size="default" src={AppointmentIcon} />
          </Link>
        </Col>
       
        <Col span={2} >
          <Link to="/patients" >
            <Avatar shape="square" size="default" src={PatientIcon} />
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
          
  );
}