import React from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



const ButtonWidget = ({ config, disabled, path, dataForm }) => {

    const { type, method, label } = config

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/${path}`, dataForm, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 200) {
                throw new Error("Ha ocurrido un error")
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 20 }}>
            <Button color="dark" disabled={disabled} onClick={handleClick}>
                {label}
            </Button>
        </div>
    )
}

export default ButtonWidget
