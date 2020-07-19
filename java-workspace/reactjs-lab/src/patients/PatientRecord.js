import React from 'react';
import {useParams} from 'react-router-dom';

import { Tabs } from 'antd';

import {Synthesis, Historic, Allergies,
        Biometrics, PatientInfos, } from '../patients';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


export default function PatientRecord () {
  let {pid} = useParams(); // Patient ID
  
  const tabs = [
    {name:'Infos', src: PatientInfos},
    {name:'Synthese', src: Synthesis},
    {name:'Traitements', src: Synthesis},
    {name:'Antécédents', src: Historic},
    {name:'Allergies', src: Allergies},
    {name:'Vaccinations', src: Synthesis},
    {name:'Historique', src: Historic},
    {name:'Biométrie', src: Biometrics},
    {name:'Documents', src: Synthesis},
    {name:'Analyses', src: Synthesis},
    {name:'Finances', src: Synthesis},
  ];
  
  const tabPanes = tabs.map((item, index) => 
        <TabPane tab={item.name} key={index}>
           {<item.src pid={pid}/>}
        </TabPane>);
        
	return (
    <>
  
      <Tabs defaultActiveKey="4" 
             onChange={callback}
             tabPosition='left'
             type="card">

        {tabPanes}

      </Tabs>
    </>
	)
}
