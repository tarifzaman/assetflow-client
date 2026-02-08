import { motion } from "framer-motion";
import { BarChart3, Users, Globe, ShieldCheck } from "lucide-react";

const stats = [
  { icon: <Users />, label: "Active Companies", value: "500+" },
  { icon: <BarChart3 />, label: "Assets Tracked", value: "50k+" },
  { icon: <Globe />, label: "Global Reach", value: "24/7" },
];

const About = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Illustration or Image */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2070"
              className="rounded-3xl shadow-2xl relative z-10"
              alt="Team working"
            />
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              Empowering Businesses with{" "}
              <span className="text-primary">Reliable</span> Asset Tracking
            </h2>
            <p className="opacity-70 mb-8 leading-relaxed">
              AssetFlow solves the common problem of losing track of valuable
              equipment. Our system ensures clear visibility into your
              inventory, streamlines assignments, and reduces administrative
              overhead for HR departments.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-base-200 border border-base-300"
                >
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs opacity-60 uppercase font-bold tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
