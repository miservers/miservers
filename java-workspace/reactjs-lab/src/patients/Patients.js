import React, {useState, useEffect} from 'react';
import { Table, Space, notification } from 'antd';
import {Link} from "react-router-dom";

import PatientRecordSvg from '../images/PatientRecord.svg';


import {fetchPatients} from '../services/patientService';

export default function Patients () {
	const [patients, setPatients]       = useState([]); //patients=[] empty table
  const [pagination, setPagination]   = useState({current: 1, pageSize: 10, total:0, });
  const [loading, setLonding]         = useState(false);
  
  useEffect(() => {
     _fetchPatients(pagination);
  }, []);
  
  const _fetchPatients =  async (pagination) => {
        
        setLonding(true);
        
        const data = await fetchPatients(pagination)
                           .catch(err => 
                                notification.error({
                                  message: err.message,
                                  placement: 'topLeft',
                                })); 
        
        setLonding(false);

        if (!data)
          return;
        setPatients(data.patients);
        setPagination({...pagination, total: data.totalCount});

  };
      
  const onChange = (pagination) => {
      _fetchPatients(pagination);     
  };
        
  const columns = [
    {
      title: 'Fiche',
      render: (record) => (
        <Space size="middle">
          <Link to={'/patients/record/' + record.id} >
            <img src={PatientRecordSvg} alt="Fiche patient"/>
          </Link>
        </Space>
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'lastName',
    },
    {
      title: 'Prenom',
      dataIndex: 'firstName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Addresse',
      dataIndex: ['address', 'address'],  
    },
    {
      title: 'Ville',
      dataIndex: ['address', 'city'],  
    },
    {
      title: 'Telephone',
      dataIndex: 'cellPhone',  
    },
  ];
    
	return (
		<Table
      columns={columns}
      dataSource={patients}
      pagination={{...pagination, showQuickJumper:true, position:['bottomCenter']}}
      rowKey= {(record) => record.id}
      bordered={false}
      size="middle"
      onChange= {onChange}
      loading={loading}
    />
	);
}
