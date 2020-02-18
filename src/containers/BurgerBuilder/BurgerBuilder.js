import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
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
        }
    }

    render() {
        const disabled = {...this.state.ingredients}
        for(let key in disabled){
            disabled[key] = disabled[key] === 0
        }
        console.log(disabled)

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls onAdd={this.addIngredientHandler} onRemove={this.deleteIngredientHandler} setDisabled={disabled} currentPrice={this.state.totalPrice}></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;