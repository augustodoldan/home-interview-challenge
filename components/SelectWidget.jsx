import React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const SelectWidget = ({ config }) => {
    const { type, name, label, options, required } = config
    const id = uuidv4().substring(0, 7)
    console.log(options)

    return (
        <FormGroup row>
            <Label
                for={id}
                sm={8}
            >
                {label}
            </Label>
            <Col sm={10}>
                <Input
                    id={id}
                    name={name}
                    type="select"
                >
                    {options?.map((option) =>
                        <option value={option.value}>
                            {option.label}
                        </option>
                    )}
                </Input>
            </Col>
        </FormGroup>
    )
}

export default SelectWidget
