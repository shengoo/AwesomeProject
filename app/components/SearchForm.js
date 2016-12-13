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
        try {
            AsyncStorage.getItem('q',(error, result)=>{
                let arr = [];
                if(result){
                    arr = JSON.parse(result);
                }
                arr.push(q);
                const data = JSON.stringify(arr);
                AsyncStorage.setItem('q',data,(error)=>{

                })
            })
        } catch (error) {
            // Error retrieving data
            // Alert.alert(error)
        }
        this.props.navigator.push({
            ident: "detail",
            title: this.state.text,
            person:{firstName:'hello'}
        });
        this.setState({text:''})
    };

    async getCache(key){
        try{
            let value = await AsyncStorage.getItem(key);
            return value.json();
        }
        catch(e){
            console.log('caught error', e);
            // Handle exceptions
        }

    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                <Button onPress={this.onButtonPress}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button" />
            </View>
        )
    }
}
