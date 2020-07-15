import React, {useState} from 'react';
import { Avatar,  Layout} from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {BrowserRouter as Router, Link} from "react-router-dom";

import Menu from './Menu';
import {PatientAdd, PatientSearch} from '../patients';
import Routes from '../routes/Routes';



import Logo      from '../images/logo.png';

import '../css/MedLayout.less';


const { Header, Content } = Layout;


export default function MedLayout () {
  
  const [collapsed, setCollapsed] = useState(true);
  
  const toggle = () => setCollapsed(!collapsed);
  
  const MenuFold = () => 
          collapsed ? <MenuUnfoldOutlined className='trigger' onClick={toggle}/>
                    : <MenuFoldOutlined className='trigger' onClick={toggle} />;
                              
  
  return (
    <>
     
   <Router>

    <Layout  className="site-layout">

        <Menu collapsed={collapsed}/>
                
        <Layout>
          <Header className="header">
          
                <MenuFold />
              
                <Link to="/" style={{display: 'flex', alignItems: 'flex-start'}}>
                  <Avatar shape="square" size="large" src={Logo} />
                </Link>
              
                
                <PatientSearch />
                
                <PatientAdd />
                   
                <Avatar size={32} icon={<UserOutlined/>} />
           
           </Header>
            
            <Content className="content" >
            
                <Routes />
                 
            </Content>
        </Layout>

     </Layout>
   </Router>          
   </>
  );
  
};