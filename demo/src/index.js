import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Card, Button, Icon, message, LocaleProvider  } from 'antd';
import 'antd/dist/antd.css';

import moment from 'moment';

import FormBuilder from '../../src';
import { FIELD_TYPES, FORM_LAYOUT } from '../../src/fieldConfig'

import zhCN from 'antd/lib/locale-provider/zh_CN';

const FormItem = Form.Item;

const Demo = () => {

  const rate5Star = <Button type='primary' size='large' 
    onClick={ e=>{
        setField({rate:5})
        message.success('Thank you!')
      } }><Icon type="smile" />Rate 5 Star</Button>
  
  const defaultFields= {
    ROW_basic_info:{
      gutter: 24,
      fields:{
        input: {
          label: 'Input',
          types: FIELD_TYPES.Input,
          fieldProps: {
            onChange: (value) => {console.log(value)},
          },
          column:{
            span:4
          }
        }
      }
    },
    ROW_more_info:{
      gutter: 24,
      fields:{
        inputValue: {
          label: 'Input with preset value',
          types: FIELD_TYPES.Input,
          fieldProps: {
            onChange: (value) => {console.log(value)},
          },
          column:{
            span:4
          },
        },
        date: {
          label: 'Date',
          types: FIELD_TYPES.DatePicker,
          fieldProps: {
            format:"YYYY-MM-DD",
            onChange: (value) => {console.log(value.format('YYYY-MM-DD'))}
          },
          column:{
            span:4
          }
        },
        time: {
          label: 'Time',
          types: FIELD_TYPES.TimePicker,
          fieldProps: {
            onChange: (value) => {console.log(JSON.stringify(value))}
          },
          column:{
            span:3
          }
        },
        checkbox: {
          label: 'Checkbox',
          types: FIELD_TYPES.Checkbox,
          fieldProps: {
            onChange: e => {console.log(e.target.checked)}
          },
          column:{
            span:3
          }
        },
        clearAll:{
          label:'Click to clear all fields',
          types:()=><Button type="danger" onClick={ () => clearForm() } size="large" style={{marginRight: 8}}>Clear All Fields</Button>,
          column:{
            span:4
          },
        }
      }
    },
    DIVIDER1:{
      dashed: true,
      text:'This is a divider with Text'
    },
    ROW2:{
      gutter: 24,
      fields:{
        email: {
          label: 'Email',
          types: FIELD_TYPES.AutoComplete,
          fieldProps: {
            dataSource: ['abc', 'abb@bb', 'valid@email.com']
          },
          column:{
            span:8
          }
        },
        url: {
          label: 'Url',
          types: FIELD_TYPES.Select,
          fieldProps: {
            defaultActiveFirstOption: true,
            showSearch: true,
            optionFilterProp:"children",
            filterOption:(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            onChange: (value)=>{setField({selectedUrl:value})}
          },
          options: [
            { value: 'abc', text: 'Invalid Url' },
            { value: 'www.google.com', text: 'No protocol' },
            { value: 'https://www.marineonline.com', text: 'Marine Online' }
          ],
          column:{
            span:8
          }
        },
        selectedUrl: {
          label: 'Selected Url',
          types: FIELD_TYPES.Input,
          column:{
            span:8
          }
        }
      }
    }
  }

  const expandFields = {
    ROW10:{
      gutter: 50,
      fields: {
        number: {
          label: 'Number',
          types: FIELD_TYPES.Input,
          fieldProps: {
            onChange: (value) => {console.log(value)},
          },
          column:{
            span:4
          }
        },
        range: {
          label: 'Range',
          types: FIELD_TYPES.Input,
          fieldProps: {
            onChange: (value) => {console.log(value)},
          },
          column:{
            span:4
          }
        },
        rate: {
          label: 'Rate',
          types: FIELD_TYPES.Rate,
          fieldProps: {
            allowHalf: true,
            character:"A"
          },
          column:{
            span:4
          }
        },
        button:{
          label: 'Button in Form',
          types:()=>rate5Star,
          column:{
            span:4
          }
        }
      }
    },
    DIVIDER2:{
      text:'Divider text with orientation: left',
      orientation: 'left'
    },
    ROW11:{
      gutter: 20,
      fields: {
        radio: {
          label: 'Radio',
          types: FIELD_TYPES.Radio,
          fieldProps: {
            onChange: e => {setField({selectedGender:e.target.value})},
          },
          options: [
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' }
          ],
          column:{
            span:6
          }
        },
        radioButton: {
          label: 'Radio Button',
          types: FIELD_TYPES.RadioButton,
          fieldProps: {
            onChange: e => {setField({selectedGender:e.target.value})},
          },
          options: [
            { value: 'banana', text: 'Banana' },
            { value: 'cherry', text: 'Cherry' },
            { value: 'apple', text: 'Apple' }
          ],
          column:{
            span:6
          }
        },
        selectedGender: {
          label: 'Selected',
          types: FIELD_TYPES.Input,
          fieldProps: {
            disabled: true
          },
          column:{
            span: 6
          }
        }
      }
    },
    ROW12:{
      gutter: 24,
      fields: {
        switch: {
          label: 'Switch',
          types: FIELD_TYPES.Switch,
          fieldProps:{
            checkedChildren:'开',
            unCheckedChildren:'关',
            onChange: (checked) => {setField({selectedGender:checked})},
          },
          column:{
            offset:2,
            span: 3
          }
        },
        textarea: {
          label: 'Textarea 1',
          types: FIELD_TYPES.TextArea,
          fieldProps: {
            rows:3
          },
          column:{
            span: 6
          }
        },
        textarea2: {
          label: 'Textarea 2',
          types: FIELD_TYPES.TextArea,
          fieldProps: {
            rows:6
          },
          column:{
            span: 6
          }
        }
      }
    }
  }

  const fieldsValue = {
    inputValue: "Mr Goodman",
    date: moment('2015-01-01','YYYY-MM-DD'),
    rate: 2.5,
    checkbox: true,
    switch: true,
    url: 'abc',
    radio: 'female',
    radioButton: 'apple',
    selectedGender: 'female',
    textarea: 'Some Text'
  }

  const formSetting = {
    formLayout: FORM_LAYOUT.vertical,
    // formColumn: 1,
    validateUrl: 'GET:/user',
    fieldsValue: fieldsValue,
    defaultFields: defaultFields,
    expandFields: expandFields,
    expandSetting: {
      push:22,
      span:2,
      expand:{
        text:'More',
        icon: <Icon type={'down'} />
      },
      collapse: {
        text: 'Collapse',
        icon: <Icon type={'up'} />
      }
    }
  }

  const fieldsToValidate=['input','date']

  let formHandler = null;
  
  const resetForm = () => {
    formHandler.resetForm()
  }

  const clearForm = () => {
    formHandler.clearForm()
  }

  const getData = () =>{
    const formData= formHandler.getFormData();
    console.log(formData)
  }

  const setField = (formVal) => {
    formHandler.setField(formVal);
  }

  const validate = (fields) => {
    const result = formHandler.validateForm(fields);
    if(result.isError){
      message.error('Validation has error.');
    }
    console.log(result.fields)
  }

  return (<LocaleProvider locale={zhCN}>
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title="Smart Form Demo" bordered={true}>
          <FormBuilder {...formSetting} handler={ h => { formHandler = h } }>
            <FormItem>
              <br/><br/>
              <Button type="secondary" onClick={ () => resetForm() } size="large" style={{marginRight: 8}}>Reset to Initial Value</Button>
              <Button type="primary" htmlType="submit" size="large" onClick={() => getData()}  style={{marginRight: 8}}>Get Form Values w/o Validation</Button>
              
              <Button type="secondary"  size="large" onClick={() => setField({input:'Test',number:11,checkbox:false})}  style={{marginRight: 8}}>Set Input and Number</Button>
              <Button type="secondary"  size="large" onClick={() => validate(fieldsToValidate)}  style={{marginRight: 8}}>Validate [input] Only</Button>
              <Button type="primary"  size="large" onClick={() => validate()}  style={{marginRight: 8}}>Validate All</Button>
            </FormItem>
          </FormBuilder>
      </Card>
    </div>
    </LocaleProvider>)
}

ReactDOM.render(<Demo/>, document.querySelector('#demo'))
