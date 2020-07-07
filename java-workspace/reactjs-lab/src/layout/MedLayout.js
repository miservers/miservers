import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { Input } from 'antd';
import { Row, Col } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import '../css/MedLayout.css';

const { Header, Sider, Content } = Layout;
const { Search } = Input;



export default function MedLayout () {
  
  const [collapsed, setCollapsed] = useState(true);
  
  const toggle = () => setCollapsed(!collapsed);
  
  const MenuFold = () => 
          collapsed ? <MenuUnfoldOutlined className='trigger' onClick={toggle} />
                    : <MenuFoldOutlined className='trigger' onClick={toggle} />;
                              
  
  return (
    <>
     
    <Layout>
      <Sider trigger={null} 
             collapsible
             collapsedWidth={0}
             collapsed={collapsed}
             >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
            </Menu>
        </Sider>
        
        <Layout className="site-layout">
          <Header className="header">
                <MenuFold />
                
                <Search placeholder="chercher un patient" 
                      onSearch={value => console.log(value)} 
                      size='middle'
                      className='search'
                      enterButton />
         
                <UserOutlined />
                
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