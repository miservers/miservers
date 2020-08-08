import React from 'react';
import { Avatar,  Layout,  Menu as AntMenu} from 'antd';



import { Link } from "react-router-dom";

import {PatientIcon, AppointmentIcon, AccountingIcon, 
        WaitingRoomIcon, DrugsIcon, UsersIcon, Logo } from '../icons';
        
import '../css/MedLayout.less';

const { Sider} = Layout;



export default function Menu (props) {
  
  const {collapsed} = props;
 
  //const icons = [{PatientIcon}, WaitingRoomIcon, AppointmentIcon, DrugsIcon, AccountingIcon];
  const icons = [{title: 'Patient',         icon: PatientIcon,     href: '/patients'},
                 {title: "Salle d'attente", icon: WaitingRoomIcon, href: '/waitingroom'}, 
                 {title: 'Rendez-vous',     icon: AppointmentIcon,  href: '/appointment'},
                 {title: 'Medicaments',     icon: DrugsIcon,       href: '/drugs'},
                 {title: 'Comptabilite',    icon: AccountingIcon,  href: '/accounting'}];
  
  const items = icons.map((item,index) => <AntMenu.Item 
                                              key={index}
                                              icon={<Avatar shape="square" size="large" src={item.icon} />}
                                          >
                                            {item.title}
                                            <Link to={item.href} />
                                          </AntMenu.Item>
                         );
  
  return (
    <Sider trigger={null} 
       collapsible
       collapsedWidth={0}
       collapsed={collapsed}
       className='sider'
       >
      <div className="logo">
        <Link to="/">
          <Avatar shape="square" size="large" src={Logo} />
        </Link>
      </div>
      <AntMenu mode="inline" 
               defaultSelectedKeys={['0']}
               className='menu'
               >
               
        {items}
       
        <AntMenu.Divider />
      </AntMenu>
    </Sider>  
  );
  
}