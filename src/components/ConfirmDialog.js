import React, {Component} from 'react';
import {View} from "react-native";
import {Container, Label, Spinner} from "native-base";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';

class ConfirmDialog extends Component {
    showDialog() {
        this.popupDialog.show();
    }

    render() {
        return (
            <View style={{zIndex: 1}}>
                <PopupDialog
                    width={0.8}
                    dialogTitle={<DialogTitle title={this.props.title}/>}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog
                    }}
                    dismissOnTouchOutside={false}
                >
                    <Container style={styles.dialogContentView}>
                        {this.props.loading ? (<Spinner color='#002940' style={styles.spinner}/>) : (<View/>)}
                        <View style={styles.dialogLabelContainer}>
                            <Label style={styles.dialogLabel}>{this.props.text}</Label>
                        </View>
                        <View style={styles.dialogButtonsContainer}>
                            <DialogButton
                                buttonStyle={styles.dialogButton}
                                textContainerStyle={styles.dialogButton1TextContainer}
                                textStyle={styles.dialogButtonText}
                                text="Afbryd"
                                onPress={() => {
                                    if (!this.props.loading)
                                        this.popupDialog.dismiss();
                                }}
                                key="button-1"
                            />
                            <DialogButton
                                buttonStyle={styles.dialogButton}
                                textContainerStyle={styles.dialogButton2TextContainer}
                                textStyle={styles.dialogButtonText}
                                text="Ok"
                                onPress={() => {
                                    if (!this.props.loading)
                                        this.popupDialog.show();
                                }}
                                key="button-2"
                            />
                        </View>
                    </Container>
                </PopupDialog>
            </View>
        );
    }
}

const styles = {
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogButton: {
        flex: 1,
        height: 31,
        alignSelf: 'stretch'
    },
    dialogButton1TextContainer: {
        backgroundColor: '#002940',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: '#fff',
        borderRightWidth: 1
    },
    dialogButton2TextContainer: {
        backgroundColor: '#002940',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: '#fff',
        borderLeftWidth: 1
    },
    dialogButtonsContainer: {
        flexDirection: 'row',
        flex: 1
    },
    dialogButtonText: {
        color: '#fff'
    },
    dialogLabelContainer: {
        flex: 4,
        justifyContent: 'center'
    },
    dialogLabel: {
        textAlign: 'center'
    },
    spinner: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 63,
    }
};

export default ConfirmDialog;