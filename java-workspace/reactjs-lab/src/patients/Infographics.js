import React ,{useState, useEffect} from 'react';
import { notification, Descriptions, 
         Card,Avatar, Typography, Row, Col} from 'antd';

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
    <Row style={{textAlign: 'left'}}>      
      <Col xs={24} lg={4}>
          <Card
            size='small'
            cover={<img src={"data:image/png;base64," + patient.picture.blob} style={{width:140, height:100}}/>}
            >
             <Card.Meta 
                title={<Title  level={4}>{patient.firstName+'  '+patient.lastName}</Title>}
                description={GENDER[patient.gender] + '. Age: '+patient.age}
                />
         </Card>
      </Col>  
       
      <Col xs={24} lg={20}>
         <Descriptions>
            {items}
          </Descriptions>
      </Col>          
     </Row> 
    
  );
}
