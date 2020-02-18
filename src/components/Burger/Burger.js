import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    // Below is some complex way which I need to understand,
    // provided by the instructor to create this transformed ingredients array

    // let transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey} />
    //         })
    //     }).reduce((arr,el) =>{
    //         return arr.concat(el)
    //     }, []);

    // This is my way created to represent the above logic
    let transformedIngredients = [];
    for( let item in props.ingredients){
        for(let i = 0; i < props.ingredients[item]; i++){
            transformedIngredients.push(<BurgerIngredient key={item+i} type={item} />)
        }
    }

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;