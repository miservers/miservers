import React, {useState} from 'react';
import {Select } from 'antd';

import {API_PATIENT_SEARCH} from '../Config';



const { Option } = Select;

export default function PatientSearch () {
  const [value, setValue] = useState();
  const [patients, setPatients] = useState([]);

  const searchPatient = async (name) => {
        
        let url = API_PATIENT_SEARCH;
        
        url += '?pageNo=0'  +
               '&pageSize=10';
          
        url += '&criteria=' + name;
            
        console.log(url);
        
        const response = await fetch(url);
        const data     = await response.json();

        setPatients(data.patients);
  };
    
  const onSearch = searchText => {
    !searchText ? setPatients([]): searchPatient(searchText);
  };

  const onSelect = data => {
    console.log('onSelect ', data);
  };

  const onChange = data => {
    setValue(data);
  };

  return (
    <>
      <Select
        showSearch
        allowClear
        value={value}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={null}
        size='middle'
        className='search'
        placeholder="chercher un patient"
      >
          {patients.map (patient =>
                              <Option key={patient.id}>{patient.lastName+' ' +patient.firstName}</Option>
          )}
  
      </Select>
    </>
  );
};



