import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import * as SearchActions from '../actions/SearchActions';

export default class SearchResult extends Component{
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading:true,
            dataSource: this.ds.cloneWithRows([]),
        }

    }

    componentDidMount(){
        fetch('https://api.github.com/search/repositories?q=' + this.props.route.code)
            .then((response) => response.json())
            .then(responseJson=>{
                this.setState({
                    loading:false,
                    data:responseJson.items,
                    dataSource: this.ds.cloneWithRows(responseJson.items),
                })
            })
            .catch((error) => {
                this.setState({
                    loading:false,
                    data:[],
                    dataSource: this.ds.cloneWithRows([]),
                })
            });
    }

    onButtonPress(){
        SearchActions.deleteItem(this.props.route.code);
        this.props.navigator.pop();
    }

    render(){
        return (
            this.state.loading ?
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                />
                :
                this.state.data.length?
                    <View style={{flex:1}}>
                        <ListView style={{flex:1}}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            renderSeparator={this._renderSeparator}
                            enableEmptySections={true}
                        />
                        <View style={styles.saveButtonContainer}>
                            <TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
                                                onPress={this.onButtonPress.bind(this)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    :
                    <View style={{flex:1}}>
                        <Text style={{flex:1}}>nothing</Text>
                        <View style={styles.saveButtonContainer}>
                            <TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
                                                onPress={this.onButtonPress.bind(this)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableHighlight>
                        </View>
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
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',height:30}}>
                <Text style={{flex:1}}>{rowData.id}</Text>
                <Text>{rowData.name}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    centering: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    gray: {
        backgroundColor: '#cccccc',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
    },
    saveButtonContainer: {
        // flex: 3, //1
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    saveButton: {
        height: 49,
        backgroundColor: '#42e47e',
        // marginLeft: 20,
        // marginRight: 20,
        marginBottom: 0,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    },
});