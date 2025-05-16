const Navbar = () => {
  return (
    <div className="bg-black text-white py-4 px-6 flex flex-wrap items-center justify-around shadow-lg">
      {/* FinanceX Logo */}
      <div className="flex items-center gap-3">
        <img src="icon.png" alt="FinanceX Logo" className="w-12 md:w-16 h-auto object-contain" />
        <p className="text-lg md:text-2xl font-extrabold">FinanceX</p>
      </div>

      {/* The Catalyst Project Logo */}
      <div className="flex items-center gap-3">
        <img src="Catalyst logo.png" alt="Catalyst Logo" className="w-12 md:w-16 h-auto object-contain" />
        <p className="text-lg md:text-2xl font-extrabold">The Catalyst Project</p>
      </div>
    </div>
  );
};

export default Navbar;

