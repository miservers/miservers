import React, {useState, useEffect} from 'react';
import { Table, Space } from 'antd';
import {Link} from "react-router-dom";

import PatientRecordSvg from '../images/PatientRecord.svg';

import {API_PATIENT} from '../Config';

export default function Patient () {
	const [patients, setPatients]       = useState([]); //patients=[] empty table
  const [pagination, setPagination]   = useState({current: 1, pageSize: 10, total:0, });
  const [loading, setLonding]         = useState(false);
  
  useEffect(() => {
     fetchData(pagination);
  }, []);
  
  const fetchData = async (pagination) => {
        
        let url = API_PATIENT;
        
        url += '?pageNo=' + (pagination.current-1) +
               '&pageSize=' + pagination.pageSize;
          
        if (pagination.orderBy)
          url += '&sortBy=' + pagination.orderBy.field +
                 '&sortDirection=' + pagination.orderBy.orderDirection;
      
        if(pagination.search) 
          url += '&criteria=' + pagination.search;
            
        console.log(url);
        
        setLonding(true);
        const response = await fetch(url);
        const data     = await response.json();

        setPatients(data.patients);
        setPagination({...pagination, total: data.totalCount});
        setLonding(false);
  };
      
  const onChange = (pagination) => {
      fetchData(pagination);     
  };
        
  const columns = [
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
      title: 'Fiche',
      render: (record) => (
        <Space size="middle">
          <Link to={'/patient/record/' + record.id}>
            <img src={PatientRecordSvg} alt="Fiche patient"/>
          </Link>
        </Space>
      ),
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
