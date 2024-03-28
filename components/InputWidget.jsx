import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';


const InputWidget = ({ config }) => {
    const { type, name, label, regex, required, conditions } = config
    const id = uuidv4().substring(0, 7)
    console.log("adentro de input")
    console.log(config)
    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                id={id}
                name="name"
                placeholder={label}
                type="text"
            />
        </FormGroup>
    )
}

export default InputWidget
