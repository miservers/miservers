import React, {useState, useEffect} from 'react';
import { Table, Space,Popconfirm,Typography, 
         Button,  } from 'antd';
import moment from 'moment';
import {DeleteFilled} from '@ant-design/icons';
import '../css/Table.css';
import MedicationEdit from './MedicationEdit';
import {STATUS, dateFormat} from '../constants/Constants'

import {fetchMedications, deleteMedication} from '../services';

export default function Medications ({pid}) {
  const [medications, setMedications]     = useState([]); //medications=[] empty table
  const [loading, setLonding]         = useState(false);
  
  useEffect( () => { 
    async function fetchData () {
      await _fetchMedications();      
    }
    fetchData();
    }, []);
  
  const _fetchMedications =  async () => {
        
        setLonding(true);
        
        const data = await fetchMedications(pid);
        
        setLonding(false); console.log(data)

        setMedications(data);
 
  };
      
  const onChange = async () => {
      await _fetchMedications(pid);   
  };
        
  const handleDelete = async (medication) => {
    await  deleteMedication(medication.id);
                  
    await _fetchMedications(pid);       
  }
  
  const columns = [
    {
      title: 'Actions',
      render: (medication) => (
        <Space size="middle">
          <MedicationEdit pid={pid} action='edit' medication={medication}  refresh={_fetchMedications}/>

          <Popconfirm title="Assurez-vous de supprimer cet enregistrement?" onConfirm={()=>handleDelete(medication)}>       
            <DeleteFilled />
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Medicament',
      render: (value, row, index) => <>{row.drug.name}</> 
    },
    {
      title: 'Posologie',
      render: (value, row, index) => <>{row.dose+' '+row.frequency}</> 
    },
    {
      title: 'Status',
      render: (value, row, index) => <>{STATUS[row.status]}</> 
    },
    {
      title: 'Prescri le',
      render: (value, row, index) => <>{moment(row.prescribed).format(dateFormat)}</> 
    },
    {
      title: 'Debut de prise',
      render: (value, row, index) => <>{moment(row.startedTaking).format(dateFormat)}</> 
    },
    {
      title: 'Fin de prise',
      render: (value, row, index) => <>{moment(row.endTaking).format(dateFormat)}</> 
    },  
    {
      title: 'Notes',
      dataIndex: 'notes'
    },  
  ];
    
  return (
    <>
      <Space align="baseline">
        <Typography.Title level={4}> Traitements </Typography.Title>
        <MedicationEdit pid={pid} action='add' refresh={_fetchMedications}/>
      </Space>
          
      <Table
        columns={columns}
        dataSource={medications}
        rowKey= {(medication) => medication.id}
        bordered={false}
        pagination={false}
        size="small"
        onChange= {onChange}
        loading={loading}
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
      />
    </>
  );
}
