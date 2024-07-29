import React, { useState } from 'react';
import { generateInvoice } from '../services/api';
import '../App.css'; // Import the updated CSS

function InvoiceForm() {
  const [formData, setFormData] = useState({
    sellerDetails: { name: '', address: '', city: '', state: '', pincode: '', pan: '', gst: '' },
    placeOfSupply: '',
    billingDetails: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' },
    shippingDetails: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' },
    placeOfDelivery: '',
    orderDetails: { orderNo: '', orderDate: '' },
    invoiceDetails: { invoiceNo: '', invoiceDate: '' },
    reverseCharge: 'No',
    items: [
      { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index] = { ...items[index], [name]: name === 'description' ? value : parseFloat(value) };
    setFormData((prevData) => ({ ...prevData, items }));
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generateInvoice(formData);
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <div className="container">
      <form className="invoice-form" onSubmit={handleSubmit}>
        <h3>Seller Details</h3>
        <div className="input-field">
          <label>Name</label>
          <input type="text" name="sellerDetails.name" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Address</label>
          <input type="text" name="sellerDetails.address" placeholder="Address" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>City</label>
          <input type="text" name="sellerDetails.city" placeholder="City" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>State</label>
          <input type="text" name="sellerDetails.state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Pincode</label>
          <input type="text" name="sellerDetails.pincode" placeholder="Pincode" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>PAN No.</label>
          <input type="text" name="sellerDetails.pan" placeholder="PAN No." onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>GST Registration No.</label>
          <input type="text" name="sellerDetails.gst" placeholder="GST Registration No." onChange={handleChange} />
        </div>

        <h3>Place of Supply</h3>
        <div className="input-field">
          <label>Place of Supply</label>
          <input type="text" name="placeOfSupply" placeholder="Place of Supply" onChange={handleChange} />
        </div>

        <h3>Billing Details</h3>
        <div className="input-field">
          <label>Name</label>
          <input type="text" name="billingDetails.name" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Address</label>
          <input type="text" name="billingDetails.address" placeholder="Address" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>City</label>
          <input type="text" name="billingDetails.city" placeholder="City" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>State</label>
          <input type="text" name="billingDetails.state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Pincode</label>
          <input type="text" name="billingDetails.pincode" placeholder="Pincode" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>State/UT Code</label>
          <input type="text" name="billingDetails.stateCode" placeholder="State/UT Code" onChange={handleChange} />
        </div>

        <h3>Shipping Details</h3>
        <div className="input-field">
          <label>Name</label>
          <input type="text" name="shippingDetails.name" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Address</label>
          <input type="text" name="shippingDetails.address" placeholder="Address" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>City</label>
          <input type="text" name="shippingDetails.city" placeholder="City" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>State</label>
          <input type="text" name="shippingDetails.state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Pincode</label>
          <input type="text" name="shippingDetails.pincode" placeholder="Pincode" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>State/UT Code</label>
          <input type="text" name="shippingDetails.stateCode" placeholder="State/UT Code" onChange={handleChange} />
        </div>

        <h3>Place of Delivery</h3>
        <div className="input-field">
          <label>Place of Delivery</label>
          <input type="text" name="placeOfDelivery" placeholder="Place of Delivery" onChange={handleChange} />
        </div>

        <h3>Order Details</h3>
        <div className="input-field">
          <label>Order No.</label>
          <input type="text" name="orderDetails.orderNo" placeholder="Order No." onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Order Date</label>
          <input type="date" name="orderDetails.orderDate" onChange={handleChange} />
        </div>

        <h3>Invoice Details</h3>
        <div className="input-field">
          <label>Invoice No.</label>
          <input type="text" name="invoiceDetails.invoiceNo" placeholder="Invoice No." onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Invoice Date</label>
          <input type="date" name="invoiceDetails.invoiceDate" onChange={handleChange} />
        </div>

        <h3>Items</h3>
      {formData.items.map((item, index) => (
        <div className="item-row" key={index}>
          <div className="input-field">
            <label className='des'>Description</label>
            <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="input-field">
            <label className='des'>Unit Price</label>
            <input type="number" name="unitPrice" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="input-field">
            <label className='des'>Quantity</label>
            <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="input-field">
            <label className='des'>Discount</label>
            <input type="number" name="discount" placeholder="Discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} />
          </div>
          <div className="input-field">
            <label className='des'>Tax Rate</label>
            <input type="number" name="taxRate" placeholder="Tax Rate" value={item.taxRate} onChange={(e) => handleItemChange(index, e)} />
          </div>
        </div>
      ))}
      <div className="footer-buttons">
        <button type="button" className="btn" onClick={handleAddItem}>Add Item</button>
        <button type="submit" className="btn">Generate Invoice</button>
      </div>
    </form>
    </div>
  );
}

export default InvoiceForm;
