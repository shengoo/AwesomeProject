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
    ListView
} from 'react-native';
import ViewContainer from './app/components/ViewContainer';

const people = [
    {firstName: 'jordan', lastName: 'leigh', roomNumber: 30},
    {firstName: 'will', lastName: 'piers', roomNumber: 14},
    {firstName: 'berkeley', lastName: 'wanner', roomNumber: 3}
]

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        this.state = {
            peopleDataSource: ds.cloneWithRows(people)
        }
    }

    state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
    };

    render() {
        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];
        console.log(routes);
        const renderScene = (route, navigator) => {
            console.log(arguments)
            if (route.index === 0) {
                return (
                    <TouchableHighlight onPress={() => {
                        if (route.index === 0) {
                            navigator.push(routes[1]);
                        } else {
                            navigator.pop();
                        }
                    }}>
                        <Text>Hello {route.index}!</Text>
                    </TouchableHighlight>
                )
            } else {
                return (
                    <TouchableHighlight onPress={() => {
                        if (route.index === 0) {
                            navigator.push(routes[1]);
                        } else {
                            navigator.pop();
                        }
                    }}>
                        <Text>Hello {route.index}!</Text>
                    </TouchableHighlight>
                )
            }
        }

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
                            style={{}}
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

        const routeMapper = {
            LeftButton: (route, navigator, index, navState) => {
                if (route.index === 1) {
                    return (<Text>Back</Text>)
                } else {
                    return null;
                }
            },
            RightButton: (route, navigator, index, navState) => {
                return (<Text>Done</Text>);
            },
            Title: (route, navigator, index, navState) => {
                return (<Text>Awesome Nav Bar</Text>);
            },
        }

        const navigationBar = (
            <Navigator.NavigationBar
                routeMapper={routeMapper}
                style={{backgroundColor: 'gray'}}
            />
        )

        const nav = (
            <Navigator
                initialRoute={{title: 'Awesome Scene', index: 0}}
                renderScene={renderScene}
                navigationBar={navigationBar}
                style={{padding: 100}}
            />
        );

        return (
            <ViewContainer>
                <Text>Hello</Text>
                <ListView
                    style={{marginTop:100}}
                    dataSource={this.state.peopleDataSource}
                    renderRow={(person)=>{return this._renderPersonRow(person)}}/>
            </ViewContainer>

        );
    }

    _renderPersonRow(person) {
        return (
            <View style={styles.personRow}>
                <Text style={styles.personName}>{person.firstName}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    personRow:{
        flexDirection:'row',
        justifyContent:'center'
    },
    personName:{
        // textTransform:'capitalize'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
