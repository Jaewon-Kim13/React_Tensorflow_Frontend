import React, { useState } from "react";
import "./DropdownMenu.css";

export interface DropdownItem {
	label: string;
	value: string;
	handleOnClick?: any;
}

interface DropdownMenuProps {
	label: string;
	items: DropdownItem[];
	defaultSelected?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items, defaultSelected }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<string>(defaultSelected || items[0].label);

	const toggleDropdown = (): void => setIsOpen(!isOpen);

	const handleItemClick = (item: string): void => {
		setSelectedItem(item);
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
						{items.map((item) => (
							<li key={item.value} onClick={() => handleItemClick(item.label)}>
								{item.label}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default DropdownMenu;
