import React from 'react';
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value.format('YYYY-MM-DD'), mode);
}


export default function Appointment () {
	
	return (
    <>
      <Calendar onPanelChange={onPanelChange} />
    </>	
	);
}

