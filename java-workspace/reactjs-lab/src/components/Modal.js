import React from 'react';
import {Modal as AntModal} from 'antd';  

export default function Modal (props) {
  
  return (
    <AntModal
            {...props}
            closable
            style={{top: 48}}
            maskClosable={false}
          >
          {props.children}
    </AntModal>
  )
}
