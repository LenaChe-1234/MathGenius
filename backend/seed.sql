insert into topics (
  slug, title, grade_band, category, duration_minutes, summary,
  theory_points, practice_easy, practice_medium, practice_hard
)
values
  (
    'fractions',
    'Fractions and Percentages',
    '5-6',
    'Numbers',
    35,
    'Understanding fractions, percentages, and their relationship through visual models, comparison, and applied problems.',
    array[
      'A fraction shows how many equal parts a whole is divided into and how many parts are taken.',
      'To convert a fraction into a percentage, turn it into a decimal and multiply by 100.',
      'Percentages are useful in problems about discounts, performance, statistics, and comparing quantities.'
    ],
    array[
      'Write 1/2, 1/4, and 3/4 as percentages.',
      'Compare the fractions 2/5 and 1/2.',
      'Find 25% of 80.'
    ],
    array[
      'There are 24 pencils in a box. 3/8 of them are green. How many green pencils are there?',
      'A book cost 40 francs and then became 15% cheaper. What is the new price?'
    ],
    array[
      'A price increased by 20% and then decreased by 20%. Did it return to its original value?',
      'There are 48 students in two classes. The first class has 5/8 of all students. How many students are in the second class?'
    ]
  ),
  (
    'equations',
    'Equations and Unknowns',
    '7-8',
    'Algebra',
    40,
    'First linear equations, the meaning of an unknown, and the habit of checking answers by substitution.',
    array[
      'An equation is an equality with an unknown number that must be found.',
      'You can perform the same operations on both sides of an equation while preserving equality.',
      'Checking by substitution helps confirm whether the found value really works.'
    ],
    array['Solve: x + 7 = 15.', 'Solve: 18 - y = 5.'],
    array['Solve: 3x + 5 = 23.', 'Write an equation for this statement: the sum of a number and 12 is 37.'],
    array['Solve: 5(2x - 1) = 3x + 19.', 'Find the number if increasing it by 30% gives 91.']
  ),
  (
    'geometry',
    'Perimeter, Area, and Shapes',
    '5-6',
    'Geometry',
    30,
    'Measuring shapes, working with units of length and area, and moving from drawings to formulas.',
    array[
      'Perimeter is the sum of all side lengths of a shape.',
      'Area shows how much space a shape covers on a flat surface.',
      'For a rectangle, area equals length multiplied by width.'
    ],
    array[
      'Find the perimeter of a rectangle with sides 6 cm and 4 cm.',
      'Find the area of a square with side length 5 cm.'
    ],
    array[
      'A rectangle has length 12 cm and width three times smaller. Find its area.',
      'Compare the areas of rectangles 8x4 and 6x5.'
    ],
    array[
      'Split a compound shape into two rectangles and find its area.',
      'Explain why doubling all sides changes the area by 4 times, not 2.'
    ]
  )
on conflict (slug) do nothing;

insert into gymi_tracks (code, title, audience, description)
values
  (
    'kurz',
    'Kurz Gymnasium',
    'For later admission, with a focus on speed, calculations, and word problems.',
    'Diagnostics, focused practice sets, weekly plans, and mock exams built around entrance-style mathematics.'
  ),
  (
    'lang',
    'Lang Gymnasium',
    'For early preparation, with a focus on fundamentals and accuracy.',
    'Step-by-step preparation in arithmetic, fractions, geometry, and recurring exam-style tasks.'
  )
on conflict (code) do nothing;

insert into mock_exams (slug, track_code, title, description, duration_minutes, tasks)
values
  (
    'kurz-diagnostic',
    'kurz',
    'Diagnostic Test: Kurz Gymnasium',
    'A starter mock exam covering calculations, fractions, word problems, and solution strategy.',
    45,
    array[
      'There are 24 students in a class. 3/8 of the class studies music. How many students is that?',
      'Simplify the ratio 18:30 and explain what it means.',
      'Solve the price problem: an item cost 120 CHF, received a 15% discount, and then had a 6 CHF service fee added.'
    ]
  ),
  (
    'lang-foundation',
    'lang',
    'Mock Exam: Lang Gymnasium Foundation',
    'A sequence of tasks for core skills, reading accuracy, and clear written solutions.',
    40,
    array[
      'Compare the fractions 5/6 and 7/9 without converting them to decimals.',
      'Find the area of a rectangle with length 14 cm and width 9 cm.',
      'Write an expression and evaluate it: add one quarter of 18 to 18, then subtract 5.'
    ]
  )
on conflict (slug) do nothing;
