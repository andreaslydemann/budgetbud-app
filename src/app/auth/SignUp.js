import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback, View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, AuthForm, ErrorInfo} from '../../components/index';
import {container, button, color} from "../../style/index";
import I18n from "../../strings/i18n";
import {
    cprNumberChanged,
    phoneNumberChanged,
    resetAuthState,
    signUp
} from "./auth_actions";

class SignUp extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    onPhoneNumberChange = (text) => {
        this.props.phoneNumberChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {cprNumber, phoneNumber} = this.props;
        this.props.signUp({cprNumber, phoneNumber}, () => {
            this.props.navigation.pop();
        });
    };

    onGoToSignInButtonPress = () => {
        this.props.resetAuthState(() => {
            this.props.navigation.pop();
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={container.signedOutContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>
                        <View style={[container.parentContainer, {flex: 2}]}>
                            <Logo style={{flex: 2}} logoText={I18n.t('signInLogoWelcome')}/>
                        </View>

                        <AuthForm handleSubmit={this.handleSubmit}
                                  onCprNumberChange={this.onCprNumberChange}
                                  onSecondInputChange={this.onPhoneNumberChange}
                                  cprNumber={this.props.cprNumber}
                                  secondInput={this.props.phoneNumber}
                                  authLoading={this.props.authLoading}
                                  isSignIn={false}
                        />

                        <Container>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToSignInButtonPress()}>
                                    <Label style={color.optionButton}>{I18n.t('signUpGoToSignIn')}</Label>
                                </Button>
                            </Container>

                            <ErrorInfo error={this.props.authError}/>
                        </Container>

                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    };
}

const mapStateToProps = ({auth}) => {
    return {cprNumber, phoneNumber, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    signUp,
    cprNumberChanged,
    phoneNumberChanged,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
