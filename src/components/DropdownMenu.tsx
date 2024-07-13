import React, { useState } from "react";
import "./DropdownMenu.css";
import { updateLayer } from "../scripts/NeuralScripts";

export interface DropdownItem {
	label: string;
	value: any;
}

interface Props {
	label: string;
	items: any[];
	setState: any;
	state: any;
}

const DropdownMenu = ({ label, items, setState, state }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropItems = arrayToDropdownItem(items, label);

	const toggleDropdown = (): void => setIsOpen(!isOpen);

	const handleOnClick = (item: any) => {
		toggleDropdown();
		setState(item);
	};
	return (
		<div className="dropdown-container">
			<label className="dropdown-label">{label}</label>
			<div className="dropdown">
				<div className="dropdown-header" onClick={toggleDropdown}>
					{state}
					<span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
				</div>
				{isOpen && (
					<ul className="dropdown-list">
						{dropItems.map((item, index) => (
							<li key={item.label} onClick={() => handleOnClick(item.value)}>
								{item.value}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

const arrayToDropdownItem = (items: any[], label: string) => {
	let dropdownItems: DropdownItem[] = [];
	items.map((value, index) => {
		let temp = { label: label + index, value: value };
		dropdownItems.push(temp);
	});
	return dropdownItems;
};

export default DropdownMenu;
