import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        ingredientsError : false
    }

    componentDidMount() {
        axios.get('https://burger-builder-f7ec3.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response.data)
                this.setState({ ingredients: response.data })
            })
            .catch(error => this.setState({ingredientsError: error}))
    }

    onPurchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    onPurchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    onPurchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Dominic",
                address: {
                    street: "1 Zip Street",
                    zipCode: "124124"
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(() => this.setState({ loading: false, purchasing: false }))
            .catch(() => this.setState({ loading: false, purchasing: false }))
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

        let orderSummary = null
        let burger = this.state.ingredientsError ? <p>Cant fetch ingredients</p>: <Spinner />
        
        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAdd={this.addIngredientHandler}
                    onRemove={this.deleteIngredientHandler}
                    setDisabled={disabled}
                    currentPrice={this.state.totalPrice}
                    setOrderDisabled={this.state.purchaseable}
                    ordered={this.onPurchaseHandler} />
            </Aux>)
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                cancelClicked={this.onPurchaseCancelHandler}
                continueClicked={this.onPurchaseContinueHandler}
                price={this.state.totalPrice} />)
        };

        if(this.state.loading){
            orderSummary = <Spinner/>   
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.onPurchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);