// Reading and initial handling of elevation data from .asc file

import React from 'react';

class FileOpener extends React.Component {
    constructor(props) {
        super(props);

        this.handleTheFile = this.handleTheFile.bind(this);
        this.inputFile = React.createRef();
        this.dataString = '';
        this.state = {
            mapData: {
                canvasWidth: null,
                canvasHeight: null,
                noDataValue: null
            }
        }
    }

    /** Open user file and read it as text */
    handleTheFile(event) {
        event.preventDefault();

        // Confirm file extension and read the data as text
        console.log('Reading the file...');
        // filePath = document.getElementById('mapFile').value;
        let fileName = this.inputFile.current.files[0].name;
        if (!fileName.endsWith('.asc')) {
            console.log('Error opening the file: Invalid file extension, .asc expected.');
            return;
        }

        let file = this.inputFile.current.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            this.dataString = event.target.result;
            console.log('Done.');
            console.log('Hurr'); // DEBUG
            // ParseTheData();
        }
        reader.onerror = () => {
            console.log('Error opening the file: Cannot read file.');
            return;
        }
        reader.readAsText(file);
    }

    render() {
        return (
            <form onSubmit={this.handleTheFile}>
                <label>Valitse .asc -tiedosto:</label>
                <br />
                <input type='file' ref={this.inputFile} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        );
    }

    /** Read metadata and convert to a float array */
    /*
    ParseTheData() {
    
        // Read necessary metadata from the string, error if not found
        let parseError = 'Error reading the data: Metadata not found.';

        try {
            console.log('Reading metadata...');
            this.mapData.canvasWidth = this.dataString.match(/(?<=^ncols\s*)\d+/);
            if (canvasWidth === null) {
                throw parseError;
            }
            this.mapData.canvasHeight = this.dataString.match(/(?<=nrows\s*)\d+/);
            if (canvasHeight === null) {
                throw parseError;
            }
            this.mapData.noDataValue = this.dataString.match(/(?<=NODATA_value\s*)-?\d*\.\d+/);
            if (noDataValue === null) {
                throw parseError;
            }
    
            // Separate elevation data from metadata, only numbers should remain afterwards
            let findTheMatrixRegex = new RegExp('(?<=' + noDataValue.toString() + '\\s*)-?\\d+');
            let indexOfMatrix = this.dataString.search(findTheMatrixRegex);
            elevationData = this.dataString.slice(indexOfMatrix);
            console.log('Done.');
        }
        catch (err) {
            throw (err);
        }
    
        // Turn into an array, check if array size matches metadata
        console.log('Converting to array...');
        elevationData = elevationData.replace(/\r?\n/g, "");
        elevationData = elevationData.split(" ");
        console.log('Done.');
    
        if (elevationData.length != canvasHeight * canvasWidth) {
            throw ('Error: Unexpected map size.');
        }
    
        // Convert to float, change NODATA values to NaN
        console.log('Converting to float...');
        elevationData = elevationData.map(parseFloat);
    
        noDataValue = parseFloat(noDataValue);
        elevationData.forEach((_item, index, arr) => {
            if (arr[index] == noDataValue) {
                arr[index] = NaN;
            }
        });
        console.log('Done.');
        console.log('Finito'); // DEBUG
    } */
}

export default FileOpener;