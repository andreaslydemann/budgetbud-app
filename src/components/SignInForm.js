import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Item, Input, Button, Form, Label} from 'native-base';

class SignInForm extends Component {
    renderError() {
        //Toast.show('This is a long toast.',Toast.LONG);
    };

    render() {
        return (
            <Container style={styles.container}>
                <Form style={{width: 300}}>
                    <Item rounded style={styles.itemStyle}>
                        <Input value={this.props.cprNumber}
                               onChangeText={this.props.onCprNumberChange}
                               keyboardType="numeric"
                               placeholder="CPR-nummer"
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                    </Item>

                    <Item rounded style={styles.itemStyle}>
                        <Input secureTextEntry
                               value={this.props.code}
                               onChangeText={this.props.onCodeChange}
                               keyboardType="numeric"
                               placeholder="Pinkode"
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                    </Item>

                    {
                        this.renderError()
                    }

                    <Button rounded

                            style={styles.buttonStyle}
                    >
                        <Label style={styles.buttonText}>Log ind</Label>
                    </Button>
                </Form>
            </Container>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemStyle: {
        marginTop: 10,
        height: 40,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    inputStyle: {
        color: '#ffffff'
    },
    buttonStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    }
});

export default SignInForm;
