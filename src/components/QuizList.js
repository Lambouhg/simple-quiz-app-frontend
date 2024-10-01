import React from 'react';
import { List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const QuizList = ({ quizzes, onQuizDeleted }) => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleDelete = async (quizId) => {
        try {
            await axios.delete(`https://assingment-1-1fz6.onrender.com/quizzes/${quizId}`);
            onQuizDeleted(quizId); // Notify parent component of the deleted quiz
            setSnackbarMessage('Quiz deleted successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting quiz:', error);
            setSnackbarMessage('Failed to delete quiz.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <h2>Quiz List</h2>
            <List>
                {quizzes.map((quiz) => (
                    <ListItem key={quiz._id}>
                        <ListItemText primary={quiz.title} secondary={quiz.description} />
                        <Button onClick={() => handleDelete(quiz._id)} color="secondary">
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QuizList;
