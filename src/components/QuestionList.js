import React from 'react';
import { List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const QuestionList = ({ questions, onQuestionDeleted }) => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleDelete = async (questionId) => {
        try {
            await axios.delete(`https://assingment-1-1fz6.onrender.com/questions/${questionId}`);
            onQuestionDeleted(questionId); // Notify parent component of the deleted question
            setSnackbarMessage('Question deleted successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error deleting question:', error);
            setSnackbarMessage('Failed to delete question.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <h2>Question List</h2>
            <List>
                {questions.map((question) => (
                    <ListItem key={question._id}>
                        <ListItemText primary={question.text} />
                        <Button onClick={() => handleDelete(question._id)} color="secondary">
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

export default QuestionList;
