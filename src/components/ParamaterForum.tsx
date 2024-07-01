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
	//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression
	const lossList = ["sigmod-cross-entropy", "softmax-cross-entropy", "mean-square-error"];
	const activationList = [
		"elu",
		"hardSigmoid",
		"linear",
		"relu",
		"relu6",
		"selu",
		"sigmoid",
		"softmax",
		"softplus",
		"softsign",
		"tanh",
		"swish",
		"mish",
		"gelu",
		"gelu_new",
	];

	useEffect(() => {}, [hiddenLayers, activation, lambda, loss]);

	return <div>ParamaterForum</div>;
}

export default ParamaterForum;

//will use switch function to return the correct loss function!
//loss functions are applied to the output layer!
function lossToFunction(loss: string) {
	let lossFunction;
	switch (loss) {
		case "sigmod-cross-entropy":
			lossFunction = "replace!";
			break;
		case "softmax-cross-entropy":
			lossFunction = "replace!";
			break;
		case "mean-square-error":
			lossFunction = "replace!";
			break;
	}
	return lossFunction;
}

//Look up tf.layers.dense on Tensorflow.js documentation
/*const model_s = tf.sequential({
  layers: [
    tf.layers.dense({ units: 6, activation: 'relu', name: 'L1' }),
    tf.layers.dense({ units: 6, activation: 'linear', name: 'L3' })
  ],
  name: 'Simple'
});

model_s.compile({
  loss: 'sparseCategoricalCrossentropy',
  optimizer: tf.train.adam(0.01),
  from_logits: true
});

const model_predict_s = (Xl) => {
  return tf.tidy(() => {
    const predictions = model_s.predict(Xl);
    const softmaxPreds = tf.softmax(predictions);
    return softmaxPreds.argMax(1).dataSync();
  });
}; */
