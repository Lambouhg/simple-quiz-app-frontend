import React, { useState, useEffect } from 'react';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [quizzes, setQuizzes] = useState([]); // State for quizzes

    // Fetch questions when the component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://assingment-1-1fz6.onrender.com/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    // Fetch quizzes when the component mounts
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://assingment-1-1fz6.onrender.com/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    // Handle when a new question is added
    const handleQuestionAdded = (newQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    };

    // Handle when a question is deleted
    const handleQuestionDeleted = (questionId) => {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== questionId));
    };

    // Handle when a new quiz is added
    const handleQuizAdded = (newQuiz) => {
        setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    };

    // Handle when a quiz is deleted
    const handleQuizDeleted = (quizId) => {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
    };

    return (
        <Container>
            {/* Quiz Management */}
            <Typography variant="h4" gutterBottom align="center">
                Quiz Management
            </Typography>
            <QuizForm onQuizAdded={handleQuizAdded} />
            <QuizList quizzes={quizzes} onQuizDeleted={handleQuizDeleted} />

            {/* Question Management */}
            <Typography variant="h4" gutterBottom align="center">
                Question Management
            </Typography>
            <QuestionForm onQuestionAdded={handleQuestionAdded} />
            <QuestionList questions={questions} onQuestionDeleted={handleQuestionDeleted} />
        </Container>
    );
};

export default App;
