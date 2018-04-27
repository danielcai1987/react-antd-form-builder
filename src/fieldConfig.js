import React from 'react';
import { Input, Cascader, DatePicker, TimePicker, Button, InputNumber, Mention, Rate, Radio, Select, Slider, Switch, AutoComplete, Checkbox, Transfer, Upload, TreeSelect } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const InputGroup = Input.Group;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export const FORM_LAYOUT = {
    horizontal : "horizontal",
    vertical : "vertical",
    inline : "inline"
}

const selectOptions = (options) => {
    let view = []
    options.map(obj => view.push(<Option key={obj.value} value={obj.value}>{obj.text}</Option>))
    return view
}

const radioItems = (items, type) => {
    let view = []
    type==="radio"?
    items.map(obj => view.push(<Radio key={obj.value} value={obj.value}>{obj.text}</Radio>)):
    items.map(obj => view.push(<RadioButton key={obj.value} value={obj.value}>{obj.text}</RadioButton>))
    return view
}

export const FIELD_TYPES = {
    AutoComplete: 'AutoComplete',
    Cascader: 'Cascader',
    Checkbox: 'Checkbox',
    CheckboxGroup: 'CheckboxGroup',
    DatePicker: 'DatePicker',
    MonthPicker: 'MonthPicker',
    RangePicker: 'RangePicker',
    WeekPicker: 'WeekPicker',
    Input: 'Input',
    TextArea: 'TextArea',
    InputGroup: 'InputGroup',
    InputNumber: 'InputNumber',
    Mention: 'Mention',
    Rate: 'Rate',
    Radio: 'Radio',
    RadioButton: 'RadioButton',
    Select: 'Select',
    Slider: 'Slider',
    Switch: 'Switch',
    TreeSelect: 'TreeSelect',
    TimePicker: 'TimePicker',
    Transfer: 'Transfer',
    Upload: 'Upload'
}

export const getFieldTypes = (fieldProps, options) => ({
    'AutoComplete': <AutoComplete {...fieldProps} filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>,
    'Cascader': <Cascader {...fieldProps} />,
    'Checkbox': <Checkbox {...fieldProps} />,
    'CheckboxGroup': <CheckboxGroup {...fieldProps} />,
    'DatePicker': <DatePicker {...fieldProps} />,
    'MonthPicker': <MonthPicker {...fieldProps} />,
    'RangePicker': <RangePicker {...fieldProps} />,
    'WeekPicker': <WeekPicker {...fieldProps} />,
    'Input': <Input {...fieldProps} />,
    'TextArea': <TextArea {...fieldProps} />,
    'InputGroup': <InputGroup {...fieldProps} />,
    'InputNumber': <InputNumber {...fieldProps} />,
    'Mention': <Mention {...fieldProps} />,
    'Rate': <Rate {...fieldProps} />,
    'Radio': (<RadioGroup {...fieldProps} >{options!==undefined?radioItems(options,'radio'):null}</RadioGroup>),
    'RadioButton': (<RadioGroup {...fieldProps} >{options!==undefined?radioItems(options,'button'):null}</RadioGroup>),
    'Select': (<Select {...fieldProps} >{options!==undefined?selectOptions(options):null}</Select>),
    'Slider': <Slider {...fieldProps} />,
    'Switch': <Switch {...fieldProps} />,
    'TreeSelect': <TreeSelect {...fieldProps} />,
    'TimePicker': <TimePicker {...fieldProps} />,
    'Transfer': <Transfer {...fieldProps} />,
    'Upload': <Upload {...fieldProps} />
})

const RULE_TYPE = {
    string : "string",
    number : "number",
    boolean : "boolean",
    method : "method",
    regexp : "regexp",
    integer : "integer",
    float : "float",
    array : "array",
    object : "object",
    enum : "enum",
    date : "date",
    url : "url",
    hex : "hex",
    email : "email"
}

export const buildMap = (obj) => {
    let map = new Map();
    Object.keys(obj).forEach(key => {
        map.set(key, obj[key]);
    });
    return map;
}

export const getRules = (formRule, fieldName) => {
    let ruleArray = [];
    const fieldRule = formRule.get(fieldName)
    for (let rule in fieldRule){
        let ruleBody = fieldRule[rule]
        let rulePart = ruleBody.split(',')
        // console.log(rulePart)
        switch (rulePart[0]) {
            case 'req':
                ruleArray.push({
                    required: true,
                    message:'This is 必须的'
                })
                break

            case 'str':
                ruleArray.push({
                    min: Number(rulePart[1]),
                    max: Number(rulePart[2]),
                    message: ''
                })
                break

            case 'int':
                ruleArray.push({
                    transform: value => Number(value),
                    min: Number(rulePart[1]),
                    max: Number(rulePart[2]),
                    type: RULE_TYPE.integer,
                    message: ''
                })
                break

            case 'float':
                ruleArray.push({
                    min: Number(rulePart[1]),
                    max: Number(rulePart[1]),
                    type: 'float',
                    message: ''
                })
                break

            case 'date':
                ruleArray.push({
                    transform: value=>new Date(value),
                    type: 'date',
                    message: ''
                })
                break
            
            case 'time':
                ruleArray.push({
                    transform: value=>new Date(value),
                    type: 'date',
                    message: ''
                })
                break
            case 'bool':
                ruleArray.push({
                    type: 'boolean',
                    message: ''
                })
                break

            case 'email':
                ruleArray.push({
                    type: 'email',
                    message: ''
                })
                break

            case 'url':
                ruleArray.push({
                    type: 'url',
                    message: ''
                })
                break

            case 'in':
                ruleArray.push({
                    message: ''
                },{
                    validator: (rule,value,callback)=>{
                        rulePart.shift()
                        rulePart.includes(value)?callback():callback('Not In Range')
                    },
                })
                break

            default:
                break
        }

    }
    return ruleArray
}
