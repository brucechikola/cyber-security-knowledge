import { DatePicker } from 'antd'
import React, { forwardRef } from 'react'

// function DF({ label, onChange, className, id, value, labelClassName }) {
//     return (
//         <div className='flex flex-col w-full'>
//             {label && <span className={labelClassName}>{label}</span>}
//             <DatePicker value={value} id={id} onChange={onChange} className={className} />
//         </div>

//     )
// }
const DateField = forwardRef((props, ref) => {
    return (
        <div className='flex flex-col w-full'>
            {props.label && <span className={props.labelClassName}>{props.label}</span>}
            <DatePicker onChange={props.onChange} className={props.className} />
        </div>

    )
})

export default DateField