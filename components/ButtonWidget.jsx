import React from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';



const ButtonWidget = ({ config, disabled }) => {

    const { type, name, label } = config
    const id = uuidv4().substring(0, 7)

    return (
        <div>
            <Button color="primary" disabled={disabled}>
                {label}
            </Button>
        </div>
    )
}

export default ButtonWidget
