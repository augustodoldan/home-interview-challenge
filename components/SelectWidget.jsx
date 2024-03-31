import React, { useState } from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const SelectWidget = ({ config, addData }) => {
    const { type, name, label, options, required, id } = config;

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        addData({ [name]: selectedValue, validated: true, type: type, id, required });
    };

    return (
        <FormGroup row>
            <Label for={id} sm={8}>
                {label}
            </Label>
            <Col sm={10}>
                <Input
                    id={id}
                    name={name}
                    type="select"
                    value={value}
                    onChange={handleChange}
                >
                    {options?.map((option) =>
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    )}
                </Input>
            </Col>
        </FormGroup>
    );
};

export default SelectWidget;

