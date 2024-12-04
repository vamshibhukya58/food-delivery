import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
 // Fixed casing to match the filename

export default function Home() {
    const [search,setSearch]= useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the response is ok before processing
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            response = await response.json();

            setFoodItem(response[0]);
            setFoodCat(response[1]);

            // console.log(response[0], response[1]);
        } catch (error) {
            console.error("Error fetching data:", error);
            // You may want to set error states to display user-friendly messages
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img 
                            src="https://ik.imagekit.io/vagdevi17/pizza_K-qymAstX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649399459574" 
                            className="d-block w-100" 
                            alt="pizza" 
                            style={{ width: "100%", height: "auto", maxHeight: "500px", filter: "brightness(30%)" }} // Reduced brightness
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://ik.imagekit.io/vagdevi17/biryani_eqitwWq_7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649399064013" 
                            className="d-block w-100" 
                            alt="biryani" 
                            style={{ width: "100%", height: "auto", maxHeight: "500px", filter: "brightness(30%)" }} // Reduced brightness
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://ik.imagekit.io/vagdevi17/icecream_6y0pc7AlN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649400201393" 
                            className="d-block w-100" 
                            alt="ice cream" 
                            style={{ width: "100%", height: "auto", maxHeight: "500px", filter: "brightness(30%)" }} // Reduced brightness
                        />
                    </div>
                </div>

                {/* Search bar */}
                <div className="search-bar" style={{ position: "absolute", top: "90%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
                    <div className="d-flex justify-content-center" style={{ gap: "10px" }}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                    </div>
                </div>

                {/* Carousel controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
                {
                    foodCat.length > 0 // Check if foodCat has elements
                        ? foodCat.map((data, index) => (
                            <div key={index} className="row mb-3">
                                <div className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem.length > 0 // Check if foodItem has elements
                                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filteredItem => (
                                            <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                                                <Card 
                                                    item={filteredItem} 
                                                    // foodName={filteredItem.name}
                                                    options={filteredItem.options && filteredItem.options.length > 0 ? filteredItem.options[0] : {}} // Safely accessing options
                                                    // imgSrc={filteredItem.img} 
                                                /> {/* Pass the item as a prop to Card */}
                                            </div>
                                        ))
                                    : <div>No Such Data Found</div>
                                }
                            </div>
                        ))
                        : <div>No categories available</div> // Fallback content
                }
            </div>
            <div><Footer /></div>
        </div>
    );
}
