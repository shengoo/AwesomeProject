import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    RecyclerViewBackedScrollView
} from 'react-native';

export default class SearchHistory extends Component {
    constructor(props) {
        super(props);


        // this.state = {history:[]}
        this.updateHistory();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };

    }

    componentWillUpdate() {
        this.updateHistory();
    }

    updateHistory() {
        AsyncStorage.getItem('q', (error, result) => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (!result) {
                var data = JSON.stringify([this.state.text]);
                this.setState({history: "no history"})
                this.setState({
                    dataSource: ds.cloneWithRows([]),
                });
            } else {
                this.setState({history: JSON.parse(result)})
                this.setState({
                    dataSource: ds.cloneWithRows(JSON.parse(result)),
                });
            }
        })
    }


    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <TouchableOpacity><Text>{rowData}</Text></TouchableOpacity>}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={this._renderSeparator}
                enableEmptySections={true}
            />
        )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',}}
            />
        );
    }


}