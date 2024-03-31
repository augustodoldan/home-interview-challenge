import React, { useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const EmailWidget = ({ config }) => {
    const { type, name, label, regex, required, conditions } = config;
    const id = uuidv4().substring(0, 7);
    const [error, setError] = useState(null);
    const [requiredField, setRequiredField] = useState(null);


    const handleChange = (e) => {
        const value = e.target.value;
        const isValid = e.target.validity.valid

        if (value === '' && !required) {
            setError(null);
            e.target.className = '';
            setRequiredField(null)
            return;
        } else if (value === '' && required) {
            setError(true);
            setRequiredField(true)
            return;
        }

        if (!isValid) {
            setError(true)
        } else {
            setRequiredField(false)
            setError(false)
        }
    }



    return (
        <FormGroup>
            <Label for={id}>{label}</Label>
            <Input
                id={id}
                name={name}
                type={type}
                pattern={regex}
                required={required}
                placeholder={label}
                onChange={handleChange}
                className={(error && "is-invalid") || (!error && error != null && "is-valid")}
            />
            {error && <p className="invalid-feedback">El formato es invalido</p>}
            {requiredField && <p className="invalid-feedback">El campo es obligatorio</p>}

        </FormGroup>
    );
};

export default EmailWidget;
