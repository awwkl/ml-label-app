import React from "react";
import * as d3 from "d3";
// import CsvDownloader from 'react-csv-downloader';
// import { CSVLink, CSVDownload } from 'react-csv';
import useCsvDownloader from 'use-csv-downloader';

function Downloader(data, outFilename) {
    const downloadCsv = useCsvDownloader();
    downloadCsv(data, outFilename);
}

export class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleFileChange(event) {
        const uploadedFile = event.target.files[0];
        const propsOnDataChange = this.props.onDataChange;

        const reader = new FileReader();
        reader.onload = function(event) {
            const dataAsString = event.target.result;
            const parsedData = d3.csvParse(dataAsString);
            propsOnDataChange(parsedData);
        }
        reader.readAsText(uploadedFile);
    }
    
    handleDownload() {
        Downloader(this.props.data, "output-labelled.csv");
    }

    
    render() {
        const first_column_name = Object.keys(this.props.data[0])[0];
        
        return (
            <div className="top-nav">
                <div className="top-left-nav">
                    <ul className="heading-ul">
                        <li className="heading-index">index</li>
                        <li className="heading-first-column">{first_column_name}</li>
                        <li className="heading-label">label</li>
                    </ul>
                </div>
                <div className="top-right-nav">
                    <input type="file" className="input-file" onChange={this.handleFileChange} />
                    <button className="download-button" onClick={this.handleDownload}>Download</button>

                    {/* <CsvDownloader 
                        className="download-button"
                        filename="output"
                        extension=".csv"
                        separator=","
                        // columns={Object.keys(this.props.data[0])}
                        text="Download"
                        meta="true"
                        bom="true"
                        datas={this.props.data}
                    />
                    <CSVLink data={this.props.data} >
                        Download me
                    </CSVLink> */}
                </div>
            </div>
        );
    }
}
