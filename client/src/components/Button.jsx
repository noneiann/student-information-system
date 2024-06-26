import React from "react";
import "../styles/Button.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];
export const Button = ({
	children,
	type,
	onClick,
	buttonStyle,
	buttonSize,
	id,
}) => {
	const checkButtonStyle = STYLES.includes(buttonStyle)
		? buttonStyle
		: STYLES[0];

	const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

	return (
		<button
			id={id}
			className={`btn ${checkButtonStyle} ${checkButtonSize}`}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};
