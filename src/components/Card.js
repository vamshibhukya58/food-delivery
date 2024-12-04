import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let data=useCart();
    const priceRef=useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("")
    let foodItem = props.item;

    const handleAddToCart = async() => {
        await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size})
        console.log(data)
    }
    let finalPrice=qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div>
                {/* Adjusted card to have a fixed size for image */}
                <div className="card mt-3 bg-dark" style={{ width: "18rem", maxHeight: "450px" }}>
                    <img
                        src={foodItem.img}
                        className="card-img-top"
                        alt={foodItem.name}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }} // Uniform image size with objectFit
                    />
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>

                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    );
                                })}
                            </select>
                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
