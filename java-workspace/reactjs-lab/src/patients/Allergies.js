import React, {useState, useEffect} from 'react';
import { Table, Space, notification,Popconfirm } from 'antd';
import {Link, NavLink, Redirect} from "react-router-dom";

import {EditFilled, DeleteFilled} from '@ant-design/icons';


import {fetchAllergies, deleteAllergy} from '../services/allergyService';

export default function Allergies ({pid}) {
  const [allergies, setAllergies]     = useState([]); //allergies=[] empty table
  const [loading, setLonding]         = useState(false);
  
  useEffect(() => {
     _fetchAllergies();
  }, []);
  
  const _fetchAllergies =  async () => {
        
        setLonding(true);
        
        const data = await fetchAllergies(pid)
                           .catch(err => 
                                notification.error({
                                  message: err.message,
                                  placement: 'topLeft',
                                })); 
        
        setLonding(false);

        setAllergies(data);
 
  };
      
  const onChange = () => {
      _fetchAllergies(pid);   
  };
        
  const handleDelete = (allergy) => {
    deleteAllergy(allergy.id);
    _fetchAllergies(pid);       
  }
  
  const columns = [
    {
      title: 'Actions',
      render: (allergy) => (
        <Space size="middle">
          <EditFilled />
          <Popconfirm title="Assurez-vous de supprimer cet enregistrement?" onConfirm={()=>handleDelete(allergy)}>       
            <DeleteFilled />
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'substance',
      dataIndex: 'substance',
    },
    {
      title: 'reaction',
      dataIndex: 'reaction',
    },
    {
      title: 'severity',
      dataIndex: 'severity',
    },

  ];
    
  return (
    <Table
      columns={columns}
      dataSource={allergies}
      rowKey= {(allergy) => allergy.id}
      bordered={false}
      pagination={false}
      size="middle"
      onChange= {onChange}
      loading={loading}
    />
  );
}
