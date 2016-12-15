import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Switch,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
} from 'react-native';

import * as SearchActions from '../actions/SearchActions';
const dismissKeyboard = require('dismissKeyboard')

export default class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {text:'',saveHistory:true}
        // AsyncStorage.removeItem('q')
    }

    onButtonPress = () => {
        dismissKeyboard();
        const q = this.state.text;
        if(!q){
            Alert.alert('fill in your')
            return;
        }
        if(this.state.saveHistory){
            SearchActions.createItem(q);
        }
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1}}>
                            Save history
                        </Text>
                        <Switch
                                onValueChange={(value) => this.setState({saveHistory: value})}
                                value={this.state.saveHistory}/>
                    </View>
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
        marginLeft: 20,
        marginRight: 20,
        // padding:10
    },
    input: {
        // padding: 1,
        // // marginTop: 20,
        // marginLeft: 20,
        // marginRight: 20,
        fontSize: 18,
        // borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
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
    headerText: {
        fontSize: 20,
        textAlign:'center',
        padding:20
    },
})