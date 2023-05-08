import { Select } from 'antd';
const App = ({ id, value, placeholder = "Search options", wrapperClassName, className, options, label, labelClassName, onChange }) => (
    <div className={`${wrapperClassName} flex flex-col`}>
        {
            label && <label className={labelClassName}>{label}</label>
        }
        <Select
            className={`${className} outline-none rounded-0`}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            value={value}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
            onChange={onChange}
            id={id}
        />
    </div>
);
export default App;