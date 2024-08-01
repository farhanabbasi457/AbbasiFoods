import React, { useRef } from 'react';
import pic from "../Images/image.png";

const ReportPrint = React.forwardRef(({ user,order, Uorder,Total }, ref) => {
   

    return (
        <div ref={ref} id="bill2">
            <div className='imgtitle'>
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
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>

                    </tr>

                </tbody>
            </table>
            <h4>Selling Details </h4>
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
                        !Uorder.length ?
                            order.map((item, index) => {
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
                            Uorder[0] ? <tr>
                                <td>{Uorder[0].order_number}</td>
                                <td>{Uorder[0].orderdate}</td>
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
                                                Uorder[0].menuItems.map((menuItem, itemIndex) => (
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
                                <td>{Uorder[0].totalamount}</td>
                                <td>{Uorder[0].paymentMethod}</td>

                            </tr>
                                : 'No Order found'

                    }



                </tbody>
            </table>
            <div className='printPayment'>
                <h5 id='last'><b>Total Sell:</b>{Total}Rs.</h5>
            </div>
        </div>
    );
});

export default ReportPrint;
