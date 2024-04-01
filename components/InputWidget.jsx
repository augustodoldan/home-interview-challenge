import React, { useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const InputWidget = ({ config, updateFormData }) => {
    const { type, name, label, regex, required, conditions, id } = config;
    const [error, setError] = useState(null);
    const [requiredField, setRequiredField] = useState(null);

    const handleChange = (e) => {

        const valueEntered = e.target.value;
        const isValid = e.target.validity.valid

        if (valueEntered === '' && !required) {
            setError(null);
            setRequiredField(null)
            updateFormData({ [name]: "", validated: true, type: type, id, required: false });
            return;
        } else if (valueEntered === '' && required) {
            setError(true);
            setRequiredField(true)
            updateFormData({ [name]: "", validated: false, type: type, id, required });
            return;
        }

        if (!isValid) {
            setError(true)
            updateFormData({ [name]: "", validated: false, type: type, id, required });
        } else {
            updateFormData({ [name]: valueEntered, validated: true, type: type, id, required });
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
                className={(error ? "is-invalid" : (error !== null ? "is-valid" : ""))}
            />
            {error && <p className="invalid-feedback">El formato es invalido</p>}
            {requiredField && <p className="invalid-feedback">El campo es obligatorio</p>}

        </FormGroup>
    );
};

export default InputWidget;
