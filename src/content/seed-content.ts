import type { GymiTrack, MockExam, Topic } from "../types/domain.js";

export const seedTopics: Topic[] = [
  {
    slug: "fractions",
    title: "Fractions and Percentages",
    grade_band: "5-6",
    category: "Numbers",
    duration_minutes: 35,
    summary:
      "Understanding fractions, percentages, and their relationship through visual models, comparison, and applied problems.",
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
    summary:
      "First linear equations, the meaning of an unknown, and the habit of checking answers by substitution.",
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
    summary:
      "Measuring shapes, working with units of length and area, and moving from drawings to formulas.",
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

export const seedGymiTracks: GymiTrack[] = [
  {
    code: "kurz",
    title: "Kurz Gymnasium",
    audience: "For later admission, with a focus on speed, calculations, and word problems.",
    description:
      "Diagnostics, focused practice sets, weekly plans, and mock exams built around entrance-style mathematics."
  },
  {
    code: "lang",
    title: "Lang Gymnasium",
    audience: "For early preparation, with a focus on fundamentals and accuracy.",
    description:
      "Step-by-step preparation in arithmetic, fractions, geometry, and recurring exam-style tasks."
  }
];

export const seedMockExams: MockExam[] = [
  {
    slug: "kurz-diagnostic",
    track_code: "kurz",
    title: "Diagnostic Test: Kurz Gymnasium",
    description: "A starter mock exam covering calculations, fractions, word problems, and solution strategy.",
    duration_minutes: 45,
    tasks: [
      "There are 24 students in a class. 3/8 of the class studies music. How many students is that?",
      "Simplify the ratio 18:30 and explain what it means.",
      "Solve the price problem: an item cost 120 CHF, received a 15% discount, and then had a 6 CHF service fee added."
    ]
  },
  {
    slug: "lang-foundation",
    track_code: "lang",
    title: "Mock Exam: Lang Gymnasium Foundation",
    description: "A sequence of tasks for core skills, reading accuracy, and clear written solutions.",
    duration_minutes: 40,
    tasks: [
      "Compare the fractions 5/6 and 7/9 without converting them to decimals.",
      "Find the area of a rectangle with length 14 cm and width 9 cm.",
      "Write an expression and evaluate it: add one quarter of 18 to 18, then subtract 5."
    ]
  }
];
