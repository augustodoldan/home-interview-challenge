import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const CheckboxWidget = ({ config }) => {

    const { type, name, label, required } = config
    const id = uuidv4().substring(0, 7)

    return (
        <FormGroup check>
            <Input type={type} />
            <Label check>
                {label}
            </Label>
        </FormGroup>
    )
}

export default CheckboxWidget
