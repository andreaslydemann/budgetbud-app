import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {
    Container,
    Content,
    Button,
    Spinner,
    ListItem,
    Body,
    Right,
    Text
} from "native-base";
import _ from 'lodash';
import {AppHeader, Separator} from "../components/";
import {connect} from "react-redux";
import {button, text, container} from "../style/";
import {getDebts, createDebt, editDebt, getCategories} from "../actions";
import I18n from "../strings/i18n";

class DebtPreview extends Component {
    onSavePress = async () => {
        if (this.props.selectedDebt)
            await this.props.editDebt(this.props);
        else
            await this.props.createDebt(this.props);

        this.props.navigation.pop(2);
        this.props.getDebts(this.props.budgetID);
        this.props.getCategories(this.props.budgetID);
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('debtPreviewHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>
                    <FlatList
                        data={this.props.categoryDebtItems}
                        renderItem={this.renderItem}
                    />
                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={button.defaultButton}
                >
                    {this.props.debtLoading ? (
                        <Spinner color='#D0D0D0'/>) : (
                        <Text style={text.submitButtonText}>
                            {I18n.t('debtPreviewSaveButton')}
                        </Text>
                    )}
                </Button>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <View style={container.fullWidth}>
                    <Body>
                    <Text>{item.name}</Text>
                    </Body>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{flex: 1}}>
                        <Text note>{I18n.t('debtPreviewBefore')}</Text>
                        <Text note>{I18n.t('debtPreviewAfter')}</Text>
                        </Body>
                        <Right style={{flex: 2}}>
                            <Text note>{item.beforeAmount} {I18n.t('currency')}</Text>
                            <Text note>{item.afterAmount} {I18n.t('currency')} (-
                                {item.amountToSubtract} {I18n.t('currency')})
                            </Text>
                        </Right>
                    </View>
                </View>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, totalAmount, expirationDate, selectedDebt, debtLoading} = state.debt;
    const {
        categories,
        categoriesOfDebt,
        selectedCategories,
        categorySubtractions,
    } = state.category;

    const categoryDebtItems = _.map(selectedCategories, (item, key) => {
        const categorySubtraction = categorySubtractions.filter((obj) => {
            return obj.categoryID === item.toString();
        });

        const category = categories.filter((obj) => {
            return obj.id === item.toString();
        });

        const amountToSubtract = categorySubtraction[0].amountToSubtract;
        let categoryOfDebtAmount = 0;

        if (selectedDebt) {
            const categoryOfDebt = categoriesOfDebt.filter((obj) => {
                return obj.categoryID === item.toString();
            });

            categoryOfDebtAmount = categoryOfDebt[0] ? categoryOfDebt[0].amount : 0;
        }

        const beforeAmount = category[0].categoryData.amount + categoryOfDebtAmount;

        return {
            amountToSubtract: amountToSubtract,
            beforeAmount: beforeAmount,
            afterAmount: (beforeAmount - amountToSubtract),
            name: category[0].categoryData.name,
            categoryID: item,
            key: key
        };
    });

    return {
        name,
        totalAmount,
        expirationDate,
        categoryDebtItems,
        selectedDebt,
        debtLoading,
        budgetID
    };
};

const mapDispatchToProps = {
    getDebts,
    createDebt,
    editDebt,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtPreview);
