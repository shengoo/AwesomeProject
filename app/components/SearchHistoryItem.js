import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


export default class SearchHistoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={(event) => {this._navigateToPersonShow(this.props.data)} }>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.data}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _navigateToPersonShow(data) {
        console.log(this.props)
        this.props.navigator.push({
            ident: "detail",
            title:data,
        })
    }
}

var styles = StyleSheet.create({
    container: {
        height: 65,
        flexDirection: 'row',
        padding: 10,
        backgroundColor:'white'
    },

    title: {
        fontSize: 17,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 10,
        flex: 9,
        textAlign: 'left'
    },

    disclosureIndicator: {
        marginRight: 10,
        alignSelf: 'center'
    },

    separator: {
        height: 0.3,
        backgroundColor: '#C8C7CC',
        marginBottom: 0,
    }
});