import React ,{useState, useEffect} from 'react';
import { notification, Descriptions, 
         Card,Avatar, Typography, Row, Col, Space, Divider} from 'antd';

import {fetchPatientById} from '../services';
import {GENDER} from '../constants/Constants'

const { Title, Text , Paragraph} = Typography;

export default function Infographics ({pid}) {
  const [patient, setPatient] = useState({address:{}, picture: {}});

  useEffect(() => {
     _fetchPatientById(pid);
  }, []);
  
  const _fetchPatientById =  async (pid) => {
        const data = await fetchPatientById(pid)
                           .catch(err => 
                              notification.error({
                                message: err.message,
                                placement: 'topLeft',
                              })); 
                              
        console.log(data);                              
        if (!data)
          return;
        setPatient(data);
        //let image = new Image();
        //image.src = URL.createObjectURL(patient.picture.blob);
        //setPicture(image);
   };
  
  const itemsTable = [
    {label: "Ne(e) le", content: patient.birthDate},
    {label: "Numéro du dossier", content: patient.pid},
    {label: "Ajoute le", content: patient.creationDate},
    {label: "Addresse", content: patient.address.address+' '+patient.address.city},
    {label: "Telephone", content: patient.cellPhone},
    {label: "Profession", content: patient.profession},
  ];
  
  const items = itemsTable.map(item =>   
          <Descriptions.Item key={item.label} label={<b>{item.label}</b>}>{item.content}</Descriptions.Item>
  );
    
  return (
    <Row style={{textAlign: 'left', marginTop:'8px'}}>      
      <Col xs={24} lg={4}>
        <img src={"data:image/png;base64," + patient.picture.blob} style={{width:170, height:170}}/>
      </Col>  
       
      <Col xs={24} lg={20}>
         <Text  style={{textTransform: 'capitalize', color:'green', fontSize: 18}}>
              {patient.firstName+'  '+patient.lastName} 
         </Text>
         
         <Divider type='vertical' />
         
         <Text  style={{color: 'green', fontSize: 14}}>
              {'('+GENDER[patient.gender] + ' | '+patient.age+' ans)'} 
         </Text>
         
          <Divider plain/>
         
          <Descriptions>
            {items}
          </Descriptions>
      </Col>          
     </Row> 
    
  );
}
