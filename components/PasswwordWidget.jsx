import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const PasswwordWidget = ({ config }) => {
    const { type, name, label, regex, required, conditions } = config
    const id = uuidv4().substring(0, 7)

    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                id={id}
                name={name}
                pattern={regex}
                required={required}
                placeholder={label}
                type="password"
            />
        </FormGroup>
    )
}

export default PasswwordWidget
