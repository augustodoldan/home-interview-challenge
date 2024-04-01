import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const SelectWidget = ({ config, updateFormData }) => {
    const { type, name, label, options, required, id } = config;

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setValue(selectedValue)
        if (selectedValue !== '') {
            updateFormData({ [name]: selectedValue, validated: true, type, id, required });
        }
    };

    useEffect(() => {
        const defaultValue = options?.[0]?.value || '';
        if (defaultValue === '') {
            updateFormData({ [name]: defaultValue, validated: false, type, id, required });
        } else {
            updateFormData({ [name]: defaultValue, validated: true, type, id, required });
        }
    }, []);
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
                    onChange={handleChange}
                    value={value}
                    className={(value ? "is-valid" : "")}

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

