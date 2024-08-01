//npm install moment --save  (for time getting)

import React, { useState, useEffect, useRef } from 'react';
import { BiLogoXing, BiSearchAlt } from 'react-icons/bi';
import BillPrint from '../Other/BillPrint';
import { useReactToPrint } from 'react-to-print';
import moment from "moment"
import backimg from "../Images/bimg.png"
import axios from "axios";
import { useUser } from '../Other/UserContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("Platters");
  const [menuitems, setMenuitems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchType, setSearchType] = useState("cash");
  const [total, setTotal] = useState(0);
  const [GST, setGST] = useState(16);
  const [discount, setDiscount] = useState(0);
  const [discountID, setDiscountID] = useState([]);
  const [date, setDate] = useState("");
  const [ONo, setONo] = useState("");
  const [CategoryCheck, setCategoryCheck] = useState(false);
  const [ItemCheck, setItemCheck] = useState(false);
  const [FilterCheck, setFilterCheck] = useState(false);
  const [Users, setUsers] = useState([]);

  const [searchSubmitted, setSearchSubmitted] = useState(false);


  const billRef = useRef();

  const { name } = useUser();

  const navigate = useNavigate();

  const location = useLocation();
  const { person } = location.state || {};


  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  })


  const handlePrint1 = async () => {
    handlePrint();
    try {
      const response1 = await axios.post('http://localhost:2000/order', {
        order_number: ONo,
        user_ID: person._id,
        discount_ID: discountID._id,
        orderdate: date,
        menuItems: cartItems,
        totalamount: (
          total - (total * (parseFloat(discount) / 100)) +
          (total * (parseFloat(GST) / 100))
        ).toFixed(2),
        paymentMethod: searchType,
      });

      if (response1) {
        alert('Payment Done');
      }
    }
    catch (error) {
      console.error('Error during signup:', error);
    }

    setCartItems([]);

  }



  useEffect(() => {
    console.log(categoryName);


    setDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
    const fetchData = async () => {
      try {
        const { data: { message } } = await axios.get(`http://localhost:2000/category`);
        setCategory(message);
        console.log(message)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDiscount = async () => {
      try {
        const { data: { message } } = await axios.get(`http://localhost:2000/discount/Weekend Special`);
        setDiscountID(message[0]);
        const percentage = message[0].percentage;
        setDiscount(percentage);
        console.log(percentage)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData1 = async () => {
      try {
        const { data: { message } } = await axios.get(`http://localhost:2000/category/${categoryName}`);
        setMenuitems(message);
        console.log(message)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchUser = async () => {
      try {
        const { data: { message } } = await axios.get(`http://localhost:2000/user/users`);
        setUsers(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData3 = async () => {
      try {
        const { data: { message } } = await axios.get(`http://localhost:2000/order`);
        console.log(message);
        if (message === 0) {
          let l = 1;
          let mp = "ONO" + l;
          setONo(mp);

        }
        else {
          let l = message.length;
          l = l + 1;
          let mp = "ONO" + l;
          setONo(mp);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchData1();
    fetchData3();
    fetchUser();
    fetchDiscount();

  }, [categoryName, cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);

  }, [cartItems]);

  useEffect(() => {
    const BData = JSON.parse(localStorage.getItem(`DataUser_${name}`));
    if (BData) {
      setCartItems(BData.item);
    }
  }, [name]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const UserData = {
        name: name,
        item: cartItems
      }
      localStorage.setItem(`DataUser_${name}`, JSON.stringify(UserData));
    }
  }, [cartItems, name]);




  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        var response = await axios.get(`http://localhost:2000/menuitem/${searchQuery}`);
        setFilteredItems(response.data.message);
        setSearchSubmitted(true);
        setCategoryCheck(true);
        setFilterCheck(true);
        setSearchQuery('');
      } catch (error) {
        console.error('Error searching books:', error);
      }
    }
  };
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const Card = ({ id, name }) => {
    const handleClick = () => {
      console.log(name);
      setCategoryName(name);
      setSearchSubmitted(false);
      setItemCheck(true)
      setCategoryCheck(true)
    };
    return (
      <div className='imgtitle'>
        <h2 onClick={handleClick}>{name}</h2>
      </div>
    );
  };
  const Card2 = ({ id, name }) => {
    const handleClick = () => {
      console.log(name)
      navigate("/report", { state: { person: name } });
    };
    return (
      <div className='imgtitle'>
        <h2 onClick={handleClick}>{name}</h2>
      </div>
    );
  };

  const Row = ({ title, item }) => (
    <div className='row'>
      <h2>{title} <IoIosAddCircle onClick={() => { navigate('/addcategory') }} /> <AiFillMinusCircle onClick={() => { navigate('/deletecategory') }} /> <MdUpdate onClick={() => { navigate('/updatecategory') }} /></h2>
      <div className='card-img'>
        {Array.isArray(item) && item.length > 0 ? (item.map((item, index) => {
          console.log(item.length);

          return (
            <Card
              key={index}
              id={item._id}
              name={item.name}
            />
          );
        })) : (
          <p>No Item Available</p>
        )}

      </div>
    </div>
  );
  const Row2 = ({ title, item }) => (
    <div className='row'>
      <h2>{title} <IoIosAddCircle onClick={() => { navigate('/adduser') }} /> <AiFillMinusCircle onClick={() => { navigate('/deleteuser') }} /> </h2>
      <div className='card-img'>
        {Array.isArray(item) && item.length > 0 ? (item.map((item, index) => {
          console.log(item.length);

          return (
            <Card2
              key={index}
              id={item._id}
              name={item.name}
            />
          );
        })) : (
          <p>No Item Available</p>
        )}

      </div>
    </div>
  );

  const Card1 = ({ key, id, name, description, price, quantity = 1 }) => {
    const handleClick = () => {
      console.log(name);
    };
    const handleIncrement = () => {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));

    };

    const handleDecrement = () => {
      setCartItems(cartItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ));

    };
    return (
      <div className='imgtitle1'>
        <h2 id='name' onClick={handleClick}>{name}</h2>
        <h2 id='price' onClick={handleClick}><b>Rs:</b>{price}</h2>


        <button onClick={() => {

          if (!cartItems.some(item => item.id === id)) {
            setCartItems([...cartItems, { id, name, price, quantity }]);
          }
          else {
            setCartItems(cartItems.map(item =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ));
          }



        }}><BsCartCheck /></button>
        <div className='incdec'>
          <button onClick={handleDecrement}>-</button>
          {
            cartItems.map(item =>
              item.id === id ? <h2>{item.quantity}</h2> : ''
            )
          }

          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    );
  };

  const Row1 = ({ title, item }) => (
    <div className='row1'>
      <h2>{title}
        <img src={backimg} onClick={() => { setCategoryCheck(false); setFilterCheck(false); setItemCheck(false) }} />
        <IoIosAddCircle onClick={() => { navigate('/additem', { state: { person: categoryName } }) }} />
        <AiFillMinusCircle onClick={() => { navigate('/deleteitem') }} />
        <MdUpdate onClick={() => { navigate('/updateitem', { state: { person: categoryName } }) }} />
      </h2>

      <div className='card-img1'>
        {Array.isArray(item) && item.length > 0 ? (item.map((item, index) => {
          console.log(item.length);


          return (
            <Card1
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          );
        })) : (
          <p>No Item Available</p>
        )}

      </div>
    </div>
  );
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setGST(event.target.name);
  };

  return (
    <>
      <div className='Home'>
        <div className='searchbar'>
          <input
            placeholder='search item here....'
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleSearchSubmit}
          />
          <BiSearchAlt className='iconbutton' onClick={handleSearchSubmit} />
        </div>

        <h2>Admin</h2>
        {!CategoryCheck ? (<Row title={"Category Foods"} item={category} />) : ''

        }
        {!CategoryCheck ? (<Row2 title={"Generate Reports"} item={Users} />) : ''

        }

        {searchSubmitted && FilterCheck ? (
          <Row1 title={"Filtered Items"} item={filteredItems} />
        ) : ItemCheck ? (
          <Row1 title={"Menu Items"} item={menuitems} />
        ) : ''}

      </div>
      <div className='Cart'>
        <div className='invoiceitem'>
          <h2>Invoice</h2>
          <div className='special1'>
            <h5>Item</h5>
            <h5>Quantity</h5>
            <h5>Price</h5>
            <h5>Total</h5>
            <h5></h5>
          </div>

          {

            cartItems.map((item, index) => (
              <div key={index}>
                <h4><span>{index + 1}</span>{item.name} </h4>

                <div className='special'>
                  <h5><div className='incdec'>
                    <button onClick={() => {
                      setCartItems(cartItems.map(item1 =>
                        item1.id ===item.id && item1.quantity > 1 ? { ...item1, quantity: item1.quantity - 1 } : item1
                      ));

                    }}>-</button>
                    {
                      cartItems.map(item1 =>
                        item1.id === item.id ? <h2>{item.quantity}</h2> : ''
                      )
                    }

                    <button onClick={() => {
                      setCartItems(cartItems.map(item1 =>
                        item1.id === item.id ? { ...item1, quantity: item1.quantity + 1 } : item1
                      ));

                    }}>+</button>
                  </div></h5>
                  <h5>{item.price}</h5>
                  <h5>{item.price * item.quantity}</h5>
                </div>
                <div className='bdiv'>
                  <button onClick={() => {
                    const newCartItems = [...cartItems];
                    newCartItems.splice(index, 1);
                    setCartItems(newCartItems);

                  }}>.</button>
                </div>

              </div>
            ))
          }
          <div className='checkbox'>
            <h5>Payment Method</h5>
            <label>
              <input
                type="checkbox"
                value="card"
                name='5'
                checked={searchType === "card"}
                onChange={handleSearchTypeChange}
              />
              Card
            </label>
            <label>
              <input
                type="checkbox"
                value="cash"
                name='16'
                checked={searchType === "cash"}
                onChange={handleSearchTypeChange}
              />
              Cash
            </label>

            <div className='payment'>

              <h5>Total(Exlc GST):<span>{total}</span></h5>
              <h5>GST @ {GST}%:<span> {(total * (parseFloat(GST) / 100)).toFixed(2)}</span></h5>
              <h5>Discount {discount}%: <span>{(total * (parseFloat(discount) / 100)).toFixed(2)}</span></h5>
              <h5>
                Grand Total:<span>
                  {(
                    total - (total * (parseFloat(discount) / 100)) +
                    (total * (parseFloat(GST) / 100))
                  ).toFixed(2)}</span>
              </h5>
              <h5></h5>
              <h5></h5>
            </div>
          </div>
          <div className='div1'>
            <div id="hidden-content">
              <BillPrint ref={billRef} billData={cartItems} Order={ONo} Total={total} gst={GST} Discount={discount} Date={date} />
            </div>
            <button className='printbutton' onClick={handlePrint1}>Print</button>
            <button className='printbutton1' onClick={()=>{setCartItems([])}}>Clear All</button>
          </div>





        </div>

      </div>
    </>
  )
}

export default Admin