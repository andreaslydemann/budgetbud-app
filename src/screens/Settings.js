import React, {Component} from 'react';
import {
    Container,
    Content,
    List,
    ListItem,
    Label,
    Body,
    Left,
    Right,
    Icon
} from "native-base";
import {AppHeader, ConfirmDialog} from "../components/";
import {connect} from "react-redux";
import I18n from "../strings/i18n";
import {deleteBudget} from "../actions";
import {container} from "../style";

class Settings extends Component {
    deleteBudget = () => {
        const {budgetID} = this.props;
        this.props.deleteBudget({budgetID}, () => {
            this.props.navigation.navigate('CreateBudget');
        });
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <ConfirmDialog
                    title={I18n.t('confirmDialogDeletionHeader')}
                    text={I18n.t('settingsConfirmDialogBody')}
                    confirmCallback={() => this.deleteBudget()}
                    budgetLoading={this.props.budgetLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={I18n.t('settingsHeader')}
                               onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                    <Content>
                        <List>
                            <ListItem icon onPress={() => this.props.navigation.navigate("UserDetails")}>
                                <Left>
                                    <Icon name="md-person"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('settingsUserDetails')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.props.navigation.navigate("Accounts")}>
                                <Left>
                                    <Icon name="md-card"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('settingsAccounts')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="md-notifications-outline"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('settingsAlarms')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.confirmDialog.showDialog()}>
                                <Left>
                                    <Icon name="md-trash"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('settingsDeleteBudget')}</Label>
                                </Body>
                                <Right >
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    return {budgetID} = budget;
};

const mapDispatchToProps = {
    deleteBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
