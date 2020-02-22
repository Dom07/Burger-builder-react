import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
]

const buildControls = (props) => {
    return(
         <div className={classes.BuildControls}>
             <p>Current Price: {props.currentPrice.toFixed(2)}</p>
             {controls.map(elem=>(
                  <BuildControl 
                  add={props.onAdd} 
                  remove={props.onRemove} 
                  key={elem.label} 
                  label={elem.label} 
                  type={elem.type} 
                  disable={props.setDisabled[elem.type]}/>
             ))}
             <button 
             className={classes.OrderButton} 
             disabled={!props.setOrderDisabled}
             onClick={props.ordered}>
                 ORDER NOW
            </button>
         </div>
    )
};

export default buildControls;