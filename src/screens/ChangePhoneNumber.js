import React, {PureComponent} from 'react';
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from 'react-redux';
import {AppHeader, Separator} from "../components/";
import {
    Container,
    Text,
    Spinner,
    Button,
    Item,
    Label,
    Input,
} from 'native-base';
import I18n from "../strings/i18n";
import {phoneNumberChanged} from "../actions";
import {renderInputIcon} from "../helpers/validators";
import {
    button,
    text,
    container,
    color,
    input
} from "../style";

class ChangePhoneNumber extends PureComponent {
    onPhoneNumberChange = (text) => {
        this.props.phoneNumberChanged(text);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container style={container.signedInContainer}>
                    <AppHeader headerText={I18n.t('changePhoneNumberHeader')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Container style={{flex: 4, justifyContent: 'center'}}>
                        <Container style={[container.defaultFormStyle, {paddingTop: 10}]}>
                            <Label style={[text.defaultText, color.text]}>{I18n.t('changePhoneNumberLabel')}</Label>
                            <Item rounded style={[input.inputField, color.input]}>
                                <Input
                                    value={this.props.phoneNumber}
                                    onChangeText={this.onPhoneNumberChange}
                                    keyboardType="numeric"
                                    maxLength={8}
                                    placeholder={I18n.t('changePhoneNumberPlaceholder')}
                                    placeholderTextColor='#7F9BAA'
                                    style={color.text}
                                />
                                {renderInputIcon(this.props.phoneNumber, 8)}
                            </Item>
                        </Container>
                    </Container>

                    <Separator/>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.changeLoading) {
                                    this.onSavePress()
                                }
                            }}
                            style={[button.defaultButton, color.button]}
                    >
                        {this.props.changeLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {I18n.t('changePhoneNumberSaveButton')}
                            </Text>
                        )}
                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        phoneNumber,
        authError,
        authLoading,
        changeLoading
    } = auth;
};

const mapDispatchToProps = {
    phoneNumberChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhoneNumber);
