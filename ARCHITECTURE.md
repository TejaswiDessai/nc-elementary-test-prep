# NC Elementary Test Prep - Architecture Specification

## Project Overview

NC Elementary Test Prep is a free educational web application designed to help students in Kindergarten through Grade 5 prepare for North Carolina End-of-Grade (EOG) style assessments.

The application is intended to:

* Be freely available online
* Work on desktop, Chromebook, tablet, and mobile devices
* Support Math and ELA
* Provide explanations for answers
* Allow students to practice independently
* Scale to thousands of questions

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS

## Hosting

* Vercel

## Data Storage

Current:

* Static JSON files

Future:

* Question pools
* Optional backend
* Optional teacher portal

---

# Application Flow

```text
Home
 └── Grade Selection
       └── Subject Selection
             └── Test Set Selection
                   └── Quiz
                         └── Results
```

---

# Current Navigation Structure

## Screen 1 - Grade Selection

Supported grades:

* Kindergarten
* Grade 1
* Grade 2
* Grade 3
* Grade 4
* Grade 5

Component:

```text
GradeSelect.jsx
```

---

## Screen 2 - Subject Selection

Supported subjects:

* Math
* ELA

Component:

```text
SubjectSelect.jsx
```

---

## Screen 3 - Test Set Selection

Current design:

* Set 1
* Set 2
* ...
* Set 10

Component:

```text
SetSelect.jsx
```

---

## Screen 4 - Quiz

Features:

* Question display
* Multiple choice answers
* Progress bar
* Correct/incorrect feedback
* Explanation display
* Next Question button
* Finish Test button

Component:

```text
Quiz.jsx
```

---

## Screen 5 - Results

Features:

* Score
* Percentage
* Encouragement message
* Restart option

Component:

```text
Result.jsx
```

---

# Data Architecture

Current approach:

```text
public/
└── data/
    ├── K/
    ├── 1/
    ├── 2/
    ├── 3/
    ├── 4/
    └── 5/
```

Example:

```text
public/data/K/math/set1.json
```

JSON format:

```json
[
  {
    "q": "What is 1 + 1?",
    "options": ["1","2","3","4"],
    "answer": 1,
    "explanation": "1 + 1 = 2"
  }
]
```

---

# Planned Data Architecture (Preferred)

Move from fixed test files to question pools.

Example:

```text
public/data/
├── K/
│   ├── math_pool.json
│   └── ela_pool.json
├── 1/
│   ├── math_pool.json
│   └── ela_pool.json
```

Advantages:

* Easier maintenance
* Unlimited test generation
* Less duplication
* Smaller repository

---

# Question Model

```typescript
Question {
  q: string
  options: string[]
  answer: number
  explanation: string
}
```

---

# Content Goals

Grades:

* K
* 1
* 2
* 3
* 4
* 5

Subjects:

* Math
* ELA

Target:

* 100+ questions per subject per grade
* Approximately 1,200+ total questions

---

# Future Enhancements

## Student Features

* Progress tracking
* Review incorrect answers
* Achievement badges
* Timed tests
* Question randomization
* Difficulty levels

## Teacher Features

* Teacher dashboard
* Class reports
* Student assignments
* Printable reports

## Technical Improvements

* TypeScript migration
* Tailwind CSS
* React Router
* State management
* Backend API
* Authentication

---

# Deployment

Current deployment target:

Vercel

Workflow:

```text
Local Development
    ↓
GitHub
    ↓
Vercel
```

---

# Design Goals

* Child-friendly
* Fast loading
* Mobile responsive
* Accessible
* Simple navigation
* School software quality

---

# Non-Goals

Current version should NOT include:

* User accounts
* Paid subscriptions
* Advertising
* Complex backend dependencies

The focus is educational content and simplicity.
