import React, {useState} from 'react';
import { Avatar,  Layout,  Menu as AntMenu} from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Icon from '@ant-design/icons';

import PatientIcon from '../images/Patient_Male.png';
import AppointmentSvg from '../images/Appointment.svg';
import AccountingIcon from '../images/Accounting.svg';
import WaitingRoomIcon from '../images/Waiting_Room.svg';
import DrugsIcon from '../images/Drugs.ico';

import '../css/MedLayout.less';

const { Header, Sider, Content } = Layout;



export default function Menu (props) {
  
  const {collapsed} = props;
 
  const icons = [PatientIcon, WaitingRoomIcon, AppointmentSvg, DrugsIcon, AccountingIcon];
  
  const items = icons.map((item,index) => <AntMenu.Item key={index}  
                                      icon={<Avatar shape="square" size="large" src={item} />} 
                                  />
                         );
  
  return (
    <Sider trigger={null} 
       collapsible
       collapsedWidth={0}
       collapsed={collapsed}
       className='sider'
       >
      <div className="logo" />
      <AntMenu mode="inline" 
               defaultSelectedKeys={['0']}
               className='menu'
               >
               
        {items}
       
      </AntMenu>
    </Sider>  
  );
  
}