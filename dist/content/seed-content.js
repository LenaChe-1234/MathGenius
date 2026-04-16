export const seedTopics = [
    {
        slug: "simplify-terms",
        title: "Vereinfache die Terme so weit wie möglich",
        grade_band: "7-8",
        category: "Algebra",
        duration_minutes: 35,
        summary: "A focused Kurzgymi algebra canvas with four progressive tasks, answer checking, hints, and worked solutions.",
        theory_points: [
            "Open brackets carefully and track every sign before combining like terms.",
            "When multiplying factors, multiply coefficients and combine equal variables into powers.",
            "With fractions and roots, simplify structure before expanding and only cancel true common factors."
        ],
        practice_easy: [
            "Expand brackets and combine like terms.",
            "Multiply factors and write repeated variables as powers."
        ],
        practice_medium: [
            "Simplify fractional expressions before distributing.",
            "Check whether your expression is fully reduced."
        ],
        practice_hard: [
            "Combine radicals only after simplifying inside each root.",
            "Use the canvas to work through all four tasks from easy to hard."
        ]
    },
    {
        slug: "fractions",
        title: "Fractions and Percentages",
        grade_band: "5-6",
        category: "Numbers",
        duration_minutes: 35,
        summary: "Understanding fractions, percentages, and their relationship through visual models, comparison, and applied problems.",
        theory_points: [
            "A fraction shows how many equal parts a whole is divided into and how many parts are taken.",
            "To convert a fraction into a percentage, turn it into a decimal and multiply by 100.",
            "Percentages are useful in problems about discounts, performance, statistics, and comparing quantities."
        ],
        practice_easy: [
            "Write 1/2, 1/4, and 3/4 as percentages.",
            "Compare the fractions 2/5 and 1/2.",
            "Find 25% of 80."
        ],
        practice_medium: [
            "There are 24 pencils in a box. 3/8 of them are green. How many green pencils are there?",
            "A book cost 40 francs and then became 15% cheaper. What is the new price?"
        ],
        practice_hard: [
            "A price increased by 20% and then decreased by 20%. Did it return to its original value?",
            "There are 48 students in two classes. The first class has 5/8 of all students. How many students are in the second class?"
        ]
    },
    {
        slug: "equations",
        title: "Equations and Unknowns",
        grade_band: "7-8",
        category: "Algebra",
        duration_minutes: 40,
        summary: "First linear equations, the meaning of an unknown, and the habit of checking answers by substitution.",
        theory_points: [
            "An equation is an equality with an unknown number that must be found.",
            "You can perform the same operations on both sides of an equation while preserving equality.",
            "Checking by substitution helps confirm whether the found value really works."
        ],
        practice_easy: ["Solve: x + 7 = 15.", "Solve: 18 - y = 5."],
        practice_medium: ["Solve: 3x + 5 = 23.", "Write an equation for this statement: the sum of a number and 12 is 37."],
        practice_hard: ["Solve: 5(2x - 1) = 3x + 19.", "Find the number if increasing it by 30% gives 91."]
    },
    {
        slug: "geometry",
        title: "Perimeter, Area, and Shapes",
        grade_band: "5-6",
        category: "Geometry",
        duration_minutes: 30,
        summary: "Measuring shapes, working with units of length and area, and moving from drawings to formulas.",
        theory_points: [
            "Perimeter is the sum of all side lengths of a shape.",
            "Area shows how much space a shape covers on a flat surface.",
            "For a rectangle, area equals length multiplied by width."
        ],
        practice_easy: [
            "Find the perimeter of a rectangle with sides 6 cm and 4 cm.",
            "Find the area of a square with side length 5 cm."
        ],
        practice_medium: [
            "A rectangle has length 12 cm and width three times smaller. Find its area.",
            "Compare the areas of rectangles 8x4 and 6x5."
        ],
        practice_hard: [
            "Split a compound shape into two rectangles and find its area.",
            "Explain why doubling all sides changes the area by 4 times, not 2."
        ]
    }
];
export const seedGymiTracks = [
    {
        code: "kurz",
        title: "Kurzgymi-Prüfung",
        audience: "For secondary-school learners aiming for later admission, with more algebra, word problems, and timed work.",
        description: "Faster entrance-style preparation with algebraic simplification, multi-step calculations, ratios, and exam pacing."
    },
    {
        code: "lang",
        title: "Langgymi-Prüfung",
        audience: "For primary-school learners preparing early, with a focus on arithmetic foundations, geometry, and careful reading.",
        description: "Step-by-step preparation in number sense, fractions, geometry, and clearly written solutions for younger learners."
    }
];
export const seedMockExams = [
    {
        slug: "kurz-diagnostic",
        track_code: "kurz",
        title: "Mock Exam: Kurzgymi-Prüfung",
        description: "A compact Kurzgymi set with algebra, ratios, and applied percentage problems under light time pressure.",
        duration_minutes: 50,
        tasks: [
            "Simplify the expression: 3(2x - 5) - 2(x + 4).",
            "A map uses the scale 1:25 000. What real distance does 8 cm represent?",
            "A jacket costs 180 CHF. It is reduced by 15% and then a 7.70 CHF delivery fee is added. What is the final price?"
        ]
    },
    {
        slug: "lang-foundation",
        track_code: "lang",
        title: "Mock Exam: Langgymi-Prüfung",
        description: "A calmer Langgymi set focused on fractions, geometry, and neat step-by-step reasoning.",
        duration_minutes: 40,
        tasks: [
            "Compare the fractions 3/4 and 5/8 without converting them to decimals.",
            "A rectangle is 12 cm long and 7 cm wide. Find its perimeter and area.",
            "Write and calculate: take one third of 24, add 18, then subtract 5."
        ]
    }
];
