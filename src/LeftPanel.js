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
    const inspected_index = props.inspected_index === -1 ? 0 : props.inspected_index;
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
    const inspected_index = props.inspected_index === -1 ? 0 : props.inspected_index;
        
    const data_arr = data.map((sample, index) =>
        <Sample 
            key={index}
            index={index}
            inspected_index={inspected_index}
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
        console.log(e.target.id, 'label', e.target.value);
        this.props.onLabelChange(e.target.id, 'label', e.target.value);
    }

    handleInspectedId(index) {
        this.props.onInspectedIndexChange(index);
    }
    
    render() {
        const index = this.props.index;
        const first_column = Object.values(this.props.sample)[0];
        const label = this.props.sample.label;
        const commit_url = this.props.sample["commit url"];

        const divClassName = "sample-row" + 
                                ((index % 2 != 0) ? " alternate-color" : "") +
                                ((this.props.inspected_index === index ? " inspected-sample" : ""));
        
        const selectOptions = ["open", "close", "unknown", ""];
        const selectElement = (
            <select id={index} className="label-select" value={label} onChange={this.handleLabelChange}>
                {selectOptions.map((option) => <option value={option}>{option}</option>)}
                {(selectOptions.includes(label) || label === "")
                    ? null
                    : <option value={label}>{label}</option>
                }
            </select>
        )

        return (
            <div className={divClassName}>
                <ul className="sample-ul">
                    <li className="sample-index">#{index}</li>
                    <li className="sample-first-column">{first_column}</li>
                    <li className="sample-label">{selectElement}</li>
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

