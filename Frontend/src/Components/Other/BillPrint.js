// BillPrint.js
import React from 'react';
import pic from "../Images/image.png"

const BillPrint = React.forwardRef(({ billData,Order,Total, gst, Date, Discount }, ref) => {
  console.log(billData);
  return (
    <div ref={ref} id="bill">
      <div className='imgtitle'>
      <img src={pic} alt='Logo pic' />
      <h1>Abbasi Foods</h1>
      </div>
      
      <h4>{Date}</h4>
      <h4>Phone:+92-318-5410340</h4>
      <h4>Order No:<span>{Order}</span> </h4>
      <table>
        <thead>
          <tr><th>Quantity</th>
            <th>Product</th>
            <th>Rate</th>
            <th>Amount</th></tr>
        </thead>
        <tbody>
          {
            billData.map((item, index) => (

              <tr>
                <td>{item.quantity}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>

              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='printPayment'>

                  <h5>Total(Exlc GST):<span>{Total}</span></h5>
                  <h5>GST @ {gst}%:<span> {(Total * (parseFloat(gst) / 100)).toFixed(2)}</span></h5>
                  <h5>Discount {Discount}%: <span>{(Total * (parseFloat(Discount) / 100)).toFixed(2)}</span></h5>
                  <h5 id='last'><b>
                    Grand Total:<span>Rs.
                      {(
                        Total - (Total * (parseFloat(Discount) / 100)) +
                        (Total * (parseFloat(gst) / 100))
                      ).toFixed(2)}</span></b>
                  </h5>
                </div>
    </div>
  )
});

export default BillPrint;
