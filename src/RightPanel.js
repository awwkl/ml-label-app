import React from 'react';

export function RightPanel(props) {
    const data = props.data;
    const display_url = props.data[props.inspected_index]['commit url'];

    return (
        <div className="right-panel">
            {props.display_url}
            <iframe className="iframe" src={display_url} />
        </div>
    );
}
