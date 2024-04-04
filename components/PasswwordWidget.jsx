import React, { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { validator } from "../utils/validator";

import 'bootstrap/dist/css/bootstrap.min.css';



const PasswwordWidget = ({ config, updateFormData, dataForm }) => {
    const { type, name, label, regex, required, conditions, id } = config
    const [error, setError] = useState(null);
    const [requiredField, setRequiredField] = useState(null);
    const [unmatchedPassword, setUnmatchedPassword] = useState(null);


    const handleChange = (e) => {
        const valueEntered = e.target.value;
        const isValid = new RegExp(regex).test(valueEntered);
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
        }
        else if (isValid && conditions?.validations?.[0]?.comparision === "same") {
            setError(false)

            let valueToSearch = dataForm.find((data) => data.type === type && data.id != id)[type]

            const sameValue = validator.same(valueToSearch, valueEntered)
            if (sameValue) {
                setUnmatchedPassword(false)
                updateFormData({ [name]: valueEntered, validated: true, type: type, id, required });
            } else {
                updateFormData({ [name]: valueEntered, validated: false, type: type, id, required });
                setUnmatchedPassword(true)
            }

        }
        else {
            updateFormData({ [name]: valueEntered, validated: true, type: type, id, required });
            setRequiredField(false)
            setError(false)
            setUnmatchedPassword(false)
        }
    }

    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                id={id}
                name={name}
                required={required}
                placeholder={label}
                type="password"
                onChange={handleChange}
                className={(error || unmatchedPassword ? "is-invalid" : (error !== null ? "is-valid" : ""))}
            />
            {error && <p className="invalid-feedback">El formato es invalido</p>}
            {requiredField && <p className="invalid-feedback">El campo es obligatorio</p>}
            {unmatchedPassword && <p className="invalid-feedback">Las contraseñas no coinciden.</p>}

        </FormGroup>
    )
}

export default PasswwordWidget
