import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import './InventoryList.css';

const itemsHashmap = {
    "Patio Chair":  "5",
    "Small Rug":  "3",
    "Large Sectional Sofa":  "250",
    "Large Tool Chest":  "15",
    "55 Gallon Aquarium":  "8",
    "Hall Tree Large":  "12",
    "Secretary Desk":  "35",
    "Drum Set":  "0",
    "3 Cushion Sofa":  "35",
    "5 Gallon Terrarium":  "1",
    "Workbench":  "25",
    "Umbrella":  "5",
    "Trunk":  "5",
    "Bassinette":  "5",
    "Portable Record Player":  "2",
    "Rattan/Wicker Sofa":  "3",
    "Extension Ladder":  "8",
    "Rollaway Bed":  "20",
    "Cedar Chest":  "15",
    "Bowling Ball/Bag":  "3",
    "Single Dresser":  "30",
    "French Door Refrigerator":  "55",
    "Privacy Screen":  "4",
    "Washing Machine":  "25",
    "Hamper":  "5",
    "Tea Cart":  "10",
    "55 Gallon Terrarium":  "8",
    "Buffet Table":  "17",
    "240 Gallon Aquarium":  "34",
    "42 inch tv":  "3",
    "Tripod":  "2",
    "65 Gallon Aquarium":  "9",
    "Crib":  "10",
    "150 Gallon Aquarium":  "21",
    "Curio Cabinet":  "10",
    "70 inch tv":  "8",
    "Large Box":  "6",
    "25 Gallon Aquarium":  "4",
    "Pole Lamp":  "3",
    "85 inch tv":  "11",
    "Bar Stool":  "2",
    "Utility Cabinet":  "10",
    "250 Gallon Terrarium":  "35",
    "Combination TV":  "25",
    "Loveseat Sofa":  "30",
    "Picnic Table":  "20",
    "Table Model TV":  "10",
    "File Cabinet 2 Drawer":  "10",
    "Garden Hose \u0026 Tools":  "10",
    "Queen Bed":  "65",
    "200 Gallon Aquarium":  "28",
    "Grandfather Clock":  "20",
    "Magazine Rack":  "2",
    "Day Bed":  "30",
    "200 Gallon Terrarium":  "28",
    "Air Conditioner Small":  "15",
    "Baker\u0027s Rack":  "5",
    "Stationary Bike":  "25",
    "Night Table":  "5",
    "210 Gallon Aquarium":  "30",
    "Sectional Sofa":  "70",
    "Billiard Cue Rack":  "2",
    "Ottoman":  "4",
    "Sand Box":  "10",
    "King Bed":  "70",
    "Chest":  "12",
    "Pool Table Slate":  "10",
    "Standing Mirror":  "6",
    "Child`s Table":  "5",
    "Garbage Can 30 Gallon":  "25",
    "Monitor":  "4",
    "75 inch tv":  "9",
    "10 Gallon Terrarium":  "2",
    "Card Table":  "2",
    "Glider or Settee":  "20",
    "Spreader":  "2",
    "Outdoor Unbrella":  "14",
    "Stroller":  "4",
    "40 Gallon Aquarium":  "6",
    "Bicycle":  "5",
    "Table Radio":  "2",
    "Server":  "15",
    "Riding Lawn Mower":  "35",
    "Double Dresser":  "40",
    "Ping Pong Table":  "40",
    "Outdoor Swings":  "30",
    "Dryer":  "25",
    "Rocking Chair":  "5",
    "Folding Chair":  "1",
    "90 Gallon Terrarium":  "12",
    "98 inch tv":  "15",
    "Racks Outdoor Dry":  "5",
    "Grand Piano":  "80",
    "Wardrobe Box":  "16",
    "15 Gallon Aquarium":  "2",
    "50 Gallon Aquarium":  "8",
    "Stereo Component":  "60",
    "Recliner Chair":  "38",
    "Telephone Stand":  "5",
    "5 Gallon Aquarium":  "1",
    "20 Gallon Aquarium":  "3",
    "120 Gallon Aquarium":  "16",
    "Floor Lamp":  "3",
    "220 Gallon Terrarium":  "31",
    "Small Wardrobe":  "20",
    "40 Gallon Terrarium":  "6",
    "Folding Cot":  "10",
    "SM/Winthrop Desk":  "22",
    "Stand TV":  "3",
    "Baby Piano":  "70",
    "Work Bench":  "20",
    "Music Cabinet":  "10",
    "Hide Sofa":  "50",
    "Occasional Chair":  "15",
    "Terrarium":  "2",
    "Air Conditioner Large":  "20",
    "Fireplace Equip.":  "5",
    "Mirror":  "5",
    "Small Tool Chest":  "5",
    "Small Table":  "2",
    "49 inch tv":  "4",
    "Overstuffed Chair":  "25",
    "Outdoor Child Slide":  "10",
    "Dishwasher":  "20",
    "Dining Table":  "30",
    "Baby Stroller":  "4",
    "Tricycle":  "2",
    "Wall Clock":  "1",
    "Wine Rack":  "3",
    "22 inch tv":  "1",
    "220 Gallon Aquarium":  "31",
    "Kitchen Cabinet":  "30",
    "Kettlebell":  "1",
    "Utility Table":  "5",
    "75 Gallon Terrarium":  "11",
    "Sewing Machine":  "20",
    "Stool":  "3",
    "Fridge":  "50",
    "Youth Bed":  "30",
    "Swing Set":  "0",
    "Metal Basin":  "9",
    "Folding Screen":  "5",
    "Sun Lounger":  "5",
    "50 Gallon Terrarium":  "8",
    "Game Table":  "15",
    "Fireplace Screen":  "1",
    "Console Table":  "6",
    "Tackle Box":  "1",
    "Book Box":  "2",
    "Drafting Table":  "8",
    "Hutch (Top)":  "20",
    "Popcorn Machine":  "3",
    "19 inch tv":  "1",
    "250 Gallon Aquarium":  "35",
    "Piano Spinet/Console":  "60",
    "Portable Bar":  "15",
    "Power Lawn Mower":  "15",
    "6\u0027 Step Ladder":  "3",
    "Dartboard":  "2",
    "Drop leaf Tables":  "15",
    "End Table":  "5",
    "Trash Compactor":  "15",
    "Bunk Bed":  "70",
    "Hand Lawn Mower":  "5",
    "Playpen":  "10",
    "30 Gallon Aquarium":  "5",
    "Treadmill":  "25",
    "Bookcase":  "20",
    "Weight Bench":  "5",
    "24 inch tv":  "1",
    "Tire":  "3",
    "Coatrack":  "3",
    "Kitchen Island":  "0",
    "Bean Bag Chair":  "5",
    "32 inch tv":  "2",
    "15 Gallon Terrarium":  "2",
    "Vanity Mirror":  "2",
    "Rocker Chair":  "12",
    "40 inch tv":  "3",
    "Ref. 11 cu. ft./over":  "60",
    "Bench":  "8",
    "Dish Pack":  "10",
    "Patio Umbrella":  "3",
    "China Cabinet":  "15",
    "Printer":  "3",
    "240 Gallon Terrarium":  "34",
    "75 Gallon Aquarium":  "11",
    "Large or Pad Rug":  "10",
    "60 inch tv":  "6",
    "Small or Pad Rugs":  "3",
    "Ref. 6 cu. ft. or less":  "30",
    "Liquor Cabinet":  "6",
    "Large Rug":  "7",
    "Gas/Electric Heater":  "5",
    "Waterbed":  "20",
    "Lawn Edger":  "3",
    "58 inch tv":  "6",
    "Office Chair":  "3",
    "Range 20\u0027\u0027 Wide":  "10",
    "210 Gallon Terrarium":  "30",
    "Sewing Table":  "6",
    "Metal Shelves":  "5",
    "Office Desk":  "10",
    "Sect. Bookshelves":  "5",
    "Corner Cabinet":  "20",
    "Piano Bench":  "5",
    "Patio Table":  "30",
    "8\u0027 Metal Ladder":  "2",
    "Desktop Computer":  "3",
    "Trash Can":  "7",
    "Power Tool Stand":  "15",
    "SM/Winthrop Desc":  "22",
    "Suitcase":  "5",
    "65 inch tv":  "7",
    "Range 36\u0027\u0027 Wide":  "30",
    "Occasional Table":  "15",
    "Vacuum Cleaner":  "5",
    "Standard Bed":  "60",
    "China Cabinet Base":  "15",
    "29 Gallon Terrarium":  "4",
    "Snooker Table":  "0",
    "Lg. Roll/Pad Rugs":  "10",
    "Full Length Mirror":  "5",
    "Wheelbarrow":  "8",
    "Massage Chair":  "0",
    "Foosball Table":  "2",
    "Barbells":  "5",
    "Microwave Oven":  "10",
    "180 Gallon Terrarium":  "25",
    "Ironing Board":  "2",
    "Papasan Chair":  "4",
    "Medium Tool Chest":  "10",
    "Console Stereo":  "8",
    "Fem/Plant Stands":  "2",
    "Power Tool Hand Ea":  "3",
    "Electric Keyboard":  "3",
    "Boudoir Chair":  "10",
    "Large Table":  "4",
    "Shoe Rack":  "2",
    "Medium Box":  "3",
    "Large BBQ Grill":  "10",
    "20 Gallon Terrarium":  "3",
    "Small or Pad Rug":  "3",
    "90 Gallon Aquarium":  "12",
    "Mantel Clock":  "2",
    "Footstool":  "2",
    "Freezer 16 or over":  "60",
    "180 Gallon Aquarium":  "25",
    "65 Gallon Terrarium":  "9",
    "Dresser/Vanity Bch":  "3",
    "83 inch tv":  "11",
    "Surfboard":  "2",
    "Freezer 10 or less":  "30",
    "Folding Chairs":  "1",
    "Pool Table Comp.":  "40",
    "Baby Rocker":  "11",
    "120 Gallon Terrarium":  "16",
    "File Cabinet 4 Drawer":  "20",
    "Sec. Sofa":  "10",
    "Potted Tree":  "10",
    "High Chair":  "5",
    "Metal Chair":  "3",
    "Range 30\u0027\u0027 Wide":  "15",
    "Personal Computer":  "4",
    "Hall Tree Rack":  "2",
    "Sideboard":  "8",
    "29 Gallon Aquarium":  "4",
    "Exercise Bike":  "10",
    "25 Gallon Terrarium":  "4",
    "Lawn Roller":  "15",
    "39 inch tv":  "3",
    "Ref. 7 to 10 cu. ft.":  "45",
    "Bathroom Vanity":  "5",
    "Steamer Trunk":  "7",
    "230 Gallon Aquarium":  "33",
    "Dining Chair":  "5",
    "Large Dining Table":  "75",
    "Child`s Wagon":  "5",
    "150 Gallon Terrarium":  "21",
    "Dehumidifier":  "10",
    "Toy Chest":  "5",
    "Wastepaper Basket":  "2",
    "30 Gallon Terrarium":  "5",
    "Serving Cart":  "15",
    "Kitchen Table":  "10",
    "Exercise Ball":  "2",
    "Kitchen Chairs":  "5",
    "Straight Chair":  "5",
    "Chaise Lounge":  "25",
    "Nesting Tables":  "4",
    "Coffee Table":  "12",
    "Console TV":  "15",
    "Picnic Bench":  "5",
    "Camping BBQ Grill":  "2",
    "55 inch tv":  "5",
    "Fan":  "5",
    "Portable TV":  "5",
    "230 Gallon Terrarium":  "33",
    "Child`s Chair":  "3",
    "Large or Pad Rugs":  "10",
    "10 Gallon Aquarium":  "2",
    "48 inch tv":  "4",
    "Leaf Sweeper":  "5",
    "Vanity Dresser":  "20",
    "Tire w/Rim":  "5",
    "Buffer ":  "30",
    "Large Wardrobe":  "40",
    "Double Bed":  "60",
    "Sled":  "2",
    "Storage Ottoman":  "6",
    "Twin Bed":  "60",
    "Triple Dresser":  "50",
    "Outdoor Child Gym":  "20",
    "86 inch tv":  "12",
    "190 Gallon Terrarium":  "27",
    "Single Bed":  "40",
    "77 inch tv":  "9",
    "Footlocker":  "5",
    "50 inch tv":  "4",
    "Freezer 11 to 15":  "45",
    "Plant Stand":  "2",
    "Port Sewing Machine":  "10",
    "190 Gallon Aquarium":  "27",
    "Wood Chairs":  "5",
    "Arm Chair":  "10",
    "Golf Bag":  "4",
    "Armoire":  "30"
};

const InventoryList = () => {
    const emptyItem = { name: '', quantity: '', cubicFeet: 0, totalCubicFeet: 0, inputValue: '' };
    const initialItems = Array(5).fill().map(() => ({ ...emptyItem }));
    const [items, setItems] = useState(initialItems);
    const [inputValue, setInputValue] = useState('');
	const [totalCubicFeet, setTotalCubicFeet] = useState(0);
	
    const calculateTotalCubicFeet = (items) => {
        return items.reduce((total, item) => total + (item.quantity * item.cubicFeet), 0);
    };
	 useEffect(() => {
        setTotalCubicFeet(calculateTotalCubicFeet(items));
    }, [items]);
    const getFilteredItems = (query) => {
        return Object.keys(itemsHashmap)
            .filter(name => name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 10) // Limit the number of results
            .map(name => ({ name, cubicFeet: itemsHashmap[name] }));
    };

    const handleItemChange = (selectedItem, index) => {
        if (!selectedItem) return; // Exit if no item is selected
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    name: selectedItem.name,
                    cubicFeet: itemsHashmap[selectedItem.name],
                    totalCubicFeet: item.quantity * itemsHashmap[selectedItem.name]
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
                    quantity: quantity,
                    totalCubicFeet: quantity * item.cubicFeet
                };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { ...emptyItem }]);
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
                        inputValue={item.inputValue}
                        onInputValueChange={(value) => {
                            const newItems = [...items];
                            newItems[index].inputValue = value;
                            setItems(newItems);
                        }}
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
                                <input {...getInputProps()} placeholder="Type to search" />
                                <ul {...getMenuProps()}>
                                    {isOpen
                                        ? getFilteredItems(item.inputValue).map((item, itemIndex) => (
                                            <li
                                                {...getItemProps({
                                                    key: item.name,
                                                    index: itemIndex,
                                                    item,
                                                    style: {
                                                        backgroundColor: highlightedIndex === itemIndex ? 'lightgray' : 'white',
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
                        min="0"
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
			<div className="total-cubic-feet-box">
                Current Total Cubic Feet: {totalCubicFeet}
            </div>
        </div>
    );
};

export default InventoryList;