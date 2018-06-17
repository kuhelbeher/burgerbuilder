import React from 'react';

import classes from './Toolbar.sass';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<div onClick={props.clicked}>Mss</div>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default toolbar;
