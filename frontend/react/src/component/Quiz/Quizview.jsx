// QuizView.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const QuizView = () => {
    const {courseId, lessonId} = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState({correct: 0, total: 0});
    const [answers, setAnswers] = useState([]);
}