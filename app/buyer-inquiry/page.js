
"use client";

import { useState } from "react";

export default function BuyerInquiry() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    brand: "",
    country: "",
    product: "",
    quantity: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f7f5ef",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "auto",
        background: "white",
        padding: "35px",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ color: "#244c3b", textAlign: "center" }}>
          Buyer Inquiry
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Interested in Indian brands? Send your enquiry to get started.
        </p>

        {submitted ? (
          <div style={{
            background: "#e5f5e9",
            padding: "25px",
            borderRadius: "10px",
            textAlign: "center",
            color: "#245c39",
          }}>
            <h2>Thank you, {form.name}!</h2>
            <p>Your inquiry has been submitted successfully.</p>
            <button
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  company: "",
                  brand: "",
                  country: "",
                  product: "",
                  quantity: "",
                  message: "",
                });
                setSubmitted(false);
              }}
              style={buttonStyle}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Full Name *</label>
            <input
              style={inputStyle}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label style={labelStyle}>Email Address *</label>
            <input
              style={inputStyle}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label style={labelStyle}>Company Name</label>
            <input
              style={inputStyle}
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter your company name"
            />

            <label style={labelStyle}>Select Brand *</label>
            <select
              style={inputStyle}
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
            >
              <option value="">Choose a brand</option>
              <option>Aara Studio</option>
              <option>Nira Botanics</option>
              <option>Mitti Form</option>
              <option>Tantu Collective</option>
              <option>Aarvi Jewels</option>
              <option>Sole Stories</option>
              <option>The Loom Edit</option>
            </select>

            <label style={labelStyle}>Country *</label>
            <input
              style={inputStyle}
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter your country"
              required
            />

            <label style={labelStyle}>Product Requirements *</label>
            <input
              style={inputStyle}
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder="What product are you interested in?"
              required
            />

            <label style={labelStyle}>Required Quantity *</label>
            <input
              style={inputStyle}
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />

            <label style={labelStyle}>Message</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px" }}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your requirements..."
            />

            <button type="submit" style={buttonStyle}>
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  marginTop: "18px",
  marginBottom: "7px",
  color: "#244c3b",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "14px",
  background: "#244c3b",
  color: "white",
  border: "none",
  borderRadius: "7px",
  fontSize: "16px",
  cursor: "pointer",
};
  