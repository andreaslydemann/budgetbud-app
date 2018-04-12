import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
    AppHeader,
    ConfirmDialog,
    Separator
} from "../components/";
import {button, text} from "../style/";
import {
    Container,
    Button,
    ListItem,
    Body,
    Right,
    Icon,
    Text,
    Spinner
} from 'native-base';
import I18n from "../strings/i18n";
import {
    resetDebtForm,
    debtSelected,
    getDebts,
    deleteDebt
} from "../actions";
import {container, color} from "../style";

class DebtOverview extends PureComponent {
    onCreateDebtPress = () => {
        this.props.resetDebtForm(() => {
            this.props.navigation.navigate('CreateDebt');
        });
    };

    deleteDebt = () => {
        this.confirmDialog.dismissDialog();
        this.props.deleteDebt(this.props.selectedDebt.id);
    };

    onDebtSelect = (debt) => {
        this.props.debtSelected(debt);
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <ConfirmDialog
                    title={I18n.t('confirmDialogDeletionHeader')}
                    text={I18n.t('debtOverviewConfirmDialogBody')}
                    confirmCallback={() => this.deleteDebt()}
                    debtLoading={this.props.debtLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={I18n.t('debtOverviewHeader')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Container style={{flex: 4, justifyContent: 'center'}}>
                        {this.props.debtLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>) : (
                            <FlatList
                                data={this.props.debts}
                                renderItem={this.renderItem}
                            />
                        )}
                    </Container>

                    <Separator/>

                    <Button rounded
                            onPress={() => this.onCreateDebtPress()}
                            style={[button.defaultButton, color.button]}
                    >
                        <Text style={text.submitButtonText}>{I18n.t('debtOverviewCreateDebtButton')}</Text>
                    </Button>
                </Container>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text color={color.text}>{item.name}</Text>
                <Text color={color.text} note>{item.totalAmount} {I18n.t('currency')}</Text>
                </Body>
                <Right>
                    <View style={{flexDirection: 'row'}}>
                        <Icon
                            onPress={() => {
                                this.onDebtSelect(item);
                                this.props.navigation.navigate('EditDebt');
                            }}
                            style={{marginRight: 7, fontSize: 30}}
                            name="md-create"/>
                        <Icon
                            onPress={() => {
                                this.onDebtSelect(item);
                                this.confirmDialog.showDialog()
                            }}
                            style={{marginHorizontal: 7, fontSize: 30}}
                            name="md-trash"/>
                    </View>
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {debtLoading, selectedDebt} = state.debt;

    const debts = _.map(state.debt.debts, (item, key) => {
        return {...item.debtData, debtID: item.id, key: key};
    });

    return {budgetID, debts, debtLoading, selectedDebt};
};

const mapDispatchToProps = {
    resetDebtForm, debtSelected, deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtOverview);
