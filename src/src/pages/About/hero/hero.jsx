import './hero.css'

function Hero() {
    return (

        // <section className="about-page">

            <div className="container">

                <div className="about-grid">

                    <div className="about-image">
                        <img src={aboutImg} alt="About Us" />
                    </div>

                    <div className="about-content">

                        <span>ABOUT US</span>

                        <h1>Premium Crockery for Every Home</h1>

                        <p>
                            Crockery Elite is dedicated to providing elegant, durable, and
                            high-quality tableware that transforms every meal into a special
                            experience. Our collection combines luxury, style, and
                            functionality for homes, restaurants, and hotels.
                        </p>

                        <div className="about-boxes">

                            <div className="box">
                                <h2>5000+</h2>
                                <p>Happy Customers</p>
                            </div>

                            <div className="box">
                                <h2>100+</h2>
                                <p>Premium Products</p>
                            </div>

                            <div className="box">
                                <h2>5+</h2>
                                <p>Years Experience</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            // <section />


            )
}