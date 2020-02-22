import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    onPurchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    onPurchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    onPurchaseContinueHandler = () => {
        alert("Order Purchased")
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount

        let updatedPrice = this.state.totalPrice
        updatedPrice = updatedPrice + INGREDIENT_PRICES[type]
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount > 0) {
            const updatedCount = oldCount - 1
            const updatedIngredients = { ...this.state.ingredients }
            updatedIngredients[type] = updatedCount

            let updatedPrice = this.state.totalPrice
            updatedPrice = updatedPrice - INGREDIENT_PRICES[type]
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            })
            this.updatePurchaseState(updatedIngredients)
        }
    }

    updatePurchaseState = (updatedIngredients) => {
        let sum = 0
        let updatedPurchaseable = false
        for (let item in updatedIngredients) {
            sum += updatedIngredients[item]
        }
        if (sum > 1) {
            updatedPurchaseable = true
        }
        this.setState({
            purchaseable: updatedPurchaseable
        })
    }

    render() {
        const disabled = { ...this.state.ingredients }
        for (let key in disabled) {
            disabled[key] = disabled[key] === 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.onPurchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelClicked={this.onPurchaseCancelHandler}
                        continueClicked={this.onPurchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAdd={this.addIngredientHandler}
                    onRemove={this.deleteIngredientHandler}
                    setDisabled={disabled}
                    currentPrice={this.state.totalPrice}
                    setOrderDisabled={this.state.purchaseable}
                    ordered={this.onPurchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;