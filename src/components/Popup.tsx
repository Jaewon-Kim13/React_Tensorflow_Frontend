import React, { ReactNode, useEffect } from "react";
import "./Popup.css";

interface Props {
	state: boolean;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	children?: ReactNode;
}

function Popup({ state, setState, children }: Props) {
	return (
		<>
			{state && (
				<div className="popup-container">
					<div className="popup-content">
						{children}
						<button onClick={() => setState(false)}>close</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Popup;
