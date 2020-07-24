import React ,{useState, useEffect} from 'react';
import { notification, Descriptions, 
         Card,Avatar, Typography } from 'antd';

import {fetchPatientById} from '../services/patientService';
import {GENDER} from '../constants/Constants'

const { Title } = Typography;

export default function Infographics ({pid}) {
  const [patient, setPatient] = useState({address:{}, picture: {}});
  const [picture, setPicture] = useState({});
  
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
          <Descriptions.Item label={<b>{item.label}</b>}>{item.content}</Descriptions.Item>
  );
    
  return (
   <div style={{padding: '2px', background: '#ececec'}}>
    <Card>
      
      <Card.Grid hoverable={false} style={{width: '30%', textAlign: 'left'}}>
         <Card.Meta 
              avatar={<Avatar size={92} shape='square' src={"data:image/png;base64," + patient.picture.blob}/>}
              title={<Title level={3}>{patient.firstName+' '+patient.lastName} </Title>}
              description={GENDER[patient.gender] + '. Age: '+patient.age}
              />
      </Card.Grid>  
       
      <Card.Grid hoverable={false} style={{width: '70%', textAlign: 'left'}}>
         <Descriptions>
            {items}
          </Descriptions>
      </Card.Grid>
      
     </Card>
    </div>
    
  );
}
