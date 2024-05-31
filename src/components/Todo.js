import { React, Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// MUI imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Redux import
import { useDispatch } from 'react-redux';
import { addTodo } from '../Redux/TodoSlice';

// Styles import
import { buttonStyle, textfieldStyle } from '../styles/sxStyles';
import '../styles/Todo.css';

// Helper function to get the formatted date
const getFormattedDate = () => {
    // Creating a new Date object to get current date and time
    const date = new Date();

    // Array of day names
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Extracting day, day of month, month, and year from the date object
    const day = days[date.getDay()]; // Get the day of the week (0-6)
    const dayOfMonth = date.getDate(); // Get the day of the month (1-31)
    const month = months[date.getMonth()]; // Get the month (0-11)
    const year = date.getFullYear(); // Get the year (e.g., 2022)

    // Function to get the suffix for the day of the month (e.g., 1st, 2nd, 3rd, etc.)
    const nth = (d) => {
        // If the day is between 4 and 20, or ends in 0, it gets 'th' suffix
        if (d > 3 && d < 21) return 'th';
        // For other cases, determine the suffix based on the last digit of the day
        switch (d % 10) {
            case 1: return 'st'; // 1st
            case 2: return 'nd'; // 2nd
            case 3: return 'rd'; // 3rd
            default: return 'th'; // 4th, 5th, 6th, ...
        }
    };

    // Constructing the formatted date string using the extracted components
    return `${day}, ${dayOfMonth}${nth(dayOfMonth)} ${month} ${year}`;
};


const Todo = () => {
    const todoCount = useSelector((state) => state.count); // Get todo count from state
    const [todoValue, setTodoValue] = useState(''); // State to store the value of the new todo
    const [error, setError] = useState(false); // State to manage the error state
    const [currentDate, setCurrentDate] = useState(''); // State to store the current formatted date
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

    // useEffect to set the current date when the component mounts
    useEffect(() => {
        setCurrentDate(getFormattedDate());
    }, []);

    // Handler for submitting the new todo
    const handleTodoSubmit = (e) => {
        if (todoValue === '') { // If the todo input is empty, set error state to true
            setError(true);
            return "";
        }
        dispatch(addTodo({
            title: todoValue, // Dispatch the addTodo action with the new todo value
        }));
        setTodoValue(''); // Clear the input field after submission
    };

    // Handler for text input change
    const handleTextChange = (e) => {
        setTodoValue(e.target.value); // Update the todoValue state with the input value
        setError(false); // Reset the error state
    };

    return (
        <Fragment>
            {/* Heading Section */}
            <div className='heading'>
                <Typography sx={{ fontWeight: 550, color: "white" }} variant="h2" component="h2">
                    Get It Done, Today!
                </Typography>
                {/* Displaying current date */}
                <Typography sx={{ color: "white", opacity: '0.5' }} variant="h6" component="h6">
                    {currentDate}
                </Typography>
            </div>

            {/* Todo Input Section */}
            <div className="todo-container">
                <TextField
                    sx={textfieldStyle} // Applying textfield style
                    onChange={handleTextChange} // Handling text change event
                    value={todoValue} // Setting value of text field
                    id="outlined-basic"
                    label="Enter Todo Text"
                    variant="outlined"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleTodoSubmit(); // Handling todo submission on Enter key press
                        }
                    }}
                    InputProps={{
                        // Adding button as end adornment to text field
                        endAdornment: (
                            <Button
                                sx={buttonStyle} // Applying button style
                                onClick={handleTodoSubmit} // Handling todo submission on button click
                                variant="contained"
                            >
                                Add
                            </Button>
                        ),
                    }}
                />

            </div>
            {/* Error message display */}
            {error && <div className='error-message'>Text can't be empty</div>}
        </Fragment>
    );
};

export default Todo;
