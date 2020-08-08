import React, {useState, useEffect} from 'react';
import { Table, Space } from 'antd';
import {Link} from "react-router-dom";

import {PatientRecordIcon} from '../icons';


import {fetchPatients} from '../services';

import '../css/Table.css';


export default function Patients () {
	const [patients, setPatients]       = useState([]); //patients=[] empty table
  const [pagination, setPagination]   = useState({current: 1, pageSize: 10, total:0, });
  const [loading, setLonding]         = useState(false);
  
  useEffect(() => {
     _fetchPatients(pagination);
  }, []);
  
  const _fetchPatients =  async (pagination) => {
        
        setLonding(true);
        
        const data = await fetchPatients(pagination);
        
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
          <Link to={'/patients/record/' + record.pid} >
            <img src={PatientRecordIcon} alt="Fiche patient"/>
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
    <>    
  		<Table
        columns={columns}
        dataSource={patients}
        pagination={{...pagination, showQuickJumper:true, position:['bottomCenter']}}
        rowKey= {(record) => record.pid}
        bordered={false}
        size="small"
        onChange= {onChange}
        loading={loading}
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
      />
    </>
	);
}
