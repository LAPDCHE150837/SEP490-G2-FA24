import React, { useState } from "react";
import {
    Button,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Card,
    CardContent,
    CardMedia,
    Container,
    Box,
} from "@mui/material";

const QuizApp = () => {
    const questions = [
        {
            id: 1,
            type: "multiple-choice",
            question: "日本の首都はどこですか？",
            options: ["東京", "大阪", "京都", "福岡"],
            correctAnswer: "東京",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Tokyo_Skyline_at_Dawn.jpg",
        },
        {
            id: 2,
            type: "writing",
            question: "二＋三は？",
            correctAnswer: "五",
            file: "https://example.com/example.pdf",
        },
        {
            id: 3,
            type: "speaking",
            question: "こんにちはを言ってください。",
            correctAnswer: "こんにちは",
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleOptionChange = (option) => setSelectedOption(option);
    const handleInputChange = (e) => setUserAnswer(e.target.value);

    const handleSpeechRecognition = () => {
        if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            alert("Trình duyệt không hỗ trợ Speech Recognition");
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "ja-JP";
        recognition.start();

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setUserAnswer(spokenText);
        };

        recognition.onerror = () => {
            alert("認識できませんでした。もう一度お試しください。");
        };
    };

    const handleSubmit = () => {
        const question = questions[currentQuestion];

        if (
            (question.type === "multiple-choice" && selectedOption === question.correctAnswer) ||
            (question.type === "writing" && userAnswer.trim() === question.correctAnswer) ||
            (question.type === "speaking" && userAnswer.trim() === question.correctAnswer)
        ) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption("");
            setUserAnswer("");
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption("");
        setUserAnswer("");
        setScore(0);
        setQuizCompleted(false);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={4}>
                <Typography variant="h4" align="center" gutterBottom>
                    日本語クイズ
                </Typography>
                {!quizCompleted ? (
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                質問 {currentQuestion + 1}/{questions.length}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {questions[currentQuestion].question}
                            </Typography>

                            {questions[currentQuestion].image && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={questions[currentQuestion].image}
                                    alt="Question"
                                    style={{ marginBottom: "16px" }}
                                />
                            )}

                            {questions[currentQuestion].file && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    href={questions[currentQuestion].file}
                                    download
                                    style={{ marginBottom: "16px" }}
                                >
                                    添付ファイルをダウンロード
                                </Button>
                            )}

                            {questions[currentQuestion].type === "multiple-choice" ? (
                                <RadioGroup value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
                                    {questions[currentQuestion].options.map((option) => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </RadioGroup>
                            ) : questions[currentQuestion].type === "writing" ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="ここに答えを入力してください"
                                    value={userAnswer}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: "16px" }}
                                />
                            ) : (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSpeechRecognition}
                                    style={{ marginBottom: "16px" }}
                                >
                                    話す
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSubmit}
                            >
                                {currentQuestion === questions.length - 1 ? "終了" : "次"}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                クイズ終了
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom>
                                あなたのスコアは {score}/{questions.length} 点です。
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={resetQuiz}
                            >
                                再試行
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default QuizApp;
