export const MOCK_COURSES = [
    {
        id: 1,
        title: "Khóa học N5 - Bắt đầu với tiếng Nhật",
        type: "Beginner Level - N5",
        image: "/api/placeholder/400/200",
        date: "2024-01-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Hiragana và self-introduction",
                description: "Học bảng chữ Hiragana và cách giới thiệu bản thân",
                progress: 0,
                vocabulary: [
                    { word: "わたし", reading: "watashi", meaning: "Tôi" },
                    { word: "なまえ", reading: "namae", meaning: "Tên" },
                ],
                grammar: [
                    { pattern: "わたしは〜です", meaning: "Tôi là ~" },
                    { pattern: "〜と申します", meaning: "Tên tôi là ~" },
                ],
                kanji: [
                    { character: "私", reading: "わたし", meaning: "Tôi" },
                    { character: "名", reading: "な", meaning: "Tên" },
                ],
            },
            {
                id: 2,
                title: "Bài 2: Katakana và Numbers",
                description: "Học bảng chữ Katakana và số đếm",
                progress: 0,
                vocabulary: [
                    { word: "いち", reading: "ichi", meaning: "Một" },
                    { word: "に", reading: "ni", meaning: "Hai" },
                ],
                grammar: [
                    { pattern: "〜つ", meaning: "Đếm vật" },
                    { pattern: "〜人", meaning: "Đếm người" },
                ],
                kanji: [
                    { character: "一", reading: "いち", meaning: "Một" },
                    { character: "二", reading: "に", meaning: "Hai" },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Khóa học N4 - Nâng cao cơ bản",
        type: "Intermediate Level - N4",
        image: "/api/placeholder/400/200",
        date: "2024-02-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Từ vựng làm việc",
                description: "Học từ vựng về công việc và văn phòng",
                progress: 0,
                vocabulary: [
                    { word: "会社", reading: "かいしゃ", meaning: "Công ty" },
                    { word: "仕事", reading: "しごと", meaning: "Công việc" },
                ],
                grammar: [
                    { pattern: "〜なければなりません", meaning: "Phải ~" },
                    { pattern: "〜てもいいです", meaning: "Được phép ~" },
                ],
                kanji: [
                    { character: "会", reading: "かい", meaning: "Gặp" },
                    { character: "社", reading: "しゃ", meaning: "Công ty" },
                ],
            },
        ],
    },
    {
        id: 3,
        title: "Khóa học N3 - Trung cấp",
        type: "Upper Intermediate - N3",
        image: "/api/placeholder/400/200",
        date: "2024-03-01",
        progress: 0,
        lessons: [
            {
                id: 1,
                title: "Bài 1: Kỹ năng thuyết trình",
                description: "Học cách thuyết trình bằng tiếng Nhật",
                progress: 0,
                vocabulary: [
                    { word: "発表", reading: "はっぴょう", meaning: "Thuyết trình" },
                    { word: "準備", reading: "じゅんび", meaning: "Chuẩn bị" },
                ],
                grammar: [
                    { pattern: "〜によって", meaning: "Bởi vì, do ~" },
                    { pattern: "〜というわけです", meaning: "Vì vậy, do đó ~" },
                ],
                kanji: [
                    { character: "発", reading: "はつ", meaning: "Phát ra" },
                    { character: "表", reading: "ひょう", meaning: "Biểu hiện" },
                ],
            },
        ],
    },
];