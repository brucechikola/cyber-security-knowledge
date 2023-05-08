import { TimePicker } from 'antd'
import React from 'react'

function TimeField(props) {
    return (
        <div className='flex flex-col w-full'>
            {props.label && <span className={props.labelClassName}>{props.label}</span>}
            <TimePicker value={props.vale} id={props.id} onChange={props.onChange} className={props.className} />
        </div>

    )
}

export default TimeField