const steps = [
  { title: "Register", desc: "HR registers company and gets a default package." },
  { title: "Add Assets", desc: "List your laptops, chairs, and other office gear." },
  { title: "Assign & Track", desc: "Employees request assets, and you approve with one click." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black mb-12">Streamline Your Workflow in 3 Steps</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-black opacity-20 mb-4">{i + 1}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="opacity-80 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;