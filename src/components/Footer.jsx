import { Link } from "react-router-dom";
import { Facebook, Twitter, Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg">
                A
              </div>
              AssetFlow
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              The ultimate B2B solution for smart asset management. Track,
              manage, and optimize your company resources effortlessly.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/join-employee" className="hover:text-primary">
                  Join as Employee
                </Link>
              </li>
              <li>
                <Link to="/join-hr" className="hover:text-primary">
                  Join as HR Manager
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@assetflow.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+880 1234 567890</span>
              </li>
              <li className="text-xs mt-4">
                123 Business Avenue, Tech City, BD
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm opacity-70 mb-4">
              Get the latest updates on asset tracking.
            </p>
            <div className="join w-full">
              <input
                className="input input-bordered join-item w-full bg-base-100"
                placeholder="Email"
              />
              <button className="btn btn-primary join-item">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-16 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} AssetFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
