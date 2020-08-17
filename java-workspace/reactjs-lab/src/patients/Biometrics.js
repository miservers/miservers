import React , {useState, useEffect}from 'react';
import moment from 'moment';
import { Descriptions, Typography, Row, Col, Avatar, List } from 'antd';

import {HeartPulseIcon} from '../icons';
import {fetchLastMeasureByName} from '../services';
import {dateFormat} from '../constants/Constants'
const { Text } = Typography;
const {Item}   = Descriptions;
 
export default function Biometrics ({pid}) { 
  const [weight, setWeight] = useState({measure:{name:''}});
  const [tall, setTall] = useState({measure:{name:''}});
  const [biometrics, setBiometrics] = useState([]);
  
  useEffect( () => { 
    async function fetchData () {
      const weight = await fetchLastMeasureByName(pid, 'Poids');
      setWeight(weight);
      const tall = await fetchLastMeasureByName(pid, 'Taille');
      setTall(tall);
      ['SYS', 'DIA', 'PUL'].map(async(measure) => {
                              const metric = await fetchLastMeasureByName(pid, measure);
                              setBiometrics(biometrics=>[...biometrics, metric]);      
                              }) 
    }
    fetchData();
    }, []);
  
  return (
    <Row style={{textAlign: 'left'}}>
      <Col xs={12}>
        <Avatar src={HeartPulseIcon} />
        <List
          itemLayout="horizontal"
          dataSource={biometrics}
          renderItem={metric => (
            <List.Item>
              <List.Item.Meta
                title={metric.measure.name + ': '+metric.value + ' ' + metric.measure.unit}
                description={moment(tall.date).format(dateFormat)} />
            </List.Item>
           )}
          />
      </Col>
      <Col xs={12}>
        <Descriptions column={1}> 
          <Item label='Taille'>{tall.value + ' ' + tall.measure.unit} 
            <br/> 
            <Text disabled>Derniere mise a jour: {moment(tall.date).format(dateFormat)}</Text> 
          </Item>
          <Item label='Poids'>{weight.value + ' ' + weight.measure.unit} <br/>
          <Text disabled>Derniere mise a jour: {moment(weight.date).format(dateFormat)}</Text> 
          </Item>
        </Descriptions>
      </Col>
   </Row>
  
  );
}
