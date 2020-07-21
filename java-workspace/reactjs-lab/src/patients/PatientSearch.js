import React, {useState} from 'react';
import {Select } from 'antd';

import {searchPatient} from '../services/patientService';

const { Option } = Select;

export default function PatientSearch () {
  const [value, setValue] = useState();
  const [patients, setPatients] = useState([]);

  const queryPatient = async (name) => {
        
      const pagination = {current: 1, pageSize: 10};
      
      const data =  await searchPatient(name, pagination);

      if (!data)
          return;
      setPatients(data.patients);
  };
    
  const onSearch = searchText => {
    !searchText ? setPatients([]): queryPatient(searchText);
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
        style={{ width: 200 }}
      >
          {patients && patients.map (patient =>
                              <Option key={patient.pid}>{patient.lastName+' ' +patient.firstName}</Option>
          )}
  
      </Select>
    </>
  );
};



