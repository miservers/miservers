import React, {useState, useEffect} from 'react';
import { Table, Space,Popconfirm,Typography, 
         Button,  } from 'antd';

import {EditFilled, DeleteFilled} from '@ant-design/icons';

import '../css/Table.css';
 
import AllergyEdit from './AllergyEdit';

import {fetchAllergies, deleteAllergy} from '../services/allergyService';

export default function Allergies ({pid}) {
  const [allergies, setAllergies]     = useState([]); //allergies=[] empty table
  const [loading, setLonding]         = useState(false);
  
  useEffect( () => { 
    async function fetchData () {
      _fetchAllergies();      
    }
    fetchData();
    }, []);
  
  const _fetchAllergies =  async () => {
        
        setLonding(true);
        
        const data = await fetchAllergies(pid);
        
        setLonding(false);

        setAllergies(data);
 
  };
      
  const onChange = async () => {
      await _fetchAllergies(pid);   
  };
        
  const handleDelete = async (allergy) => {
    await  deleteAllergy(allergy.id);
                  
    await _fetchAllergies(pid);       
  }
  
  const handleEdit = async (allergy) => 
            <AllergyEdit pid={pid} action='edit' refresh={_fetchAllergies}/>
  
  
  const columns = [
    {
      title: 'Actions',
      render: (allergy) => (
        <Space size="middle">
          <AllergyEdit pid={pid} action='edit' allergy={allergy}  refresh={_fetchAllergies}/>

          <Popconfirm title="Assurez-vous de supprimer cet enregistrement?" onConfirm={()=>handleDelete(allergy)}>       
            <DeleteFilled />
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Substance',
      dataIndex: 'substance',
    },
    {
      title: 'Reaction',
      dataIndex: 'reaction',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Ocurrence',
      dataIndex: 'ocurrence',
    },
    {
      title: 'Debut',
      dataIndex: 'beginDate',
    },
    {
      title: 'Fin',
      dataIndex: 'endDate',
    },
    {
      title: 'Reference par',
      dataIndex: 'referredBy',
    },
    {
      title: 'Notes',
      dataIndex: 'comments',
    },

  ];
    
  return (
    <>
      <Space align="baseline">
        <Typography.Title level={4}> Allergies </Typography.Title>
        <AllergyEdit pid={pid} action='add' refresh={_fetchAllergies}/>
      </Space>
          
      <Table
        columns={columns}
        dataSource={allergies}
        rowKey= {(allergy) => allergy.id}
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
