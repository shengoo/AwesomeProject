import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
    TextInput,
    Switch,
    Navigator,
    TouchableHighlight,
    ListView,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import * as SearchActions from '../actions/SearchActions';

export default class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {text:''}
        // AsyncStorage.removeItem('q')
    }

    onButtonPress = () => {
        const q = this.state.text;
        if(!q){
            Alert.alert('fill in your')
            return;
        }
        SearchActions.createItem(q);
        this.props.navigator.push({
            ident: "detail",
            title: this.state.text,
            person:{firstName:'hello'}
        });
        this.setState({text:''})
    };


    render() {
        return (
            <View>
                <Text style={styles.headerText}>Search</Text>
                <View style={[styles.viewContainer, this.props.style || {}]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        returnKeyType={'search'}
                        maxLength={13}
                        placeholder={'input your search query'}
                        onSubmitEditing={this.onButtonPress}
                        blurOnSubmit={false}
                    />
                    {/*<Button*/}
                    {/*onPress={this.onButtonPress}*/}
                    {/*title="Learn More"*/}
                    {/*color="#841584"*/}
                    {/*accessibilityLabel="Learn more about this purple button" />*/}
                    <View style={styles.saveButtonContainer}>
                        <TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
                                            onPress={this.onButtonPress.bind(this)}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor:'white',
        // padding:10
    },
    input: {
        // padding: 1,
        // // marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
        borderWidth: 0,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: '#48bbec',
        alignSelf: 'stretch',
        // flex: 1,
        // height: 30
    },
    saveButtonContainer: {
        // flex: 3, //1
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    saveButton: {
        height: 49,
        backgroundColor: '#42e47e',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 0,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    },
    headerText: {
        fontSize: 20,
        textAlign:'center'
    },
})