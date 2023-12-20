import React from 'react';
import Banner from './Banner'; // Adjust the path if necessary
import UserInfoForm from './UserInfoForm';
import InventoryList from './InventoryList'; 
const App = () => {
    return (
        <div>
            <Banner />
			 <UserInfoForm />
			 <InventoryList />
            {/* Other components will go here */}
        </div>
    );
}

export default App;
