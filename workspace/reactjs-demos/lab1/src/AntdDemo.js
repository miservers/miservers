import { DatePicker } from 'antd';
import {useState} from 'react'

import 'antd/dist/antd.css';

export const AntdDemo =  () => {
    const [date, setDate] = useState(null)

    const handleDate = (date, dateStr) => setDate(dateStr) 

    console.log(date)
    return (
        <>
        <h2>Antd Demo</h2><hr/>
        <DatePicker onChange={handleDate}/>
        <div>Chosen date: {date}</div>
        </>
    )
}

