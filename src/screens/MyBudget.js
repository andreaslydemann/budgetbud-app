import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Icon,
    ListItem,
    Text,
    View,
    Label,
    Spinner
} from "native-base";
import {AppHeader, Separator, Toolbox} from "../components/";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {getBudget, getCategories, getDebts} from "../actions";
import I18n from "../strings/i18n";

class MyBudget extends Component {
    componentWillMount() {
        this.props.getBudget(this.props.budgetID, () => {
            this.props.navigation.navigate('CreateBudget')
        });

        this.props.getCategories(this.props.budgetID);
        this.props.getDebts(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        console.log(this.props.debts)
        return (
            <Container style={{flexGrow: 1}}>
                {/*---HEADER---*/}
                <AppHeader headerText={I18n.t('myBudgetHeader')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />
                <Container style={{flex: 4, justifyContent: 'center'}}>
                    {this.props.loading ? (
                        <Spinner style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} color='#1c313a'/>) : (
                        <Container>
                            <View style={[styles.incomeFormStyle, {flex: 0.1, alignItems: 'center'}]}>
                                <Text style={styles.listText}>{I18n.t('budgetIncome')}
                                </Text>
                                <Text style={styles.listText}>{this.props.income} {I18n.t('currency')}
                                </Text>
                            </View>

                            <Separator/>

                            <View style={{flex: 0.7, alignSelf: 'stretch'}}>
                                <View style={styles.incomeFormStyle}>
                                    <Label style={styles.textStyle}>{I18n.t('budgetExpenses')}
                                    </Label>
                                </View>
                                <FlatList
                                    data={this.props.categories}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.id}
                                />
                            </View>

                            <Separator/>

                            {this.props.debts.length !== 0 &&
                            <View style={[this.props.debts.length > 2 ?
                                {flex: 0.25, alignSelf: 'stretch'} :
                                {flex: 0.125, alignSelf: 'stretch'}]}>
                                <View style={styles.incomeFormStyle}>
                                    <Label style={styles.textStyle}>{I18n.t('budgetDebts')}</Label>
                                </View>
                                <FlatList
                                    data={this.props.debts}
                                    renderItem={this.renderDebt}
                                    keyExtractor={item => item.name}
                                />
                                <Separator/>
                            </View>
                            }

                            <View style={[styles.newStyle]}>
                                <View style={styles.budgetSummary}>
                                    <View style={styles.incomeFormStyle}>
                                        <Text style={styles.listText}>
                                            {I18n.t('budgetTotalExpenses')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.totalExpenses} {I18n.t('currency')}
                                        </Text>
                                    </View>

                                    <View style={styles.incomeFormStyle}>
                                        <Text style={styles.listText}>
                                            {I18n.t('budgetDisposable')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.disposable} {I18n.t('currency')}
                                        </Text>
                                    </View>

                                    <Button transparent
                                            onPress={() => this.bottomModal.showModal()}
                                            style={styles.buttonStyle}
                                    >
                                        <Icon name="ios-arrow-dropup-circle"
                                              style={{color: "#1c313a"}}/>
                                    </Button>

                                    <Toolbox
                                        ref={(bottomModal) => {
                                            this.bottomModal = bottomModal
                                        }}
                                        navigateUser={this.navigateUser}
                                    />
                                </View>
                            </View>
                        </Container>
                    )}
                </Container>
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text style={styles.listText}>{item.categoryData.name}</Text>
                </Body>
                <Text style={[styles.listText, {justifyContent: 'flex-end'}]}>
                    {item.categoryData.amount} {I18n.t('currency')}
                </Text>
            </ListItem>
        );
    };

    renderDebt = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text style={styles.listText}>{item.debtData.name}</Text>
                </Body>
                <Text style={[styles.listText, {justifyContent: 'flex-end'}]}>
                    {item.debtData.amount} {I18n.t('currency')}</Text>
            </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    incomeFormStyle: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '3%'
    },
    newStyle: {
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 0.30
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    },
    spacedText: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: 10
    },
    budgetSummary: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%'
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    listText: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        fontSize: 16
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    const categories = state.category.categories;
    const debts = state.debt.debts;
    const {
        loading,
        income,
        totalExpenses,
        disposable,
        destination,
        budgetID
    } = state.budget;

    return {categories,
        loading,
        income,
        debts,
        totalExpenses,
        disposable,
        destination,
        budgetID}
};

export default connect(mapStateToProps, {
    getBudget, getCategories, getDebts
})(MyBudget);
