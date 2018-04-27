import React from 'react';
import { Form, Col, Row, Divider } from 'antd';
import Loading from './Loading'

import { RestClient, Endpoint, Request } from 'bmo-rest-client';

import { FIELD_TYPES, FORM_LAYOUT, getFieldTypes, buildMap, getRules } from './fieldConfig';

const FormItem = Form.Item;

const renderRow = (props, formFields, fieldsValue, formRule, isExpand) => {
    const renderingRow = []
    let uuid = 0

    for (let fieldName in formFields) {
        uuid++
        let fieldItem = formFields[fieldName];
        
        if(fieldName.includes('ROW')){
            const renderingRowFields = []
            let uuuid = 0
            
            for (let rowFieldName in fieldItem.fields) {
                uuuid ++
                let rowFieldItem = fieldItem.fields[rowFieldName];
                renderingRowFields.push(renderField(props, rowFieldName, rowFieldItem, fieldsValue, formRule))
            }
            renderingRow.push(<Row style={{display: isExpand? 'none' : 'block'}}  gutter={fieldItem.gutter} key={'row'+uuid}>{renderingRowFields}</Row>)
        } else if(fieldName.includes('DIVIDER')){
            let divider = fieldItem.text!==undefined?(<Divider key={fieldName} {...fieldItem}>{fieldItem.text}</Divider>):<Divider key={'row'+fieldName} {...fieldItem}/>
            renderingRow.push(<Row style={{display: isExpand? 'none' : 'block'}}  gutter={24} key={'row'+uuid}>{divider}</Row>)
        }
    }
    return renderingRow
}

const renderField = (props, fieldName, fieldItem, fieldsValue, formRule, isExpand) =>{
    
    const { getFieldDecorator } = props.form;
    const formItemLayout = props.formLayout === FORM_LAYOUT.horizontal ? {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    } : (props.formLayout === FORM_LAYOUT.vertical) ? { colon: true } : null;

    const renderingFields = [];

    let initialValue = fieldsValue.get(fieldName)
    let getFieldDecoratorOptions = {
        initialValue:initialValue,
        rules: getRules(formRule, fieldName)
    }
    
    getFieldDecoratorOptions.valuePropName=['Checkbox','Switch'].includes(fieldItem.types)?'checked': 'value'
    
    if(fieldItem.types!==undefined && typeof fieldItem.types !== 'function'){
        if(props.formLayout === FORM_LAYOUT.inline || props.formColumn === 1){
            renderingFields.push(
                <FormItem
                    {...formItemLayout}
                    label={fieldItem.label}
                    key={fieldName}
                    style={{display: isExpand? 'none' : 'block'}} 
                >
                    {getFieldDecorator(fieldName, {...getFieldDecoratorOptions})(
                        getFieldTypes(fieldItem.fieldProps, fieldItem.options)[fieldItem.types]
                    )}
                </FormItem>
            )
        }else{
            renderingFields.push(
                <Col {...fieldItem.column} key={fieldName} style={{display: isExpand? 'none' : 'block'}}>
                    <FormItem
                        {...formItemLayout}
                        label={fieldItem.label}
                        key={fieldName}
                    >
                        {getFieldDecorator(fieldName, {...getFieldDecoratorOptions})(
                            getFieldTypes(fieldItem.fieldProps, fieldItem.options)[fieldItem.types]
                        )}
                    </FormItem>
                </Col>
            )
        }
    } else if(fieldItem.types!==undefined){
        renderingFields.push(
            <Col {...fieldItem.column} key={fieldName} style={{display: isExpand? 'none' : 'block'}} >
                <FormItem
                    {...formItemLayout}
                    label={fieldItem.label}
                    key={fieldName}
                >
                    {fieldItem.types()}
                </FormItem>
            </Col>)
    }
    return renderingFields
}

class SmartForm extends React.Component {
    state = {
        formIsReady: false,
        formRule: {},
        fieldsValue: buildMap(this.props.fieldsValue),
        expand: true
    }

    formMethod = {
        getFormData: () => {
            const formData = this.props.form.getFieldsValue()
            // console.log(formData)
            return formData;
        },
        setField: (data) => {
            for(let key in data){
                this.props.form.setFieldsValue({
                    [key]: data[key]
                });
            }
        },
        validateForm: (fields) => {
            let isError = false;
            let values = {};

            let fieldNeedValidator=[];
            if(fields!==undefined && fields.length>0){
                fields.map(field=>{
                    if(!this.state.formRule.has(field)){
                        fieldNeedValidator.push(field);
                    }
                })
            }
            
            if(fieldNeedValidator.length>0){
                errors= `There are no API rules set for these fields: ${fieldNeedValidator.toString()}`
                return {errors};
            } else{
                this.props.form.validateFields(fields,(err, val) => {
                    if (!err) {
                        values = val
                    } else{
                        isError = true;
                        let new_error_obj = {};
                        for(let key in err){
                            new_error_obj[key] = err[key].errors[0].message
                        }
                        values = new_error_obj
                    }
                });
                return {isError: isError, fields: values}
            }
        },
        resetForm: () => {
            this.props.form.resetFields();
            
        },
        clearForm: () => {
            this.props.form.resetFields();
            for (let [key,value] of this.state.fieldsValue) {
                let resetValue = typeof value === 'string'?'':(typeof value === 'number'?0:(typeof value === 'boolean'?false:null))
                this.props.form.setFieldsValue({[key]:resetValue})
            }
        }
    }

    componentWillMount(){
        let validateUrl = this.props.validateUrl.split(':')
        let method = validateUrl[0]==='POST'?Request.POST:Request.GET
        RestClient.call(Endpoint(method, validateUrl[1]),null,null).then(res => {
            // console.log(res.data)
            this.setState({formRule: buildMap(res.data)})
            // console.log(this.state.formValidation)
            this.setState({formIsReady: true})
        })
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        //export inner method to be able to use from outside
        let { handler } = this.props;
        handler(this.formMethod)

        const { getFieldDecorator } = this.props.form;

        let hasExpandFields = this.props.expandFields!==undefined && Object.keys(this.props.expandFields).length !== 0 && this.props.expandFields.constructor === Object?true:false;
        let expandSetting = this.props.expandSetting!==undefined?this.props.expandSetting:null

        return (
            this.state.formIsReady ? <Form {...(this.props.formLayout ? {layout: this.props.formLayout} : {})} onSubmit={this.props.onSubmit}>
                {renderRow(this.props, this.props.defaultFields, this.state.fieldsValue, this.state.formRule, false)}
                {hasExpandFields?<Row gutter={24}>
                    <Col {...expandSetting}>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>{this.state.expand ?expandSetting.expand.text:expandSetting.collapse.text}{this.state.expand ?expandSetting.expand.icon:expandSetting.collapse.icon}</a>
                    </Col>
                </Row>:null}
                {hasExpandFields?renderRow(this.props, this.props.expandFields, this.state.fieldsValue, this.state.formRule, this.state.expand):null}
                {this.props.children}
            </Form> : <Loading size="large"/>
        )
    }
}

export default Form.create()(SmartForm)