import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/LeftPanel.css';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { TopNav } from './TopNav';

const global_data = [
    {warning_id: 1977, bug_pattern: 'MALICIOUS_CODE', "commit url": "https://github.com/apache/phoenix/tree/3f48938d5d5a67d59129eb90295894cc76e58508/./phoenix-core/src/it/java/org/apache/phoenix/end2end/SortMergeJoinIT.java#L768", label: 'open'},
    {warning_id: 405, bug_pattern: 'EXPERIMENTAL', "commit url": "https://github.com/apache/phoenix/tree/4de4251310cfcef12178713d6d6e93b0882a4f4d/./phoenix-core/src/it/java/org/apache/phoenix/end2end/index/DropIndexDuringUpsertIT.java#L113", label: 'close'},
    {warning_id: 2362, bug_pattern: 'MALICIOUS_CODE', "commit url": "https://github.com/apache/lucene-solr/tree/93e19a3148ef8d428354e2e8a7af5dd3ad03ea9f/./lucene/queryparser/src/java/org/apache/lucene/queryparser/flexible/core/messages/QueryParserMessages.java#L-2", label: ''},
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: global_data,
            inspected_index: 0,
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
        this.setState({data: data});
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
