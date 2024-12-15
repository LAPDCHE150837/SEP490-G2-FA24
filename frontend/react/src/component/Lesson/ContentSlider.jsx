import React, {useEffect} from 'react';
import {Settings, Volume2, ChevronLeft, ChevronRight} from 'lucide-react';

const ContentSlider = ({
                           items,
                           currentSlide,
                           setCurrentSlide,
                           filterStatus,
                           learningStatus,
                           onLearningToggle,
                           isPlaying,
                           playAudio,
                           contentType // 'vocabulary', 'grammar', or 'kanji'
                       }) => {
    // Filter items based on current filter status
    const filteredItems = items?.filter(item => {
        if (filterStatus === 'learned') return learningStatus[item.id];
        if (filterStatus === 'unlearned') return !learningStatus[item.id];
        return true;
    }) || [];

    const totalSlides = filteredItems.length;

    // Add useEffect to handle currentSlide updates when filtering changes
    useEffect(() => {
        // If current slide is beyond the new total, adjust it to the last available slide
        if (currentSlide >= totalSlides && totalSlides > 0) {
            setCurrentSlide(totalSlides - 1);
        }
        // If there are no slides, reset to 0
        if (totalSlides === 0) {
            setCurrentSlide(0);
        }
    }, [totalSlides, currentSlide, setCurrentSlide]);

    // Handle learning toggle with slide adjustment
    const handleLearningToggle = (itemId) => {
        // Call the original toggle function
        onLearningToggle(itemId);

        // Calculate the new filtered items after the toggle
        const newFilteredItems = items?.filter(item => {
            const newLearningState = !learningStatus[itemId];
            if (filterStatus === 'learned') {
                return item.id === itemId ? newLearningState : learningStatus[item.id];
            }
            if (filterStatus === 'unlearned') {
                return item.id === itemId ? !newLearningState : !learningStatus[item.id];
            }
            return true;
        }) || [];

        // If the current item will be filtered out, adjust the slide
        if (newFilteredItems.length < totalSlides) {
            if (currentSlide >= newFilteredItems.length) {
                setCurrentSlide(Math.max(0, newFilteredItems.length - 1));
            }
        }
    };

    if (filteredItems.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500">
                {filterStatus === 'learned' && `Không có ${contentType === 'grammar' ? 'ngữ pháp' : contentType === 'kanji' ? 'Kanji' : 'từ vựng'} nào đã thuộc`}
                {filterStatus === 'unlearned' && `Không có ${contentType === 'grammar' ? 'ngữ pháp' : contentType === 'kanji' ? 'Kanji' : 'từ vựng'} nào chưa thuộc`}
                {filterStatus === 'all' && `Không có ${contentType === 'grammar' ? 'ngữ pháp' : contentType === 'kanji' ? 'Kanji' : 'từ vựng'}`}
            </div>
        );
    }

    const renderVocabularyContent = (item) => (
        <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.word} className="w-full h-40 object-cover rounded-lg shadow-sm"/>
                ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <div className="col-span-3">
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-4xl font-bold text-gray-800">{item.word}</span>
                    <span className="text-xl text-gray-600">({item.reading})</span>
                    <button
                        onClick={() => playAudio(item.word)}
                        disabled={isPlaying}
                        className={`p-2 hover:bg-blue-50 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                    >
                        <Volume2 className="text-blue-500" size={20}/>
                    </button>
                    <button
                        onClick={() => onLearningToggle(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 
              ${!learningStatus[item.id] ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                        <div
                            className={`w-2 h-2 rounded-full ${!learningStatus[item.id] ? 'bg-gray-400' : 'bg-green-500'}`}/>
                        {!learningStatus[item.id] ? 'Chưa học' : 'Đã học'}
                    </button>
                </div>
                <div className="space-y-4">
                    <p className="text-lg text-gray-700">
                        <span className="font-medium">Nghĩa:</span> {item.meaning}
                    </p>
                    {item.example && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-800 font-medium">Ví dụ:</p>
                            <p className="text-lg">{item.example}</p>
                            <p className="text-gray-600">{item.exampleReading}</p>
                            <p className="text-gray-700 mt-1">{item.exampleMeaning}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderGrammarContent = (item) => (
        // Grammar content rendering
        <div className="grid grid-cols-4 gap-6">
            {/* Similar structure to your existing grammar content */}
            <div className="col-span-1">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.pattern}
                         className="w-full h-40 object-cover rounded-lg shadow-sm"/>
                ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <div className="col-span-3">
                {/* Rest of your grammar content */}
                <div className="mb-4">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-bold text-blue-600">{item.pattern}</h3>
                        <button
                            onClick={() => playAudio(item.pattern)}
                            disabled={isPlaying}
                            className={`p-2 hover:bg-blue-50 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                        >
                            <Volume2 className="text-blue-500" size={20}/>
                        </button>
                        <button
                            onClick={() => onLearningToggle(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
                ${!learningStatus[item.id] ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${!learningStatus[item.id] ? 'bg-gray-400' : 'bg-green-500'}`}/>
                            {!learningStatus[item.id] ? 'Chưa học' : 'Đã học'}
                        </button>
                    </div>
                    <p className="text-lg text-gray-700 mt-2">{item.meaning}</p>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-700 mb-2">Cách dùng:</p>
                        <p className="text-gray-600">{item.grammarUsage}</p>
                    </div>

                    {item.example && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-medium text-blue-700 mb-2">Ví dụ:</p>
                            <p className="text-lg">{item.example}</p>
                            <p className="text-gray-600 mt-1">{item.exampleReading}</p>
                            <p className="text-gray-700 mt-1">{item.exampleMeaning}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );

    const renderKanjiContent = (item) => (
        // Kanji content rendering
        <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.character}
                         className="w-full h-40 object-cover rounded-lg shadow-sm"/>
                ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <div className="col-span-3">
                <div className="flex items-center mb-4">
                    <span className="text-6xl font-bold text-gray-800">{item.character}</span>
                    <button
                        onClick={() => playAudio(item.character)}
                        disabled={isPlaying}
                        className={`ml-4 p-2 hover:bg-blue-50 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                    >
                        <Volume2 className="text-blue-500" size={24}/>
                    </button>
                    <button
                        onClick={() => onLearningToggle(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
              ${!learningStatus[item.id] ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                        <div
                            className={`w-2 h-2 rounded-full ${!learningStatus[item.id] ? 'bg-gray-400' : 'bg-green-500'}`}/>
                        {!learningStatus[item.id] ? 'Chưa học' : 'Đã học'}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Onyomi</h4>
                        <div className="flex items-center">
                            <p className="text-lg text-gray-600">{item.onyomi}</p>
                            <button
                                onClick={() => playAudio(item.onyomi)}
                                disabled={isPlaying}
                                className={`ml-2 hover:bg-gray-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                            >
                                <Volume2 className="text-green-500" size={16}/>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Kunyomi</h4>
                        <div className="flex items-center">
                            <p className="text-lg text-gray-600">{item.kunyomi}</p>
                            <button
                                onClick={() => playAudio(item.kunyomi)}
                                disabled={isPlaying}
                                className={`ml-2 hover:bg-gray-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                            >
                                <Volume2 className="text-green-500" size={16}/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Nghĩa</h4>
                    <div className="flex items-center">
                        <p className="text-lg text-gray-700">{item.meaning}</p>
                        <button
                            onClick={() => playAudio(item.meaning, false)}
                            className={`ml-2 hover:bg-blue-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                        >
                            <Volume2 className="text-blue-500" size={16}/>
                        </button>
                    </div>
                </div>
                {/* Rest of your kanji content */}
            </div>
        </div>
    );

    return (
        <div className="relative h-full">
            {currentSlide > 0 && (
                <button
                    onClick={() => setCurrentSlide(prev => prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                >
                    <ChevronLeft size={24}/>
                </button>
            )}

            <div className="h-full overflow-hidden">
                <div
                    className="flex transition-transform duration-300 h-full"
                    style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                    {filteredItems.map((item, index) => (
                        <div key={index} className="min-w-full px-16">
                            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                {/* Replace the onLearningToggle with handleLearningToggle in your content render functions */}
                                {contentType === 'vocabulary' && renderVocabularyContent({...item, onLearningToggle: handleLearningToggle})}
                                {contentType === 'grammar' && renderGrammarContent({...item, onLearningToggle: handleLearningToggle})}
                                {contentType === 'kanji' && renderKanjiContent({...item, onLearningToggle: handleLearningToggle})}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {currentSlide < totalSlides - 1 && (
                <button
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                >
                    <ChevronRight size={24}/>
                </button>
            )}

            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                {currentSlide + 1}/{totalSlides}
            </div>
        </div>
    );


};

export default ContentSlider;