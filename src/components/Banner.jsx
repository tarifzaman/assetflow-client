import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-base-100 pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
        <div className="aspect-[1000/600] w-[60rem] bg-gradient-to-tr from-primary to-secondary"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Zap size={16} />
              <span>Smart Asset Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Optimize Your <span className="text-primary">Business</span> Resources
            </h1>
            <p className="text-lg opacity-70 mb-10 max-w-xl mx-auto lg:mx-0">
              AssetFlow helps companies track, manage, and assign physical assets to employees with zero friction. Enhance accountability and reduce loss today.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link to="/join-hr" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20">
                Join as HR Manager
                <ArrowRight size={18} />
              </Link>
              <Link to="/join-employee" className="btn btn-outline rounded-full px-8">
                Join as Employee
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 opacity-60">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="h-4 w-px bg-base-300"></div>
              <div className="text-sm font-medium">100+ Companies Trusted</div>
            </div>
          </motion.div>

          {/* Right Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-200 bg-base-200/50 p-4">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Asset Dashboard" 
                className="rounded-2xl shadow-inner w-full h-auto"
              />
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white dark:bg-neutral p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 text-success flex items-center justify-center rounded-full">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Total Assets</p>
                    <p className="font-bold">1,240+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;