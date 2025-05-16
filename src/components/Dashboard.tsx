import { useState, useEffect } from "react";

const TotalIncome = () => {
    const [income, setIncome] = useState<number>(0);

    // Load income from localStorage when the component mounts
    useEffect(() => {
        const storedIncome = localStorage.getItem("totalIncome");
        if (storedIncome) {
            setIncome(parseFloat(storedIncome)); // Convert to number
        }
    }, []);

    // Function to update income and save it to localStorage
    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIncome = parseFloat(e.target.value) || 0; // Ensure valid number
        setIncome(newIncome);
        localStorage.setItem("totalIncome", newIncome.toString()); // Save to localStorage
    };

    return (
        <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Total Income</h2>

            <div className="flex flex-col gap-3">
                <label className="text-gray-400 text-sm">Enter your total income:</label>
                <input
                    type="number"
                    className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount (₹)"
                    value={income}
                    onChange={handleIncomeChange}
                />
            </div>

            <p className="mt-4 text-lg font-bold text-green-400">Total Income: ₹ {income.toLocaleString()}</p>
        </div>
    );
};

export default TotalIncome;