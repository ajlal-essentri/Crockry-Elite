import "./About.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import {
    Target,
    Eye,
    Award,
    ShieldCheck,
    Headset,
    Gem,
    HeartHandshake,
    Lightbulb,
    Sparkles,
    Search,
    PackageCheck,
    Truck,
    Quote,
    Star,
    Plus,
    Minus,
    ArrowRight
} from "lucide-react";
import aboutImg from "../../assets/images/about/about.jpg";

function About() {

    // Process Section

    const process = [
        {
            id: "01",
            icon: <Search size={34} />,
            title: "Curated Selection",
            desc: "Every product is carefully selected from trusted manufacturers to ensure timeless design, premium craftsmanship, and lasting durability.",
        },
        {
            id: "02",
            icon: <ShieldCheck size={34} />,
            title: "Quality Inspection",
            desc: "Each item undergoes strict quality checks before reaching our customers, ensuring flawless finishing and exceptional standards.",
        },
        {
            id: "03",
            icon: <PackageCheck size={34} />,
            title: "Secure Packaging",
            desc: "Our luxury packaging is designed to protect delicate products while delivering a premium unboxing experience.",
        },
        {
            id: "04",
            icon: <Truck size={34} />,
            title: "Fast Delivery",
            desc: "Reliable shipping partners ensure your order arrives safely, quickly, and in perfect condition.",
        },
    ];



    // FAQs Arrays


    const faqs = [
        {
            question: "Are your crockery products microwave safe?",
            answer:
                "Yes, most of our ceramic and porcelain collections are microwave safe. Product details clearly mention care instructions.",
        },
        {
            question: "Do you offer nationwide delivery?",
            answer:
                "Yes, we deliver across Pakistan with secure packaging to ensure every item reaches you safely.",
        },
        {
            question: "Can I return a damaged product?",
            answer:
                "Absolutely. If your order arrives damaged, contact us within 48 hours and we'll arrange a replacement or refund.",
        },
        {
            question: "How long does delivery take?",
            answer:
                "Orders are usually delivered within 3–7 business days depending on your location.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    return (
        <section className="about-page">

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


            <section />
            {/* Mission & Vision */}



            <section className="mission-section">

                <div className="mission-card">

                    <div className="mission-icon">
                        <Target size={40} strokeWidth={1.8} />
                    </div>

                    <h2>Our Mission</h2>

                    <p>
                        To deliver premium-quality crockery that combines elegance,
                        durability, and timeless design for every dining experience.
                    </p>

                </div>

                <div className="mission-card">

                    <div className="mission-icon">
                        <Eye size={40} strokeWidth={1.8} />
                    </div>

                    <h2>Our Vision</h2>

                    <p>
                        To become Pakistan's most trusted luxury crockery brand,
                        known for quality, innovation, and exceptional customer service.
                    </p>

                </div>

            </section>



            {/* Why Choose US */}



            {/* <section className="why-us">

                <h2>Why Choose Us</h2>

                <div className="why-grid">

                    <div className="why-card">

                        <div className="why-icon">
                            <Award size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Premium Quality</h3>

                        <p>
                            Every product is carefully selected to deliver
                            elegance, durability, and long-lasting performance.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <Truck size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Fast Delivery</h3>

                        <p>
                            Safe and reliable shipping with quick delivery
                            across Pakistan.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <ShieldCheck size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Secure Payment</h3>

                        <p>
                            Shop confidently with trusted and secure
                            payment methods.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <Headset size={34} strokeWidth={1.8} />
                        </div>

                        <h3>24/7 Support</h3>

                        <p>
                            Our support team is always ready to assist
                            you whenever you need help.
                        </p>

                    </div>

                </div>

            </section> */}



            {/* Our Values */}



            <section className="values-section">

                <h2>Our Values</h2>

                <div className="values-grid">

                    <div className="value-card">

                        <div className="value-icon">
                            <Gem size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Excellence</h3>

                        <p>
                            We believe every product should reflect premium quality,
                            elegance, and attention to detail.
                        </p>

                    </div>

                    <div className="value-card">

                        <div className="value-icon">
                            <HeartHandshake size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Trust</h3>

                        <p>
                            Building long-term relationships through honesty,
                            transparency, and reliable service.
                        </p>

                    </div>

                    <div className="value-card">

                        <div className="value-icon">
                            <Lightbulb size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Innovation</h3>

                        <p>
                            Continuously bringing modern and stylish crockery
                            collections for every home.
                        </p>

                    </div>

                    <div className="value-card">

                        <div className="value-icon">
                            <Sparkles size={34} strokeWidth={1.8} />
                        </div>

                        <h3>Customer First</h3>

                        <p>
                            Every decision we make is focused on providing the
                            best shopping experience.
                        </p>

                    </div>

                </div>

            </section>



            {/* OurProcess */}


            <section className="process-section">

                <div className="section-title">

                    <span>OUR PROCESS</span>

                    <h2>
                        Excellence In <span>Every Step</span>
                    </h2>

                    <p>
                        From product selection to final delivery, every step is guided by
                        quality, precision, and attention to detail.
                    </p>

                </div>

                <div className="process-grid">

                    {process.map((item) => (

                        <div className="process-card" key={item.id}>

                            <div className="process-number">
                                {item.id}
                            </div>

                            <div className="process-icon">
                                {item.icon}
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.desc}</p>

                        </div>

                    ))}

                </div>

            </section>


            {/* Achievements */}



            <section className="stats-section">

                <div className="container">

                    <div className="stats-heading">

                        <span>OUR ACHIEVEMENTS</span>

                        <h2>Trusted By Thousands</h2>

                        <p>
                            Our commitment to quality and customer satisfaction has helped us
                            become a trusted destination for premium crockery.
                        </p>

                    </div>

                    <div className="stats-grid">

                        <div className="stat-card">
                            <h2>10+</h2>
                            <h4>Years Experience</h4>
                        </div>

                        <div className="stat-card">
                            <h2>25K+</h2>
                            <h4>Happy Customers</h4>
                        </div>

                        <div className="stat-card">
                            <h2>500+</h2>
                            <h4>Premium Products</h4>
                        </div>

                        <div className="stat-card">
                            <h2>99%</h2>
                            <h4>Customer Satisfaction</h4>
                        </div>

                    </div>

                </div>

            </section>



            {/* Testimonials */}

            <section className="testimonial-section">

                <div className="testimonial-heading">

                    <span>TESTIMONIALS</span>

                    <h2>What Our Customers Say</h2>

                    <p>
                        Hear from customers who trust us for premium crockery, elegant
                        designs, and exceptional quality.
                    </p>

                </div>

                <div className="testimonial-grid">

                    <div className="testimonial-card">

                        <Quote className="quote-icon" size={34} />

                        <p>
                            The dinner set exceeded my expectations. The quality,
                            packaging, and overall experience felt truly premium.
                        </p>

                        <div className="stars">
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                        </div>

                        <div className="customer">

                            <img
                                src="https://i.pravatar.cc/100?img=12"
                                alt="Customer"
                            />

                            <div>
                                <h4>Ahmed Khan</h4>
                                <span>Lahore</span>
                            </div>

                        </div>

                    </div>

                    <div className="testimonial-card">

                        <Quote className="quote-icon" size={34} />

                        <p>
                            Beautiful craftsmanship with fast delivery. Every piece
                            perfectly matched the photos on the website.
                        </p>

                        <div className="stars">
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                        </div>

                        <div className="customer">

                            <img
                                src="https://i.pravatar.cc/100?img=32"
                                alt="Customer"
                            />

                            <div>
                                <h4>Sarah Ali</h4>
                                <span>Karachi</span>
                            </div>

                        </div>

                    </div>

                    <div className="testimonial-card">

                        <Quote className="quote-icon" size={34} />

                        <p>
                            Their customer service was outstanding. I will definitely
                            purchase again and recommend them to friends.
                        </p>

                        <div className="stars">
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                            <Star fill="#D4AF37" size={18} />
                        </div>

                        <div className="customer">

                            <img
                                src="https://i.pravatar.cc/100?img=45"
                                alt="Customer"
                            />

                            <div>
                                <h4>Hamza Malik</h4>
                                <span>Islamabad</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* FAQs Arays */}


            <section className="faq-section">

                <div className="faq-heading">

                    <span>FAQ</span>

                    <h2>Frequently Asked Questions</h2>

                    <p>
                        Everything you need to know before placing your order.
                    </p>

                </div>

                <div className="faq-container">

                    {faqs.map((faq, index) => (

                        <div className="faq-item" key={index}>

                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >

                                <span>{faq.question}</span>

                                {activeIndex === index ? (
                                    <Minus size={20} />
                                ) : (
                                    <Plus size={20} />
                                )}

                            </button>

                            {activeIndex === index && (

                                <div className="faq-answer">

                                    <p>{faq.answer}</p>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </section>



{/* CTA Section */}

<section className="cta-section">

    <div className="container">

        <div className="cta-content">

            <span>PREMIUM CROCKERY COLLECTION</span>

            <h2>
                Elevate Your Dining Experience With Timeless Elegance
            </h2>

            <p>
                Discover beautifully crafted crockery designed to bring
                sophistication, durability, and style to every meal.
            </p>

            <Link to="/Categories" className="cta-btn">

                Explore Collection

                <ArrowRight size={20}/>

            </Link>

        </div>

    </div>

</section>
        </section>
    );
}

export default About;