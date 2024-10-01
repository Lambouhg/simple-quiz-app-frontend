import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

const QuestionForm = ({ onQuestionAdded }) => {
    const [text, setText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://assingment-1-1fz6.onrender.com/questions', {
                text,
                options,
                correctAnswerIndex,
            });
            onQuestionAdded(response.data); // Notify parent component of the new question
            setSnackbarMessage('Question added successfully!');
            setOpenSnackbar(true);
            // Reset form
            setText('');
            setOptions(['', '', '', '']);
            setCorrectAnswerIndex(0);
        } catch (error) {
            console.error('Error adding question:', error);
            setSnackbarMessage('Failed to add question.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    label="Question Text"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    fullWidth
                />
            </div>
            <div>
                <label>Options:</label>
                {options.map((option, index) => (
                    <TextField
                        key={index}
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        required
                        fullWidth
                    />
                ))}
            </div>
            <div>
                <TextField
                    type="number"
                    label="Correct Answer Index"
                    value={correctAnswerIndex}
                    onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
                    required
                    fullWidth
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
                Add Question
            </Button>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default QuestionForm;
