
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
    TouchableOpacity
} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class PersonShowScreen extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <ViewContainer style={{backgroundColor:'red'}}>
                <Text>Result</Text>
            </ViewContainer>

        );
    }

}

const styles = StyleSheet.create({

});


