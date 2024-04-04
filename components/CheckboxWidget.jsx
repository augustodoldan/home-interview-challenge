import React, { useEffect, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const CheckboxWidget = ({ config, updateFormData }) => {

    const { type, name, label, required, id } = config
    const [isChecked, setIsChecked] = useState(true);
    const [requiredField, setRequiredField] = useState(false);

    const handleCheckboxChange = (e) => {
        const newValue = e.target.checked;
        setIsChecked((prevState) => prevState = newValue);

        if (required && !newValue) {
            setRequiredField((prevState) => prevState = true);
            updateFormData({ [name]: newValue, validated: false, type, id, required });
        } else {
            updateFormData({ [name]: newValue, validated: true, type, id, required });
            setRequiredField((prevState) => prevState = false);

        }
    };

    useEffect(() => {

        if (!required) {
            updateFormData({ [name]: false, validated: true, type, id, required: false });
        }
    }, []);
    return (
        <FormGroup check>
            <Input type={type} onChange={handleCheckboxChange} value={isChecked}
                className={(!requiredField ? "" : "is-invalid")} />
            <Label check >
                {label}
            </Label>
            {requiredField && <p className="invalid-feedback">El campo es obligatorio</p>}
        </FormGroup>
    )
}

export default CheckboxWidget
