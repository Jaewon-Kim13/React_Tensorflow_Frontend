import React, { useEffect } from "react";

interface Props {
	hiddenLayers: any;
	setHiddenLayers: any;
	activation: any;
	setActivation: any;
	lambda: any;
	setLambda: any;
	loss: any;
	setLoss: any;
}

function ParamaterForum({
	hiddenLayers,
	setHiddenLayers,
	activation,
	setActivation,
	lambda,
	setLambda,
	loss,
	setLoss,
}: Props) {
	useEffect(() => {}, [hiddenLayers, activation, lambda, loss]);

	return <div>ParamaterForum</div>;
}

export default ParamaterForum;

//will use switch function to return the correct loss function!
function lossToFunction(loss: string) {
	let lossFunction;

	return lossFunction;
}

//will use switch function to return the correct activation function!
function activationToFunctiopn(activation: string) {
	let activationFunction;

	return activationFunction;
}
