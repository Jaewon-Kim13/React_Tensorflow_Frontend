import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";

function Predict() {
	const [test, setTest] = useState<boolean>(false);

	return (
		<>
			<div>
				OPEN POPUP: {`State: ${test}\n`}
				<button onClick={() => setTest((prevState) => !prevState)}>TOGGLE</button>
				<Popup state={test} setState={setTest}>
					TEST POPUP
				</Popup>
			</div>
		</>
	);
}

export default Predict;
