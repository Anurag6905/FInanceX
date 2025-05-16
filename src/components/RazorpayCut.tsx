import { useState, useEffect } from "react";

const RazorpayCut = () => {
    const [income, setIncome] = useState<number>(0);
    const [razorpayPercent, setRazorpayPercent] = useState<number>(2); // Default 2%
    const [finalAmount, setFinalAmount] = useState<number>(0);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedIncome = localStorage.getItem("totalIncome");
        const storedPercent = localStorage.getItem("razorpayPercent");

        if (storedIncome) setIncome(parseFloat(storedIncome));
        if (storedPercent) setRazorpayPercent(parseFloat(storedPercent));
    }, []);

    // Calculate final amount after Razorpay deduction
    useEffect(() => {
        const razorpayCut = (income * razorpayPercent) / 100;
        setFinalAmount(income - razorpayCut);
    }, [income, razorpayPercent]);

    // Update Razorpay percentage
    const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPercent = parseFloat(e.target.value) || 0;
        setRazorpayPercent(newPercent);
        localStorage.setItem("razorpayPercent", newPercent.toString());
    };

    return (
        <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Razorpay Deduction</h2>
            
            <div className="mb-4">
                <p className="text-gray-400">Total Income: <span className="font-semibold text-green-400">₹ {income.toLocaleString()}</span></p>
            </div>

            {/* Razorpay Fee Input */}
            <label className="block mb-2 font-semibold text-gray-300">Razorpay Fee (%)</label>
            <input
                type="number"
                className="p-3 border border-gray-600 rounded-md w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Razorpay fee percentage"
                value={razorpayPercent}
                onChange={handlePercentChange}
            />

            {/* Calculation Results */}
            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-lg font-semibold border border-gray-700">
                <p className="text-red-400">Razorpay Cut: ₹ {(income * razorpayPercent / 100).toFixed(2)}</p>
                <p className="text-green-400">Final Amount After Deduction: ₹ {finalAmount.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default RazorpayCut;