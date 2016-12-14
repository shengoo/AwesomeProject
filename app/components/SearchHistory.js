import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import SearchStore from '../stores/SearchStore';
import SearchHistoryItem from './SearchHistoryItem';


export default class SearchHistory extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            history: SearchStore.getAll(),
            dataSource: this.ds.cloneWithRows(SearchStore.getAll()),
        };

        this.getHistory = this.getHistory.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        SearchStore.on('change', this.getHistory);
    }

    componentWillUnmount() {
        SearchStore.removeListener('change', this.getHistory);
    }

    getHistory() {
        this.setState({
            dataSource: this.ds.cloneWithRows(SearchStore.getAll()),
        });
    }


    render() {
        return (
            <View>
                <Text style={styles.headerText}>History</Text>
                <ListView
                    style={styles.history}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        )
    }


    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                    left:10}}
            />
        );
    }

    renderRow(rowData, sectionID, rowID) {
        //(rowData) => <TouchableOpacity><Text>{rowData}</Text></TouchableOpacity>
        return (
            <SearchHistoryItem   {...this.props} data={rowData}/>
        )
    }



}

const styles = StyleSheet.create({
    history:{
        // marginLeft:10
    },
    headerText: {
        fontSize: 20,
        textAlign:'center'
    },
});