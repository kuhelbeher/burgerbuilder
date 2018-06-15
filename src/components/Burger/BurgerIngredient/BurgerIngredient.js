import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './burgerIngredient.sass';

class BurgerIngredient extends Component {
	render() {
		let ingredient = null;

		switch (this.props.type) {
			case ('bread-bottom'):
				ingredient = <div className={classes.BreadBottom}></div>;
				break;
			case ('bread-top'):
				ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1}></div>
						<div className={classes.Seeds2}></div>
					</div>
				);
				break;
			case ('meat'):
				ingredient = <div className={classes.Meat}></div>;
				break;
			case ('salad'):
				ingredient = <div className={classes.Salad}></div>;
				break;
			case ('bacon'):
				ingredient = <div className={classes.bacon}></div>;
				break;
			default:
				ingredient = null;
		}
		return (
			ingredient
		)
	};
};

burgerIngredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredient;
