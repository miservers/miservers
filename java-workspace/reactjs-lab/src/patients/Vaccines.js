import React, {useState, useEffect} from 'react';
import { Table, Space,Popconfirm,Typography, 
         Button,  } from 'antd';

import {DeleteFilled} from '@ant-design/icons';

import '../css/Table.css';
 
import VaccineEdit from './VaccineEdit';
import {SEVERITY} from '../constants/Constants'

import {fetchVaccines, deleteVaccine} from '../services';

export default function Vaccines ({pid}) {
  const [vaccines, setVaccines]     = useState([]); //vaccines=[] empty table
  const [loading, setLonding]         = useState(false);
  
  useEffect( () => { 
    async function fetchData () {
      await _fetchVaccines();      
    }
    fetchData();
    }, []);
  
  const _fetchVaccines =  async () => {
        
        setLonding(true);
        
        const data = await fetchVaccines(pid);
        
        setLonding(false);

        setVaccines(data);
 
  };
      
  const onChange = async () => {
      await _fetchVaccines(pid);   
  };
        
  const handleDelete = async (vaccine) => {
    await  deleteVaccine(vaccine.id);
                  
    await _fetchVaccines(pid);       
  }
  
  const columns = [
     {
      title: 'Date',
      dataIndex: 'actDate',
    },
    {
      title: 'Vaccine',
      dataIndex: 'name',
    },
    {
      title: 'Categorie',
      dataIndex: 'category',
    },
    {
      title: 'Lot',
      dataIndex: 'lot',
    },
    {
      title: 'Rappel',
      dataIndex: 'reminder',
    },
    {
      title: 'Notes',
      dataIndex: 'comments',
    },
   {
      render: (vaccine) => (
        <Space size="middle">
          <VaccineEdit pid={pid} action='edit' vaccine={vaccine}  refresh={_fetchVaccines}/>

          <Popconfirm title="Assurez-vous de supprimer cet enregistrement?" onConfirm={()=>handleDelete(vaccine)}>       
            <DeleteFilled />
          </Popconfirm>
        </Space>
      ),
    },

  ];
    
  return (
    <>
      <Space align="baseline">
        <Typography.Title level={4}> Vaccines </Typography.Title>
        <VaccineEdit pid={pid} action='add' refresh={_fetchVaccines}/>
      </Space>
          
      <Table
        columns={columns}
        dataSource={vaccines}
        rowKey= {(vaccine) => vaccine.id}
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
