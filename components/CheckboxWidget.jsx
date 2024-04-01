import React, { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const CheckboxWidget = ({ config, updateFormData }) => {

    const { type, name, label, required } = config
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
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
