## BMO Smart Form ##
#### This library is a Form Generator build using React, Antd, etc with automatic validation rule.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Firstly, run **`yarn add bmo-smart-form`** to add this dependency to your project.

To use SmartForm in your component, import **React**, ReactDOM and all the below components from **antd**

    import React from 'react';
    import ReactDOM from 'react-dom';
    
	import { Form, Card, Button, Icon, message  } from 'antd';
    
	//the below line could be skipped if you have already import it in your App entry index.js
	import 'antd/dist/antd.css'; 

Import **SmartForm** library

	import SmartForm from 'bmo-smart-form';
    import { FIELD_TYPES, FORM_LAYOUT } from 'bmo-smart-form/lib/fieldConfig'
    
#### Demo functional stateless component
    
    const FormItem = Form.Item;
    
    const Demo = () => {
    
	//rate5Star is a function for customized button below.
    const rate5Star = <Button type='primary' size='large' 
    		onClick={ e=>{
    			setField({rate:5})
    			message.success('Thank you!')
      		}}><Icon type="smile" />Rate 5 Star</Button>


----------

### **`defaultFields`** is used to setup the default form fields.

----------


Please use **CAPITAL** letter for **ROW** followed by a unique number/characters for the row name. 

E.g. **ROW1**, **ROW\_basic\_info**. 
> IMPORTANT: Please avoid using **DIVIDER** or **- (dash)** in the row name.

**gutter** is used to set the space between each field.

**fields** is used to set the fields' structure, the **key** is field name, please let each field has its **unique** name.

Inside each field object:

- **label** is for displaying the field label
- **types** is to indicate the type of field, types could be set to function to make a customized component `()=><div>I'm a customized component</div>`, it will be rendered directly.
- **fieldProps** is to set up props for each type of field
- **column** is for setting the field column props, such as **span, offset, push, pull**, etc

> NOTE: **The Grid system has 24 columns**

To insert a Divider, use capitalized **DIVIDER** with a unique number/characters as the **key**
      
	    const defaultFields= {
	    	ROW1:{
				gutter: 24,
				fields:{
				    input: {
				    	label: 'Input',
				    	types: FIELD_TYPES.Input,
				    	fieldProps: {
				    		onChange: (value) => console.log(value)
				      	},
				      	column:{
				    		span:4
	      				}
		    		},
		    		inputValue: {
		      			label: 'Input with preset value',
		      			types: FIELD_TYPES.Input,
		      			fieldProps: {
		    				onChange: (value) => console.log(value),
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
			    			onChange: (value) => console.log(value.format('YYYY-MM-DD'))
			      		},
			      		column:{
			    			span:4
			      		}
		    		},
			    	time: {
			      		label: 'Time',
					    types: FIELD_TYPES.TimePicker,
					    fieldProps: {
					    	onChange: (value) => console.log(JSON.stringify(value))
					    },
					    column:{
					    	span:3
					    }
					},
			    	checkbox: {
			      		label: 'Checkbox',
			      		types: FIELD_TYPES.Checkbox,
			      		fieldProps: {
			    			onChange: e => console.log(e.target.checked)
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
				    		onChange: (value)=>setField({selectedUrl:value})
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

----------

### **`expandFields`** is used to setup the *expandable* form fields.
The usage is same as **`defaultFields`**.

----------

	
		const expandFields = {
	    	ROW10:{
		      	gutter: 50,
		      	fields: {
		    		number: {
			      		label: 'Number',
			      		types: FIELD_TYPES.Input,
				      	fieldProps: {
				    		onChange: (value) => console.log(value),
				      	},
				      	column:{
					    	span:4
					    }
				    },
			    	range: {
				      	label: 'Range',
				      	types: FIELD_TYPES.Input,
				      	fieldProps: {
			    			onChange: (value) => console.log(value),
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
		    				onChange: e => setField({selectedGender:e.target.value}),
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
			    			onChange: e => setField({selectedGender:e.target.value}),
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
						    onChange: (checked) => setField({selectedGender:checked}),
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

#### fieldsValue is for setting the Initial Value for fields, the key is *fieldName*

- Input: string
- Textarea: string
- Rate: number
- Checkbox, switch: boolean
	    
	    const fieldsValue = {
	    	inputValue: "Mr Goodman",
		    rate: 2.5,
		    checkbox: true,
		    switch: true,
		    url: 'abc',
		    radio: 'female',
		    radioButton: 'apple',
		    selectedGender: 'female',
		    textarea: 'Some Text'
	    }

#### formSetting is for setting the necessary form props


- **formLayout**: Please use the default `FORM_LAYOUT.vertical`
- **validateUrl**: set POST or GET followed by a  colon **:** and the form url endpoint
- **fieldsValue**: use the fieldsValue declared above
- **defaultFields**: use the defaultFields declared above 
- **expandFields**: use the expandFields declared above, *can be removed*.
- **expandSetting**: to set up the expand button, *can be removed*.

 	    
	    const formSetting = {
		    formLayout: FORM_LAYOUT.vertical,
		    validateUrl: 'GET:/user',
		    fieldsValue: fieldsValue,
		    defaultFields: defaultFields,
		    expandFields: expandFields,
		    expandSetting: {
		      	push:22,
		      	span:2,
		     	expand:{
		    		text:'更多',
		    		icon: <Icon type={'down'} />
		      	},
		      	collapse: {
		    		text: 'Collapse',
		    		icon: <Icon type={'up'} />
		      	}
		    }
	    }
	    
#### fieldsToValidate is an array of fields names to be validate later in the `validate()` method

	    const fieldsToValidate=['input','date']

### Form method
**resetForm()**: to reset all fields to **Initial Value**

		// formHandler must be declared to receive the form methods.
		let formHandler = null;
      
    	const resetForm = () => {
    		formHandler.resetForm()
    	}

**clearForm()**: to clear all fields.
    
	    const clearForm = () => {
    		formHandler.clearForm()
      	}

**getData()**: to get all fields data without validation.

    	const getData = () =>{
	    	const formData= formHandler.getFormData();
	    	console.log(formData)
	    }

**setField({fieldName:value, ...})**: to set field(s) with value.

E.g. setField({input:'Test', number:11, checkbox:false})
	    
	    const setField = (formVal) => {
	    	formHandler.setField(formVal);
	    }

**validate(['fieldName1', 'fieldName2'])**: to validate given form fields and return all fields data. 

> to use **validate()** *without* parameter will validate all fields and return all fields data.
	    
	    const validate = (fields) => {
	    	const result = formHandler.validateForm(fields);
	    	if(result.isError){
	      		message.error('Validation has error.');
	    	}
	    	console.log(result.fields)
	    }

#### Form opening `<SmartForm {...formSetting} handler={ h => { formHandler = h } }>`

#### Form children
All child components between form opening and closing tag will be rendered after form fields, at the bottom of the form.

#### Form closing `</SmartForm>`

    
    	return (<Card title="Smart Form Demo" bordered={true}>
		      	<SmartForm {...formSetting} handler={ h => { formHandler = h } }>
		    		<FormItem>
			      		<br/><br/>
			      		<Button type="secondary" onClick={ () => resetForm() } size="large" style={{marginRight: 8}}>Reset to Initial Value</Button>
			      		<Button type="primary" htmlType="submit" size="large" onClick={() => getData()}  style={{marginRight: 8}}>Get Form Values w/o Validation</Button>
			      
			      		<Button type="secondary"  size="large" onClick={() => setField({input:'Test',number:11,checkbox:false})}  style={{marginRight: 8}}>Set Input and Number</Button>
			      		<Button type="secondary"  size="large" onClick={() => validate(fieldsToValidate)}  style={{marginRight: 8}}>Validate [input] Only</Button>
			      		<Button type="primary"  size="large" onClick={() => validate()}  style={{marginRight: 8}}>Validate All</Button>
			    	</FormItem>
		      </SmartForm>
    	</Card>)
    }
    
    ReactDOM.render(<Demo/>, document.querySelector('#demo'))
    

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
