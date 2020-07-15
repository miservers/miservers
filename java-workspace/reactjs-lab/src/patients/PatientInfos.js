import React ,{useState, useEffect} from 'react';
import { notification, Descriptions, 
         Card,Avatar, Typography } from 'antd';

import {fetchPatientById} from '../services/patientService';

const { Title } = Typography;

export default function PatientInfos ({id}) {
  const [patient, setPatient] = useState({address:{}, picture: {}});
  const [picture, setPicture] = useState({});
  
  useEffect(() => {
     _fetchPatientById(id);
  }, []);
  
  const _fetchPatientById =  async (id) => {
        
        const data = await fetchPatientById(id)
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
  
  const item = (label, content) =>   
          <Descriptions.Item label={<b>{label}</b>}>{content}</Descriptions.Item>;
    
  return (
   <div style={{padding: '2px', background: '#ececec'}}>
    <Card>
      
      <Card.Grid hoverable={false} style={{width: '30%', textAlign: 'left'}}>
         <Card.Meta 
              avatar={<Avatar size={92} shape='square' src={"data:image/png;base64," + patient.picture.blob}/>}
              title={<Title level={3}>{patient.firstName+' '+patient.lastName} </Title>}
              description={'Age '+patient.age}
              />
      </Card.Grid>  
       
      <Card.Grid hoverable={false} style={{width: '70%', textAlign: 'left'}}>
         <Descriptions>
            {item("Telephone", patient.cellPhone)}
            {item("Addresse", patient.address.address+' '+patient.address.city)}
            {item("Ajoute le", patient.creationDate)}
          </Descriptions>
      </Card.Grid>
      
     </Card>
    </div>
    
  );
}
