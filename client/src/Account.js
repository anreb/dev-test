import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import EditForm from './EditForm';
import './Account.css';

const data = {
    balanceTransactions:[
        {
            "_id": "a1",
            "date": "2022-02-20",
            "description": "Deposit",
            "amount": "$2,000.00"
        },
        {
            "_id": "a21",
            "date": "2022-02-20",
            "description": "Deposit",
            "amount": "$2,000.00"
        },
        {
          "_id": "a13",
          "date": "2022-02-20",
          "description": "Deposit",
          "amount": "$2,000.00"
        },
        {
            "_id": "a41",
            "date": "2022-02-20",
            "description": "Deposit",
            "amount": "$2,000.00"
          },
          {
            "_id": "a51",
            "date": "2022-02-20",
            "description": "Deposit",
            "amount": "$2,000.00"
          },
        {
          "_id": "b2",
          "date": "2022-02-25",
          "description": "Withdrawal",
          "amount": "$500.00"
        },
        {
          "_id": "c3",
          "date": "2022-03-02",
          "description": "Deposit",
          "amount": "$1,000.00"
        }
    ]
}

const Account = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const [activeTab, setActiveTab] = useState('balance');
    const navigate = useNavigate();
    const {user, setIsLoggedIn} = useContext(AuthContext);
    console.log(user)
    const handleLogout = () => {
        const removeUserFromLocalStorage = localStorage.removeItem('user');
        Promise.resolve(removeUserFromLocalStorage)
            .then(_res => {
                setShowSideBar(false);
                console.log('navigating')
                setIsLoggedIn(false);
                navigate('/login')
            })
            .catch(error => console.error(error));
    }

    function handleToggle() {
        console.log('togle')
        setShowSideBar(!showSideBar);
    }

    return (
    <>
        <div className={`sidebar ${showSideBar ? 'active' : ''}`} >
            <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
        <div className='topbar'>
            <div className={`hamburger-menu ${showSideBar ? 'active': ''}`} onClick={handleToggle}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
        <div className="profile">
      <div className='profileHeader'>
        {!user && (<h2>Loading</h2>)}
        <svg width="140" height="140">
  <defs>
    <clipPath id="innerCircleClip">
      <circle cx="70" cy="120" r="40" />
    </clipPath>
  </defs>
  <circle cx="70" cy="70" r="70" fill="#C9CCCC" stroke="none" strokeWidth="1" />
  <circle cx="70" cy="55" r="25" fill="#F7FAFA"  />
  <circle cx="70" cy="70" r="70" fill="#F7FAFA" clipPath="url(#innerCircleClip)" />
</svg>

      </div>
      <div className="profileTabs">
        <div
          className={`profileTab ${activeTab === 'balance' ? 'active' : ''}`}
          onClick={() => setActiveTab('balance')}
        >
          BALANCE
        </div>
        <div
          className={`profileTab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          EDIT
        </div>
      </div>
      <div className="profileContent">
        {activeTab === 'balance' && (
                <div className='transactionContainer'>
                {data.balanceTransactions.map((transaction) => (
                    <div key={transaction._id} className='transaction'>
                        <div className='bulletContainer'>
                            <div className='bullet'></div>
                        </div>
                        <div className='transactionDetail'>
                            <div className='skeletonBar1'></div>
                            <div className='skeletonBar2'></div>
                        </div>
                    </div>
                )
            )
        }
    </div>)}
        {activeTab === 'edit' && (<EditForm data={user}/>)}
      </div> 
      </div>
    </>
    );
};

export default Account;




