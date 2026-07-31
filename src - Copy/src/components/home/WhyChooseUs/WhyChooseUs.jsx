import {
    ShieldCheck,
    Truck,
    BadgeCheck,
    RotateCcw,
} from "lucide-react";
import "./WhyChooseUs.css";

const features = [
    {
        icon: <BadgeCheck size={42} />,
        title: "Premium Quality",
        description: "Crafted with high-quality materials for everyday elegance.",
    },
    {
        icon: <Truck size={42} />,
        title: "Fast Delivery",
        description: "Quick and reliable shipping right to your doorstep.",
    },
    {
        icon: <ShieldCheck size={42} />,
        title: "Secure Payment",
        description: "100% safe and secure payment methods you can trust.",
    },
    {
        icon: <RotateCcw size={42} />,
        title: "Easy Returns",
        description: "Simple return policy for a worry-free shopping experience.",
    },
];

function WhyChooseUs() {
    return (
        <section className="why-choose-us">
            <div className="container">
                <h2>Why Choose Us</h2>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;