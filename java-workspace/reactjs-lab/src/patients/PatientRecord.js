import React from 'react';
import {useParams} from 'react-router-dom';

import { Tabs } from 'antd';

import {Synthesis, Historic, 
        Biometrics, PatientInfos} from '../patients';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


export default function PatientRecord () {
  let {id} = useParams(); // Patient ID
  
  const tabs = [
    {name:'Infos', src: PatientInfos},
    {name:'Synthese', src: Synthesis},
    {name:'Historique', src: Historic},
    {name:'Antécédents', src: Historic},
    {name:'Biométrie', src: Biometrics},
    {name:'Traitements', src: Synthesis},
    {name:'Vaccins', src: Synthesis},
    {name:'Documents', src: Synthesis},
    {name:'Analyses', src: Synthesis},
    {name:'Finances', src: Synthesis},
  ];
  
  const tabPanes = tabs.map((item, index) => 
        <TabPane tab={item.name} key={index}>
           {<item.src id={id}/>}
        </TabPane>);
        
	return (
    <>
  
      <Tabs defaultActiveKey="0" 
             onChange={callback}
             tabPosition='left'
             type="card">

        {tabPanes}

      </Tabs>
    </>
	)
}
