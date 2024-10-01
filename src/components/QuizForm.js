import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

const QuizForm = ({ onQuizAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://assingment-1-1fz6.onrender.com/quizzes', {
                title,
                description,
            });
            onQuizAdded(response.data); // Notify parent component of the new quiz
            setSnackbarMessage('Quiz added successfully!');
            setOpenSnackbar(true);
            // Reset form
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding quiz:', error);
            setSnackbarMessage('Failed to add quiz.');
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
                    label="Quiz Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                />
            </div>
            <div>
                <TextField
                    label="Quiz Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
                Add Quiz
            </Button>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default QuizForm;
