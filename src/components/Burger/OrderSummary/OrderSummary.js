import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total Price: ${props.price.toFixed(2)}</strong>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.cancelClicked}>Cancel</Button>
            <Button buttonType="Success" clicked={props.continueClicked}>Continue</Button>
        </Aux>
    )
};

export default orderSummary;