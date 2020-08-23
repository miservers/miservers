import React , {useState, useEffect}from 'react';
import moment from 'moment';
import { Descriptions, Typography, Row, Col, Avatar, List,Alert, Space } from 'antd';

import {HeartPulseIcon, PatientMeasuresIcon} from '../icons';
import {fetchLastMeasureByName} from '../services';
import {dateFormat} from '../constants/Constants'
const { Text } = Typography;
const {Item}   = Descriptions;
 
function StyleHTA ({metric}) {
  console.log(metric);
  let warning='';
  if ((metric.measure.name == 'SYS' && metric.value>180) || 
     (metric.measure.name == 'DIA' && metric.value>110))  
    warning = ' HTA severe';
  else if ((metric.measure.name == 'SYS' && metric.value>160) || 
     (metric.measure.name == 'DIA' && metric.value>100))  
    warning = ' HTA stade 2';
  else if ((metric.measure.name == 'SYS' && metric.value>140) || 
     (metric.measure.name == 'DIA' && metric.value>90))  
    warning = ' HTA stade 1';
  else if ((metric.measure.name == 'SYS' && metric.value>130) || 
     (metric.measure.name == 'DIA' && metric.value>80))  
    warning = ' pre HTA';

  return (
     <Space>
      <span>{metric.measure.name + ': ' + metric.value + ' ' + metric.measure.unit}</span>
      {warning?<Alert message={warning} type="warning"  showIcon banner/>:''}
    </Space>
  )
}

export default function Biometrics ({pid}) { 
  const [heartMetrics, setHeartMetrics] = useState([]);
  const [measures, setMeasures] = useState([]); //Tall, weight,
  
  useEffect( () => { 
    async function fetchData () {
      ['SYS', 'DIA', 'PUL'].map(async(measure) => {
                              const metric = await fetchLastMeasureByName(pid, measure);
                              console.log(metric)
                              if (metric) 
                                setHeartMetrics(heartMetrics=>[...heartMetrics, metric]);      
                              });
                               
      ['Poids', 'Taille'].map(async(measure) => {
                              const metric = await fetchLastMeasureByName(pid, measure);
                              if (metric)  
                                setMeasures(measures=>[...measures, metric]);      
                              });
    }
    fetchData();
    }, []);
  
  return (
    <Row style={{textAlign: 'left'}}>
      <Col xs={1}>
        <Avatar src={HeartPulseIcon} />
      </Col>
      <Col lg={6}>
        <List
          itemLayout="horizontal"
          dataSource={heartMetrics}
          split={false}
          renderItem={metric => (
            <List.Item>
              <List.Item.Meta
                title={<StyleHTA metric={metric} />}
                description={moment(metric.date).format(dateFormat)} />
            </List.Item>
           )}
          />
      </Col>
      <Col xs={1}>
        <Avatar src={PatientMeasuresIcon} />
      </Col>
      <Col lg={6}>
        <List
          itemLayout="horizontal"
          dataSource={measures}
          split={false}
          renderItem={metric => (
            <List.Item>
              <List.Item.Meta
                title={metric.measure.name + ': '+metric.value + ' ' + metric.measure.unit}
                description={moment(metric.date).format(dateFormat)} />
            </List.Item>
           )}
          />
      </Col>
   </Row>
  
  );
}
