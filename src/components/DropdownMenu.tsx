import React, { useState } from "react";
import "./DropdownMenu.css";

export interface DropdownItem {
	label: string;
	value: string;
}

interface DropdownMenuProps {
	label: string;
	items: any[];
	defaultSelected?: string;
	setState?: any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items, defaultSelected, setState }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropItems = arrayToDropdownItem(items, label);
	const [selectedItem, setSelectedItem] = useState<string>(defaultSelected || dropItems[0].value);

	const toggleDropdown = (): void => setIsOpen(!isOpen);

	const handleItemClick = (item: string): void => {
		setSelectedItem(item);
		setState(item);
		setIsOpen(false);
	};

	return (
		<div className="dropdown-container">
			<label className="dropdown-label">{label}</label>
			<div className="dropdown">
				<div className="dropdown-header" onClick={toggleDropdown}>
					{selectedItem}
					<span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
				</div>
				{isOpen && (
					<ul className="dropdown-list">
						{dropItems.map((item) => (
							<li key={item.label} onClick={() => handleItemClick(item.value)}>
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
