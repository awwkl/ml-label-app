import React from 'react';

export function LeftPanel(props) {
    return (
        <div className="left-panel">
            <TopLeftPanel {...props} />
            <BottomLeftPanel {...props} />
        </div>
    );
}

function FeatureValueItem(props) {
    const feature = props.feature;
    let value = String(props.value);
    if (value.startsWith("http") || value.startsWith("www.")) {
        value = <a target="_blank" rel="noopener noreferrer" 
        className="commit-link" href={value}>{value}</a>;
    }
    
    return (
        <li>
            <span className="list-feature">{props.feature}</span>: {" "}
            <span className="list-value">{value}</span>
        </li>
    );
}

export function BottomLeftPanel(props) {
    const data = props.data;
    const inspected_index = props.inspected_index === -1 ? 0 : props.inspected_index;
    const sample = data[inspected_index];
    console.log(sample);

    const entries = Object.entries(sample);
    const listKeyValuePairs = entries.map(([feature, value]) =>
        <FeatureValueItem feature={feature} value={value} />
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

