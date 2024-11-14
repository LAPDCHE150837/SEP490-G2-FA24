export const MOCK_COURSES = [
    {
        id: 1,
        title: "Khóa học N5 - Bắt đầu với tiếng Nhật",
        type: "Sơ cấp - N5",
        level: "N5",
        image: "https://cocotran.com/wp-content/uploads/2023/04/lin-mei-NYyCqdBOKwc-unsplash-1024x683.webp",
        date: "2024-01-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Hiragana và self-introduction",
                description: "Học bảng chữ Hiragana và cách giới thiệu bản thân",
                progress: 0,
                vocabulary: [
                    {word: "わたし", reading: "watashi", meaning: "Tôi"},
                    {word: "なまえ", reading: "namae", meaning: "Tên"},
                ],
                grammar: [
                    {pattern: "わたしは〜です", meaning: "Tôi là ~"},
                    {pattern: "〜と申します", meaning: "Tên tôi là ~"},
                ],
                kanji: [
                    {character: "私", reading: "わたし", meaning: "Tôi"},
                    {character: "名", reading: "な", meaning: "Tên"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Bài 1",
                    duration: 30, // minutes
                    totalQuestions: 20,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            },
            {
                id: 2,
                title: "Bài 2: Katakana và Numbers",
                description: "Học bảng chữ Katakana và số đếm",
                progress: 0,
                vocabulary: [
                    {word: "いち", reading: "ichi", meaning: "Một"},
                    {word: "に", reading: "ni", meaning: "Hai"},
                ],
                grammar: [
                    {pattern: "〜つ", meaning: "Đếm vật"},
                    {pattern: "〜人", meaning: "Đếm người"},
                ],
                kanji: [
                    {character: "一", reading: "いち", meaning: "Một"},
                    {character: "二", reading: "に", meaning: "Hai"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Số đếm",
                    duration: 20,
                    totalQuestions: 15,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 2,
        title: "Khóa học N4 - Tiếng nhật cơ bản 2",
        type: "Sơ trung cấp - N4",
        level: "N5",
        image: "https://uchi.imgix.net/properties/Pictures.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=675&ixlib=php-3.3.1&q=82&usm=20&w=1200",
        date: "2024-01-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Hiragana và self-introduction",
                description: "Học bảng chữ Hiragana và cách giới thiệu bản thân",
                progress: 0,
                vocabulary: [
                    {word: "わたし", reading: "watashi", meaning: "Tôi"},
                    {word: "なまえ", reading: "namae", meaning: "Tên"},
                ],
                grammar: [
                    {pattern: "わたしは〜です", meaning: "Tôi là ~"},
                    {pattern: "〜と申します", meaning: "Tên tôi là ~"},
                ],
                kanji: [
                    {character: "私", reading: "わたし", meaning: "Tôi"},
                    {character: "名", reading: "な", meaning: "Tên"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Bài 1",
                    duration: 30, // minutes
                    totalQuestions: 20,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            },
            {
                id: 2,
                title: "Bài 2: Katakana và Numbers",
                description: "Học bảng chữ Katakana và số đếm",
                progress: 0,
                vocabulary: [
                    {word: "いち", reading: "ichi", meaning: "Một"},
                    {word: "に", reading: "ni", meaning: "Hai"},
                ],
                grammar: [
                    {pattern: "〜つ", meaning: "Đếm vật"},
                    {pattern: "〜人", meaning: "Đếm người"},
                ],
                kanji: [
                    {character: "一", reading: "いち", meaning: "Một"},
                    {character: "二", reading: "に", meaning: "Hai"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Số đếm",
                    duration: 20,
                    totalQuestions: 15,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 3,
        title: "Khóa học N3 - Tiếng nhật nâng cao",
        type: "Mức độ trung cấp - N3",
        level: "N5",
        image: "https://www.plugandplaytechcenter.com/rendition/locations/APAC/Tokyo/Tokyo/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg-large.webp",
        date: "2024-01-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Hiragana và self-introduction",
                description: "Học bảng chữ Hiragana và cách giới thiệu bản thân",
                progress: 0,
                vocabulary: [
                    {word: "わたし", reading: "watashi", meaning: "Tôi"},
                    {word: "なまえ", reading: "namae", meaning: "Tên"},
                ],
                grammar: [
                    {pattern: "わたしは〜です", meaning: "Tôi là ~"},
                    {pattern: "〜と申します", meaning: "Tên tôi là ~"},
                ],
                kanji: [
                    {character: "私", reading: "わたし", meaning: "Tôi"},
                    {character: "名", reading: "な", meaning: "Tên"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Bài 1",
                    duration: 30, // minutes
                    totalQuestions: 20,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            },
            {
                id: 2,
                title: "Bài 2: Katakana và Numbers",
                description: "Học bảng chữ Katakana và số đếm",
                progress: 0,
                vocabulary: [
                    {word: "いち", reading: "ichi", meaning: "Một"},
                    {word: "に", reading: "ni", meaning: "Hai"},
                ],
                grammar: [
                    {pattern: "〜つ", meaning: "Đếm vật"},
                    {pattern: "〜人", meaning: "Đếm người"},
                ],
                kanji: [
                    {character: "一", reading: "いち", meaning: "Một"},
                    {character: "二", reading: "に", meaning: "Hai"},
                ],
                test: {
                    title: "Bài kiểm tra N5 - Số đếm",
                    duration: 20,
                    totalQuestions: 15,
                    questions: [
                        {
                            id: 1,
                            type: "vocabulary",
                            question: "わたし means ___.",
                            options: ["Tôi", "Bạn", "Anh ấy", "Cô ấy"],
                            correctAnswer: "Tôi",
                            translation: "わたし có nghĩa là gì?",
                            explanation: "わたし (watashi) là đại từ nhân xưng ngôi thứ nhất, nghĩa là 'tôi'"
                        },
                        {
                            id: 2,
                            type: "grammar",
                            question: "私_____学生です。",
                            options: ["は", "が", "を", "に"],
                            correctAnswer: "は",
                            translation: "Tôi là học sinh.",
                            explanation: "は được sử dụng để chỉ chủ ngữ trong câu"
                        },
                        {
                            id: 3,
                            type: "kanji",
                            question: "What is the reading of 私?",
                            options: ["わたし", "あなた", "かれ", "かのじょ"],
                            correctAnswer: "わたし",
                            translation: "Cách đọc của 私 là gì?",
                            explanation: "Kanji 私 được đọc là わたし (watashi)"
                        },
                        {
                            id: 4,
                            type: "vocabulary",
                            question: "はじめまして is used when ___.",
                            options: ["Meeting someone for the first time", "Saying goodbye", "Asking for directions", "Ordering food"],
                            correctAnswer: "Meeting someone for the first time",
                            translation: "はじめまして được sử dụng khi nào?",
                            explanation: "はじめまして được sử dụng khi gặp ai đó lần đầu tiên"
                        },
                        {
                            id: 5,
                            type: "grammar",
                            question: "Choose the correct introduction: _____",
                            options: ["わたしは田中です", "田中はわたしです", "です田中はわたし", "わたしです田中は"],
                            correctAnswer: "わたしは田中です",
                            translation: "Chọn cách giới thiệu đúng",
                            explanation: "Cấu trúc đúng là: [Chủ ngữ]は[Tên]です"
                        },
                        {
                            id: 6,
                            type: "vocabulary",
                            question: "あなた means ___.",
                            options: ["Bạn", "Tôi", "Họ", "Chúng tôi"],
                            correctAnswer: "Bạn",
                            translation: "あなた có nghĩa là gì?",
                            explanation: "あなた là đại từ nhân xưng ngôi thứ hai, nghĩa là 'bạn'"
                        },
                        {
                            id: 7,
                            type: "grammar",
                            question: "Choose the correct sentence: _____ と申します。",
                            options: ["たなか", "たなかは", "たなかを", "たなかに"],
                            correctAnswer: "たなか",
                            translation: "Chọn câu đúng: ___ と申します。",
                            explanation: "Khi sử dụng と申します, không cần thêm trợ từ trước tên"
                        },
                        {
                            id: 8,
                            type: "vocabulary",
                            question: "What does どうぞよろしく mean?",
                            options: ["Rất vui được gặp", "Tạm biệt", "Xin lỗi", "Cảm ơn"],
                            correctAnswer: "Rất vui được gặp",
                            translation: "どうぞよろしく có nghĩa là gì?",
                            explanation: "どうぞよろしく là cách nói 'Rất vui được gặp' hoặc 'Mong được giúp đỡ'"
                        },
                        {
                            id: 9,
                            type: "kanji",
                            question: "The kanji 名 means ___.",
                            options: ["Tên", "Người", "Học", "Nói"],
                            correctAnswer: "Tên",
                            translation: "Kanji 名 có nghĩa là gì?",
                            explanation: "Kanji 名 có nghĩa là 'tên'"
                        },
                        {
                            id: 10,
                            type: "grammar",
                            question: "Complete: お_____は田中です。",
                            options: ["なまえ", "ひと", "かいわ", "ともだち"],
                            correctAnswer: "なまえ",
                            translation: "Hoàn thành: Tên là Tanaka.",
                            explanation: "お名前 (おなまえ) nghĩa là 'tên' (cách nói lịch sự)"
                        }
                    ]
                }
            }
        ]
    }
    // Continue with other courses...
];