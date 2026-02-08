import { Check } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
    color: "bg-base-100"
  },
  {
    name: "Standard", 
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"],
    color: "border-primary shadow-2xl scale-105 bg-primary/5", // Middle card highlight
    popular: true
  },
  {
    name: "Premium",
    employeeLimit: 20, 
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"],
    color: "bg-base-100"
  }
];

const Packages = () => {
  return (
    <section className="py-24 bg-base-200/50">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Choose Your Plan</h2>
          <p className="opacity-70 max-w-lg mx-auto">Scale your asset management as your company grows. Simple pricing for every business size.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`card border-2 p-8 rounded-3xl relative ${pkg.color} ${!pkg.popular && 'border-base-300'}`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-primary font-bold py-3 px-6">MOST POPULAR</span>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">${pkg.price}</span>
                  <span className="opacity-60 text-sm">/month</span>
                </div>
                <p className="mt-4 text-sm font-medium text-primary">Up to {pkg.employeeLimit} Employees</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="bg-primary/10 text-primary p-1 rounded-full">
                      <Check size={14} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`btn rounded-full w-full ${pkg.popular ? 'btn-primary shadow-lg shadow-primary/30' : 'btn-outline'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;