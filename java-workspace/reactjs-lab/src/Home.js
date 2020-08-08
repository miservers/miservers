import React from 'react';
import { Row, Col, Button, Avatar } from 'antd';
import { Link } from "react-router-dom";

import {PatientIcon, AppointmentIcon, AccountingIcon, 
        WaitingRoomIcon, DrugsIcon, UsersIcon} from './icons';

const styles = {button:{width: '100%', 
                        height: '128px', 
                        transition: 'all 0.1s ease-in',
                        "&:hover": {
                                    background: "#efefef"
                                    },
                        }};

export default function Home () {
	
  const colspan=4;
  
  const buttons = [{title: 'Patient',         icon: PatientIcon,     href: '/patients'},
                   {title: "Salle d'attente", icon: WaitingRoomIcon, href: '/waitingroom'}, 
                   {title: 'Rendez-vous',     icon: AppointmentIcon, href: '/appointment'},
                   {title: 'Medicaments',     icon: DrugsIcon,       href: '/drugs'},
                   {title: 'Comptabilite',    icon: AccountingIcon,  href: '/accounting'},
                   {title: 'Utilisateurs',    icon: UsersIcon,       href: '/users'}];
    
  const cols = buttons.map((button) => 
                  <Col className="gutter-row" span={colspan} key={button.title} >
                        <Button type="primary" style={styles.button} >
                          <Link to={button.href} >
                            <Avatar shape="square" size="large" src={button.icon} /><br/>
                            {button.title}
                          </Link>
                        </Button>
                   </Col>
              );
                    
  
	return (
    <>
  		<Row gutter={[8,8]} justify='center' style={{paddingTop:'10%'}}>
        {cols.slice(0,3)}
      </Row>
  
      <Row gutter={[8,8]} justify='center'>
        {cols.slice(3,cols.length)}
      </Row>
    </>
	);
}















