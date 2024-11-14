
import React, { useEffect, useState, useRef } from 'react';
import { X, Mic, Square, Award, AlertCircle } from 'lucide-react';

const RecordingModal = ({ character, isVisible, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState([]);

    const recognition = useRef(null);

    useEffect(() => {
        if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
            setError('Speech recognition not supported. Please use Chrome.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.interimResults = false;
        recognition.current.lang = 'ja-JP';

        recognition.current.onstart = () => {
            setIsListening(true);
            setError(null);
            setTranscript('');
            setScore(null);
            setFeedback('');
            console.log('Started listening...');
        };

        recognition.current.onend = () => {
            setIsListening(false);
            console.log('Stopped listening...');
        };

        recognition.current.onresult = (event) => {
            const transcriptText = event.results[0][0].transcript;
            console.log('Got transcript:', transcriptText);

            setTranscript(transcriptText);
            analyzeResult(transcriptText);
        };

        recognition.current.onerror = (event) => {
            console.error('Recognition error:', event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        return () => {
            if (recognition.current) {
                recognition.current.abort();
            }
        };
    }, []);

    const startListening = () => {
        try {
            recognition.current.start();
        } catch (err) {
            console.error('Start listening error:', err);
            setError('Error starting recognition');
        }
    };

    const stopListening = () => {
        if (recognition.current) {
            recognition.current.stop();
        }
    };

    const analyzeResult = (transcriptText) => {
        if (!transcriptText) return;

        // Clean up the transcript by removing periods and other punctuation
        const cleanTranscript = transcriptText.replace(/[。、.,!?！？]/g, '').trim();
        const cleanCharacter = character.replace(/[。、.,!?！？]/g, '').trim();

        console.log('Clean transcript:', cleanTranscript);
        console.log('Clean character:', cleanCharacter);

        // Compare the cleaned versions
        let pronunciationScore =
            cleanTranscript === cleanCharacter || cleanTranscript.includes(cleanCharacter)
                ? 100
                : 0;

        let feedbackMessage = '';

        if (pronunciationScore >= 90) {
            feedbackMessage = '完璧！ Perfect pronunciation!';
        } else if (pronunciationScore >= 80) {
            feedbackMessage = 'とても良い！ Very good pronunciation!';
        } else if (pronunciationScore >= 70) {
            feedbackMessage = '良い！ Keep practicing!';
        } else {
            feedbackMessage = 'もう一度！ Try again!';
        }

        // Add to attempts
        setAttempts(prev => [
            {
                transcript: transcriptText,
                score: pronunciationScore,
                date: new Date()
            },
            ...prev
        ].slice(0, 5));

        setScore(pronunciationScore);
        setFeedback(feedbackMessage);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-xl max-w-md w-full m-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="mb-6 text-center">
                    <div className="mb-2 inline-block px-3 py-1 bg-cyan-500/10 rounded-full">
                        <span className="text-3xl font-bold text-cyan-400">{character}</span>
                    </div>
                    <p className="text-gray-400 text-sm">Pronunciation Practice</p>
                </div>

                {error ? (
                    <div className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Recording Controls */}
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={`p-4 rounded-full ${
                                    isListening
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-cyan-500 hover:bg-cyan-600'
                                } text-white transition-colors`}
                            >
                                {isListening ? <Square size={24} /> : <Mic size={24} />}
                            </button>
                        </div>

                        {/* Status and Results */}
                        <div className="text-center space-y-4">
                            {isListening && (
                                <div className="text-cyan-400 animate-pulse flex items-center justify-center space-x-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"/>
                                    <span>Listening... Speak now</span>
                                </div>
                            )}

                            {transcript && (
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p className="text-lg text-white">You said: {transcript}</p>
                                </div>
                            )}

                            {score !== null && (
                                <div className={`bg-gray-800 p-4 rounded-lg ${
                                    score >= 90 ? 'bg-green-500/10' :
                                        score >= 80 ? 'bg-blue-500/10' :
                                            score >= 70 ? 'bg-yellow-500/10' :
                                                'bg-red-500/10'
                                }`}>
                                    <div className="flex items-center justify-center mb-2">
                                        <Award size={24} className="text-cyan-400 mr-2" />
                                        <span className="text-2xl font-bold text-cyan-400">
                                            {score}/100
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{feedback}</p>
                                </div>
                            )}
                        </div>

                        {/* Previous Attempts */}
                        {attempts.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Previous Attempts</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {attempts.map((attempt, index) => (
                                        <div key={index} className="bg-gray-800/50 p-2 rounded text-sm">
                                            <div className="flex justify-between text-gray-400">
                                                <span>{attempt.transcript}</span>
                                                <span>{attempt.score}/100</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {attempt.date.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tips */}
                        <div className="bg-blue-500/10 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <AlertCircle size={16} className="text-blue-400 mr-2" />
                                <span className="text-blue-400 font-medium">Tips</span>
                            </div>
                            <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                                <li>Speak clearly and at a natural pace</li>
                                <li>Make sure you're in a quiet environment</li>
                                <li>Try to match the correct pitch and intonation</li>
                                <li>Practice multiple times to improve your score</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecordingModal;
