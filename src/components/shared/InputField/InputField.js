import { Unique } from 'functions/common'
import React, { forwardRef } from 'react'

const InputField = forwardRef((props, ref) => {
    const {
        type = 'text',
        placeholder,
        className,
        id,
        label,
        labelClassName,
        onChange,
        value,
        width = '150px',
        wrapperClass = '',
        required = false,
        options = [{ 'label': 'Select an option', value: '' }],
        ...rest
    } = props
    return (
        <div className={` ${wrapperClass} flex justify-center w-full`}>
            <div className="w-full">
                {
                    label && <label className={`form-label inline-block mb-1 ${labelClassName}`} >{label}</label>
                }

                {
                    (type === 'text' || type === 'email' || type === 'password' || type === 'number') && <input
                        ref={ref}
                        onChange={onChange}
                        value={value}
                        type={type || 'text'}
                        className={`form-control w-full min-w-[${width}] min-h-[35px] px-3 border border-1 border-gray-200 rounded-md transition ease-in-out focus:outline-none ${className}`}
                        id={id}
                        required={true}
                        placeholder={placeholder}
                        {...rest}
                    />
                }
                {
                    type === 'select' && <select
                        id={id}
                        value={value}
                        onChange={onChange}
                        className={`form-control w-full bg-white min-w-[150px] min-h-[35px] px-3 border border-1 border-gray-200 text-slate-600 rounded-md transition ease-in-out focus:outline-none ${className}`}
                    >
                        {
                            options.length > 0 &&
                            options.map(option => <option key={Unique()} value={option.value}>{option.label}</option>)
                        }
                        {
                            options.length === 0 &&
                            <options key={Unique()} value="">No options available!</options>
                        }

                    </select>
                }
                {
                    type === 'textArea' && <textarea
                        id={id}
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                        className={`${className} text-black p-3 h-[150px] px-5 rounded-md min-h-[50px] w-full`} />
                }
            </div>
        </div >
    )
})
export default InputField

