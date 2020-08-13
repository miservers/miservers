import React from 'react';
import {useParams} from 'react-router-dom';
import { Tabs } from 'antd';
import { useMediaQuery } from 'react-responsive';
import {Synthesis, Historic, Allergies,
        Biometrics, Infographics, Medications, Vaccines} from '../patients';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


export default function PatientRecord () {
  let {pid} = useParams(); // Patient ID
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  
  const tabs = [
    {name:'Infos', src: Infographics},
    {name:'Synthese', src: Synthesis},
    {name:'Traitements', src: Medications},
    {name:'Antécédents', src: Historic},
    {name:'Allergies', src: Allergies},
    {name:'Vaccines', src: Vaccines},
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
  
      <Tabs defaultActiveKey="5" 
             onChange={callback}
             tabPosition={isTabletOrMobile?'top':'left'}
             type="card">

        {tabPanes}

      </Tabs>
    </>
	)
}
