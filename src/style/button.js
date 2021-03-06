import {StyleSheet, Platform} from 'react-native';

export const button = StyleSheet.create({
    defaultButton: {
        width: '90%',
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    authButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#00263A',
        marginTop: 20,
        justifyContent: 'center'
    },
    optionButton: {
        height: 30,
        paddingLeft: 5
    },
    dialogButton: {
        flex: 1,
        height: 31,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        ...Platform.select({
            android: {
                paddingBottom: 50,
                height: 80
            }
        })
    },
    bottomRight: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 5
    },
    headerDialogButton: {
        height: 30,
        paddingBottom: 48,
        alignSelf: 'stretch'
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});
