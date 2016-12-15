import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'



export default class SearchHistoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={(event) => {this._navigateToPersonShow(this.props.data)} }>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.data}</Text>
                    <Image source={require('./more.png')} style={{width: 30, height: 30}} />
                </View>
            </TouchableOpacity>
        );
    }
    _navigateToPersonShow(data) {
        console.log(this.props)
        this.props.navigator.push({
            ident: "detail",
            title:data,
            code:data
        })
    }
}

var styles = StyleSheet.create({
    container: {
        height: 65,
        flexDirection: 'row',
        alignItems:'center',
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