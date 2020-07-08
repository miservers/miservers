import React, {useState} from 'react';
import { Input, Avatar,  Layout, 
         Row, Col  } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Icon from '@ant-design/icons';
import Menu from './Menu';

import '../css/MedLayout.less';

const { Header, Sider, Content } = Layout;
const { Search } = Input;



export default function MedLayout () {
  
  const [collapsed, setCollapsed] = useState(false);
  
  const toggle = () => setCollapsed(!collapsed);
  
  const MenuFold = () => 
          collapsed ? <MenuUnfoldOutlined className='trigger' onClick={toggle} />
                    : <MenuFoldOutlined className='trigger' onClick={toggle} />;
                              
  
  return (
    <>
     
    <Layout  className="site-layout">

        <Menu collapsed={collapsed}/>
                
        <Layout>
          <Header className="header">
          
                <MenuFold />
                
                <Search placeholder="chercher un patient" 
                      onSearch={value => console.log(value)} 
                      size='middle'
                      className='search'
                      enterButton />
         
                <Avatar size={32} icon={<UserOutlined/>} />
                
           </Header>
            
            <Content
              className="content"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              Content
            </Content>
        </Layout>

    </Layout>
    </>
  );
  
};