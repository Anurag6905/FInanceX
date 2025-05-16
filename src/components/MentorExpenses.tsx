import { useState, useEffect } from "react";

interface MentorExpense {
    id: string;
    fee: number;
    students: number;
    mentorName: string;
    notes: string;
}

const MentorExpenses = () => {
    const [expenses, setExpenses] = useState<MentorExpense[]>([]);

    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedExpenses = localStorage.getItem("mentorExpenses");
        if (storedExpenses) {
            try {
                setExpenses(JSON.parse(storedExpenses) || []);
            } catch (error) {
                console.error("Error parsing stored expenses:", error);
                setExpenses([]);
            }
        }
    }, []);

    // Save data to local storage whenever expenses change
    useEffect(() => {
        if (expenses.length > 0) {
            localStorage.setItem("mentorExpenses", JSON.stringify(expenses));
        }
    }, [expenses]);

    // Function to add a new mentor expense card
    const addExpense = () => {
        setExpenses([...expenses, { id: crypto.randomUUID(), fee: 0, students: 0, mentorName: "", notes: "" }]);
    };

    // Function to update a specific mentor's details
    const updateExpense = (id: string, key: keyof MentorExpense, value: string | number) => {
        const updatedExpenses = expenses.map(expense =>
            expense.id === id ? { ...expense, [key]: value } : expense
        );
        setExpenses(updatedExpenses);
    };

    // Function to delete a mentor expense card
    const deleteExpense = (id: string) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
        localStorage.setItem("mentorExpenses", JSON.stringify(updatedExpenses));
    };

    // Function to clear local storage
    const clearStorage = () => {
        localStorage.removeItem("mentorExpenses");
        setExpenses([]);
    };

    // Calculate total mentor expenses safely
    const totalExpense = expenses.reduce((total, expense) => {
        const fee = Number(expense.fee) || 0;
        const students = Number(expense.students) || 0;
        return total + (fee * students);
    }, 0);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Mentor Expenses</h2>

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={addExpense}
                >
                    + Add Mentor Payment
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={clearStorage}
                >
                    Clear All
                </button>
            </div>

            {expenses.length === 0 && <p className="text-gray-400 mt-4">No mentor expenses added yet.</p>}

            {expenses.map((expense) => (
                <div key={expense.id} className="flex flex-wrap items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md mt-4">
                    <input
                        type="text"
                        className="p-2 border rounded-md w-full sm:w-40 bg-gray-800 text-white"
                        placeholder="Mentor Name"
                        value={expense.mentorName}
                        onChange={(e) => updateExpense(expense.id, "mentorName", e.target.value)}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded-md w-full sm:w-40 bg-gray-800 text-white"
                        placeholder="Fee per Month (₹)"
                        value={expense.fee || ""}
                        onChange={(e) => updateExpense(expense.id, "fee", Number(e.target.value) || 0)}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded-md w-full sm:w-40 bg-gray-800 text-white"
                        placeholder="Number of Months"
                        value={expense.students || ""}
                        onChange={(e) => updateExpense(expense.id, "students", Number(e.target.value) || 0)}
                    />
                    <input
                        type="text"
                        className="p-2 border rounded-md w-full sm:w-60 bg-gray-800 text-white"
                        placeholder="Additional Notes"
                        value={expense.notes}
                        onChange={(e) => updateExpense(expense.id, "notes", e.target.value)}
                    />
                    <p className="font-semibold text-green-400">₹ {expense.fee * expense.students}</p>
                    <button
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => deleteExpense(expense.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}

            {expenses.length > 0 && (
                <div className="mt-4 p-4 rounded-lg text-lg font-semibold text-red-400">
                    Total Mentor Expenses: ₹ {totalExpense}
                </div>
            )}
        </div>
    );
};

export default MentorExpenses;
