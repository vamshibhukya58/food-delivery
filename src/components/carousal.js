import React from 'react';

export default function Carousal() {
    return (
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
                    <form className="d-flex" style={{ gap: "10px" }}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                    </form>
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
    );
}
