import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/LeftPanel.css';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { TopNav } from './TopNav';

const initial_sample_data = [
    {bug_pattern: 'SAMPLE_01', start_line: 92, "commit url": " https://github.com/apache/phoenix/tree/27a6db9ae49df5ca14e2b9cb07ddf6bb608db976/./phoenix-core/src/it/java/org/apache/phoenix/end2end/QueryDatabaseMetaDataIT.java#L92", label: 'open'},
    {bug_pattern: 'SAMPLE_02', start_line: 1825, "commit url": "https://github.com/apache/phoenix/tree/27a6db9ae49df5ca14e2b9cb07ddf6bb608db976/./phoenix-core/src/it/java/org/apache/phoenix/end2end/VariableLengthPKIT.java#L1825", label: 'close'},
    {bug_pattern: 'SAMPLE_03', start_line: -2, "commit url": "https://github.com/apache/lucene-solr/tree/23aa3e09064b7147e3eb311283fe9e3410f9e39d/./lucene/queryparser/src/java/org/apache/lucene/queryparser/flexible/core/messages/QueryParserMessages.java#L-2", label: ''},
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: initial_sample_data,
            inspected_index: -1,
        };
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleInspectedIndexChange = this.handleInspectedIndexChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
    }

    handleValueChange(id, column, value) {
        const data = this.state.data.slice();
        data[id][column] = value;
        this.setState({data: data});
    }

    handleInspectedIndexChange(index) {
        this.setState({inspected_index: index});
    }

    handleDataChange(data) {
        console.log("handle data change in App!");
        console.log(data);
        this.setState({
            data: data, 
            inspected_index: -1
        });
    }
    
    render() {
        return (
            <div className="page-container">
                <TopNav
                    data={this.state.data}
                    onDataChange={this.handleDataChange}
                />
                <div className="bottom-container">
                    <LeftPanel 
                        data={this.state.data}
                        inspected_index={this.state.inspected_index}
                        onLabelChange={this.handleValueChange}
                        onInspectedIndexChange={this.handleInspectedIndexChange}
                    />
                    <RightPanel
                        data={this.state.data}
                        inspected_index={this.state.inspected_index}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
