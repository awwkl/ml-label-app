import React from 'react';
import axios from 'axios';

export class RightPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code_block: "@ Placeholder: Please select a sample",
            line_numbers: ""
        };
    }

    componentDidUpdate(prevProps) {
        console.log("@ componentDidUpdate");
        const element = document.getElementById("scroll-into-view-line");
        if (element != null) {
            element.scrollIntoView();
        }
        
        if (this.props.inspected_index === prevProps.inspected_index) {
            return;
        }

        if (this.props.inspected_index === -1) {
            this.setState({
                code_block: "@ Placeholder: Please select a sample",
                line_numbers: ""
            });
            return;
        }

        let get_url = this.props.data[this.props.inspected_index]["commit url"];
        get_url = get_url.replace("https://github.com", "https://raw.githubusercontent.com");
        get_url = get_url.replace("tree/", "");

        let positiveLineHighlight = true;
        let line_number = this.props.data[this.props.inspected_index]["start_line"];
        if (line_number < 1) {
            line_number = 1;
            positiveLineHighlight = false;
        }

        const self = this;
        axios.get(get_url).then(function(response) {
            line_number = line_number - 1;      // account for zero-indexing of array
            
            const code_array = response.data.split("\n");
            const code_above = code_array.slice(0, line_number);
            const code_line = code_array[line_number];
            const code_below = code_array.slice(line_number + 1);
            
            let line_numbers = code_array.map((line, index) => 
                <code className="line-number">{index + 1}<br /></code>);
            line_numbers = (
                <div className="line-numbers">
                    <code>{line_numbers}</code>
                </div>
            );
            
            const code_block = (
                <div className="code-block">
                    <code>{code_above.join("\n")}</code>
                    { line_number > 0 ? <br /> : ""}
                    <code
                        id="scroll-into-view-line" 
                        className={positiveLineHighlight ? "highlight-line" : ""}
                    >
                        {code_line}
                    </code>
                    <br />
                    <code>{code_below.join("\n")}</code>
                </div>
            );

            self.setState({ code_block, line_numbers });
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        console.log("@ render() of RightPanel");
        return (
            <div className="right-panel">
                {this.state.line_numbers} 
                {this.state.code_block} 
            </div>
        );
    }
}
