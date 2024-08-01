// Report.js
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import pic from "../Images/image.png"
import bpic from '../Images/bimg.png'
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import ReportPrint from './ReportPrint';
import { useReactToPrint } from 'react-to-print';

const Report = () => {
    const [userss, setusers] = useState([]);
    const [userid, setUserID] = useState('');
    const [orders, setOrders] = useState([]);
    const [Uorders, setUOrders] = useState([]);
    const [Total, setTotal] = useState(Number);
    const [search, setsearch] = useState(false);
    const [searchQuery, setsearchQuery] = useState('');

    const navigate = useNavigate();

    const location = useLocation();
    const { person } = location.state || {};

    const billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  })

    console.log(person);
    useEffect(() => {
        console.log(orders);

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/user/datasingle/${person}`);
                console.log(response);
                if (response.data.success === true) {
                    setusers(response.data.message[0]);
                    setUserID(response.data.message[0]._id);
                    console.log(response.data.message[0]._id);
                }
                else {
                    console.log("Error");
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/order/orders/${userid}`);
                console.log(response);
                if (response.data.success === true) {
                    setOrders(response.data.message);
                    console.log(response.data.message);
                    const newTotal = orders.reduce((acc, item) => acc + parseFloat(item.totalamount), 0);
                    setTotal(newTotal);
                    console.log(newTotal);
                }
                else {
                    console.log("Error");
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchUser();
        fetchOrders();

    }, [userid]);

    useEffect(() => {
        console.log(Uorders)
        const calculateTotal = () => {
            const newTotal = orders.reduce((acc, item) => acc + parseFloat(item.totalamount), 0);
            setTotal(newTotal);
        };

        calculateTotal();
    }, [orders]);

    const handleSearchInput = (event) => {
        setsearchQuery(event.target.value);
    }
    const handleSearchSubmit = (event) => {
        if (event.key === "Enter" || event.type === "click") {
            setsearch('true');
            console.log(searchQuery.toUpperCase());
            setUOrders(orders.filter((item) => item.order_number === searchQuery.toUpperCase()));
            console.log(orders.filter((item) => item.order_number === searchQuery.toUpperCase()));
            
            
        }
    }


    return (
        <div id="bill1">
            <div>
                <img src={bpic}id='back' onClick={() => { navigate('/admin') }} />
                <div className='imgtitle'>
                    <div className='searchbar'>
                        <input
                            placeholder='search order number here....'
                            value={searchQuery}
                            onChange={handleSearchInput}
                            onKeyDown={handleSearchSubmit}
                        />
                        <BiSearchAlt className='iconbutton' onClick={handleSearchSubmit} />
                    </div>
                </div>

                <img src={pic} alt='Logo pic' />
                <h1>Abbasi Foods</h1>
            </div>

            <h4>User Details </h4>
            <table>
                <thead>
                    <tr><th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>{userss.name}</td>
                        <td>{userss.email}</td>
                        <td>{userss.address}</td>
                        <td>{userss.phone}</td>

                    </tr>

                </tbody>
            </table>
            <h4>Selling Details </h4>
            <button id='refreshB' onClick={()=>{setsearch(false)}}>Refresh</button>
            <table>
                <thead>
                    <tr><th>Order No</th>
                        <th>Order Date</th>
                        <th>Menu Items</th>
                        <th>Total Amount</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        search === false ?
                            orders.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.order_number}</td>
                                        <td>{item.orderdate}</td>
                                        <td>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ItemID</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.menuItems.map((menuItem, itemIndex) => (
                                                            <tr >
                                                                <td>{menuItem.id}</td>
                                                                <td>{menuItem.name}</td>
                                                                <td>{menuItem.price}</td>
                                                                <td>{menuItem.quantity}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.totalamount}</td>
                                        <td>{item.paymentMethod}</td>

                                    </tr>
                                )
                            }) :
                            Uorders[0] ? <tr>
                                <td>{Uorders[0].order_number}</td>
                                <td>{Uorders[0].orderdate}</td>
                                <td>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ItemID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Uorders[0].menuItems.map((menuItem, itemIndex) => (
                                                    <tr >
                                                        <td>{menuItem.id}</td>
                                                        <td>{menuItem.name}</td>
                                                        <td>{menuItem.price}</td>
                                                        <td>{menuItem.quantity}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </td>
                                <td>{Uorders[0].totalamount}</td>
                                <td>{Uorders[0].paymentMethod}</td>

                            </tr>
                                : 'No Order found'

                    }



                </tbody>
            </table>
            <div className='printPayment'>
                <h5 id='last'><b>Total Sell:</b>{Total}Rs.</h5>
            </div>
            <div className='div1'>
                <div id="hidden-content">
                    <ReportPrint ref={billRef} user={userss} order={orders} Uorder={Uorders} Total={Total}  />
                </div>
                <button className='printbutton' onClick={handlePrint}>Print</button>
            </div>

        </div>
    )
};

export default Report;
