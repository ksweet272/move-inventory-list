import React, { useState } from 'react';
import Downshift from 'downshift';
import './InventoryList.css';

const itemData = [
    { name: '3 Cushion Sofa', cubicFeet: 35 },
    { name: 'Chest', cubicFeet: 12 },
    // ... include all other items here
];

const InventoryList = () => {
    const [items, setItems] = useState([{ name: '', quantity: '', cubicFeet: 0, totalCubicFeet: 0 }]);

    const handleItemChange = (selectedItem, index) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    name: selectedItem.name,
                    cubicFeet: selectedItem.cubicFeet,
                    totalCubicFeet: item.quantity * selectedItem.cubicFeet
                };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleQuantityChange = (quantity, index) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity,
                    totalCubicFeet: quantity * item.cubicFeet
                };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: '', cubicFeet: 0, totalCubicFeet: 0 }]);
    };

    const handleSubmit = () => {
        console.log("Submitting Inventory List", items);
        // Add logic here for what happens when the inventory list is submitted
    };

    return (
        <div className="inventory-list">
            <div className="table-header">
                <div>Item Name</div>
                <div>Quantity of Item</div>
                <div>Cubic Feet Per Item</div>
                <div>Total Cubic Feet</div>
            </div>
            {items.map((item, index) => (
                <div key={index} className="item-row">
                    <Downshift
                        onChange={(selectedItem) => handleItemChange(selectedItem, index)}
                        itemToString={(item) => (item ? item.name : '')}
                    >
                        {({
                            getInputProps,
                            getItemProps,
                            getMenuProps,
                            isOpen,
                            highlightedIndex,
                            selectedItem,
                        }) => (
                            <div className="dropdown">
                                <input {...getInputProps()} />
                                <ul {...getMenuProps()}>
                                    {isOpen
                                        ? itemData.map((item, itemIndex) => (
                                            <li
                                                {...getItemProps({
                                                    key: item.name,
                                                    index: itemIndex,
                                                    item,
                                                    style: {
                                                        backgroundColor:
                                                            highlightedIndex === itemIndex ? 'lightgray' : 'white',
                                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                    },
                                                })}
                                            >
                                                {item.name}
                                            </li>
                                        ))
                                        : null}
                                </ul>
                            </div>
                        )}
                    </Downshift>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(e.target.value, index)}
                        className="quantity-input"
                    />
                    <div className="cubic-feet">{item.cubicFeet}</div>
                    <div className="total-cubic-feet">{item.totalCubicFeet}</div>
                </div>
            ))}
            <div className="button-group">
                <button onClick={addItem} className="add-item-btn">Add Item</button>
                <button onClick={handleSubmit} className="submit-list-btn">Submit Inventory List</button>
            </div>
        </div>
    );
};

export default InventoryList;
