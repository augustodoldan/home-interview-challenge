import React from 'react';
import { ListGroupItem } from 'reactstrap';

const LinkWidget = ({ config }) => {
    const { type, to, target, label } = config;

    return (
        <ListGroupItem
            action
            href={to}
            tag="a"
            target={target}
            style={{ width: 'fit-content' }}
        >
            {label}
        </ListGroupItem>

    );
};

export default LinkWidget;
