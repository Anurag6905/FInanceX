import { useState, useEffect } from "react";

const FinalSummary = () => {
    const [income, setIncome] = useState<number>(0);
    const [razorpayPercent, setRazorpayPercent] = useState<number>(2);
    const [otherExpenses, setOtherExpenses] = useState<number>(0);
    const [mentorExpenses, setMentorExpenses] = useState<number>(0);
    const [razorpayCut, setRazorpayCut] = useState<number>(0);
    const [finalProfit, setFinalProfit] = useState<number>(0);

    // Function to safely retrieve a number from localStorage
    const getStoredNumber = (key: string, defaultValue: number = 0): number => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? parseFloat(storedValue) || defaultValue : defaultValue;
    };

    useEffect(() => {
        setIncome(getStoredNumber("totalIncome"));
        setRazorpayPercent(getStoredNumber("razorpayPercent", 2));
        setOtherExpenses(getStoredNumber("otherExpenses"));

        // Retrieve and sum up mentor expenses from localStorage
        const storedMentorExpenses = localStorage.getItem("mentorExpenses");
        if (storedMentorExpenses) {
            try {
                const expensesArray = JSON.parse(storedMentorExpenses);
                if (Array.isArray(expensesArray)) {
                    const totalMentorExpense = expensesArray.reduce((sum, exp) => sum + (exp.fee * exp.students), 0);
                    setMentorExpenses(totalMentorExpense);
                } else {
                    setMentorExpenses(0);
                }
            } catch (error) {
                console.error("Error parsing mentor expenses:", error);
                setMentorExpenses(0);
            }
        }
    }, []);

    // Calculate razorpay deduction and final profit
    useEffect(() => {
        const calculatedRazorpayCut = (income * razorpayPercent) / 100;
        setRazorpayCut(calculatedRazorpayCut);
        setFinalProfit(income - calculatedRazorpayCut - otherExpenses - mentorExpenses);
    }, [income, razorpayPercent, otherExpenses, mentorExpenses]);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-400">📊 Final Financial Summary</h2>

            <div className="grid grid-cols-2 gap-6 text-lg">
                {/* Income Section */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-300">Total Income</h3>
                    <p className="text-green-400 font-bold text-2xl">₹ {income.toFixed(2)}</p>
                </div>

                {/* Razorpay Deduction */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-300">Razorpay Deduction ({razorpayPercent}%)</h3>
                    <p className="text-red-400 font-bold text-2xl">₹ {razorpayCut.toFixed(2)}</p>
                </div>

                {/* Other Expenses */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-300">Other Expenses</h3>
                    <p className="text-yellow-400 font-bold text-2xl">₹ {otherExpenses.toFixed(2)}</p>
                </div>

                {/* Mentor Expenses */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-300">Total Mentor Expenses</h3>
                    <p className="text-blue-400 font-bold text-2xl">₹ {mentorExpenses.toFixed(2)}</p>
                </div>
            </div>

            <hr className="my-6 border-gray-700" />

            {/* Final Profit Section */}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-300">💰 Final Profit</h3>
                <p className={`text-3xl font-bold ${finalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ₹ {finalProfit.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default FinalSummary;