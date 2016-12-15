/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


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
    Image
} from 'react-native';
import PeopleIndexScreen from './app/screens/PeopleIndexScreen';
import PersonShowScreen from './app/screens/PersonShowScreen';

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
    };

    renderScene(route, navigator){
        var globalNavigatorProps = {navigator};
        switch (route.ident){
            case 'index':
                return (
                    <PeopleIndexScreen {...globalNavigatorProps}>

                    </PeopleIndexScreen>
                );
            case 'detail':
                return (
                    <PersonShowScreen {...globalNavigatorProps} route={route}>

                    </PersonShowScreen>
                );
            default:
                return(
                    <Text style={{paddingTop:100}}>
                        Wrong route.
                    </Text>
                )
        }
    }

    routeMapper = {
        LeftButton: (route, navigator, index, navState) => {
            if (route.ident === 'index') {
                return null;
            } else {
                return (
                    <TouchableHighlight underlayColor={'gray'} onPress={() => navigator.pop()}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('./app/components/back.png')} style={{width: 20, height: 20}} />
                            <Text>Back</Text>
                        </View>
                    </TouchableHighlight>
                );
            }
        },
        RightButton: (route, navigator, index, navState) => {
            return null;
        },
        Title: (route, navigator, index, navState) => {
            return (<Text>{route.title}</Text>);
        },
    }

    navigationBar = (
        <Navigator.NavigationBar
            routeMapper={this.routeMapper}
            style={styles.navigationBarStyles}
            navigationStyles={Navigator.NavigationBar.StylesIOS}
        />
    )

    render() {


        const onPressSearch = () => {
            console.log(arguments)
        }

        const view = (
            <View style={styles.container}>

                <TextInput/>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fF9933'}}>
                    <Text style={{backgroundColor: 'gray', flex: 1}}>
                        'Save history'
                    </Text>
                    <Switch style={{backgroundColor: 'green'}}
                            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                            value={this.state.falseSwitchIsOn}/>
                </View>
                <Button
                    onPress={onPressSearch}
                    style={{height: 140}}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )





        return (
            <Navigator
                initialRoute={{ident:'index',title:'Search'}}
                ref="appNavigator"
                style={styles.navigatorStyles}
                renderScene={this.renderScene}
                navigationBar={this.navigationBar}
                />
        );
    }

}

const styles = StyleSheet.create({
    navigatorStyles:{
        paddingTop:56,
    },
    navigationBarStyles:{
        // backgroundColor: 'gray'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
