import React, {useState} from 'react';
import { Layout} from 'antd';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from '../routes/Routes';
import Menu from './Menu';
import Header from './Header'; 
import '../css/MedLayout.less';


const {Content } = Layout;


export default function MedLayout () {
  
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  
  const toggleMenu = () => setMenuCollapsed(!menuCollapsed);
  
  
  return (
    <>
     
   <Router>

    <Layout  className="site-layout">
        
        <Menu collapsed={menuCollapsed}/>
                
        <Layout>
        
            <Header toggleMenu={toggleMenu} menuCollapsed={menuCollapsed}/>
            
            <Content className="content" >
                <Routes />
            </Content>
            
        </Layout>

     </Layout>
   </Router>          
   </>
  );
  
};