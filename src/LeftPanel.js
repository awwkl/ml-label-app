import React from 'react';

export function LeftPanel(props) {
    return (
        <div className="left-panel">
            <TopLeftPanel {...props} />
            <BottomLeftPanel {...props} />
        </div>
    );
}

export function BottomLeftPanel(props) {
    const data = props.data;
    const inspected_index = props.inspected_index;
    const sample = data[inspected_index];
    console.log(sample);

    const keys = Object.keys(sample);
    const listKeyValuePairs = keys.map(key =>
        <li>
            <span className="list-key">{key}</span>: {" "}
            <span className="list-value">{sample[key]}</span>
        </li>
    );
    
    return (
        <div className="bottom-left-panel">
            <ul className="list-dictionary">
                {listKeyValuePairs}
            </ul>
        </div>
    )
}

export function TopLeftPanel(props) {
    const data = props.data;
        
    const data_arr = data.map((sample, index) =>
        <Sample 
            key={index}
            index={index}
            sample={sample}
            onLabelChange={props.onLabelChange} 
            onInspectedIndexChange={props.onInspectedIndexChange}
        />
    );

    return (
        <div className="top-left-panel">
            {data_arr}
        </div>
    );
}


class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleInspectedId = this.handleInspectedId.bind(this);
    }
    
    handleLabelChange(e) {
        this.props.onLabelChange(e.target.id, 'label', e.target.value);
    }

    handleInspectedId(index) {
        // console.log("from within sample! handle url change!");
        this.props.onInspectedIndexChange(index);
    }
    
    render() {
        const index = this.props.index;
        const first_column = Object.values(this.props.sample)[0];
        const label = this.props.sample.label;
        const commit_url = this.props.sample["commit url"];

        const className = "sample-row" + ((index % 2 != 0) ? " alternate-color" : "");
        
        return (
            <div className={className}>
                <ul className="sample-ul">
                    <li className="sample-index">#{index}</li>
                    <li className="sample-first-column">{first_column}</li>
                    <li className="sample-label">
                        <input
                            className="label-input" type="text" 
                            id={index} value={label}
                            onChange={this.handleLabelChange} />
                    </li>
                    <li className="sample-inspect-button">
                        <button 
                            className="inspect-button"
                            onClick={() => this.handleInspectedId(index)}
                        >
                            Inspect
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

