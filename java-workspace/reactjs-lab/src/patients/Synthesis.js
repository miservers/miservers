import React, {useState, useEffect} from 'react';
import {Card, Timeline,  Row, Col, List} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import {fetchAllergies, fetchMedications, fetchLastMeasureByName} from '../services';

const cellStyle = {
  border: 'solid 0px lightgrey',
  padding: '8px', 
  textAlign: 'left',
  
}

const hdrStyle = {
  background:'lightblue', padding: '8px', margin: '0px'
}

const h = 492;

export default function Synthesis ({pid}) {
  const [allergies, setAllergies]     = useState([]); //allergies=[] empty table
  const [medications, setMedications] = useState([]); //allergies=[] empty table
  const [measures, setMeasures] = useState([]); //Tall, weight,
  const [loading, setLonding]         = useState(false);

  useEffect( () => { 
    async function fetchData () {
        const allergies = await fetchAllergies(pid);
        setAllergies(allergies);

        const medications = await fetchMedications(pid);
        setMedications(medications);
        
        ['SYS', 'DIA', 'PUL', 'Poids'].map(async(measure) => {
                  let metric = await fetchLastMeasureByName(pid, measure);
                  
                  if (metric == null) 
                    metric = {measure:{name:measure, unit:''}, value:'-'}
                    
                  setMeasures(measures=>[...measures, metric]);      
                  });
      
    }
    setLonding(true);
    fetchData();
    setLonding(false);
  }, []);
  
   
  return (
      <Row>
        <Col xs={24} sm={24} md={24} lg={12}  style={{...cellStyle, minHeight: h, background: 'white' }}>
            <h2 style={hdrStyle}>Historique</h2>
            <Timeline style={{marginTop: '16px'}}>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                Technical testing 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                Technical testing 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>,
        </Col>
        
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row style={{minHeight: h}}>
            <Col xs={24} sm={24} md={24} lg={24} style={{...cellStyle, background: 'white'}} >
                <h2 style={hdrStyle}>Traitements en cours</h2>
                <List
                  size="small"
                  dataSource={medications}
                  renderItem={medic => <List.Item colStyle={{listStyleType: 'square'}}>{' - '+medic.drug.name+', '+medic.dose+' '+medic.frequency}</List.Item>}
                  loading={loading}
                  split={false}
                  style={{padding:'0px'}}
                />
            </Col>
            <Col xs={24} sm={12}  md={12} lg={12} style={{...cellStyle, background: 'white'}}>
                {<h2 style={hdrStyle}>Mesures</h2>}
                <List
                  size="small"
                  dataSource={measures}
                  renderItem={metric => <List.Item>{'- '+metric.measure.name + ': ' + metric.value + ' ' + metric.measure.unit}</List.Item>}
                  loading={loading}
                  split={false}
                />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} style={{...cellStyle, background: 'white'}}>      
                <h2 style={hdrStyle}>Allergies</h2>
                <List
                  size="small"
                  dataSource={allergies}
                  renderItem={allergy => <List.Item>{'- '+allergy.substance}</List.Item>}
                  loading={loading}
                  split={false}
                />
            </Col>
          </Row>
        
        </Col>
      </Row>
  );
}
