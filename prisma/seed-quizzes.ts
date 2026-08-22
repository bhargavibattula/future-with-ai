import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding quizzes for Lovable course...');

  // Module 1 Quiz
  const mod1Quiz = await prisma.quiz.upsert({
    where: { moduleId: 'mod-1' },
    update: {},
    create: {
      moduleId: 'mod-1',
      title: 'Module 1 Quiz: Lovable Fundamentals & Architecture',
      description: 'Test your knowledge on Lovable workspace and cloud basics.',
      xpReward: 100,
      questions: {
        create: [
          {
            type: 'FILL_IN_THE_BLANKS',
            prompt: 'Lovable provides built-in application protection using two core security scanners called the Basic scan and the ______________ scan.',
            options: JSON.stringify([]),
            correctAnswer: JSON.stringify({ answer: 'Deep' }),
            explanation: 'The Deep scan performs an exhaustive agentic review across the entire codebase to detect complex access-control issues and exposed secrets.',
            orderIndex: 0,
          },
          {
            type: 'TRUE_FALSE',
            prompt: 'Applications created in Lovable are restricted to static visual templates and cannot execute real, compilable React and TypeScript code.',
            options: JSON.stringify(['True', 'False']),
            correctAnswer: JSON.stringify({ answer: 'False' }),
            explanation: 'Lovable compiles real React, TypeScript, and Tailwind CSS code dynamically under the hood.',
            orderIndex: 1,
          },
          {
            type: 'DRAG_DROP_ORDERING',
            prompt: 'Drag the steps of the Lovable generation pipeline into the correct chronological order.',
            options: JSON.stringify([
              { id: 'step3', text: 'Hot reloading sandbox preview canvas' },
              { id: 'step1', text: 'Parsing user prompt specification' },
              { id: 'step2', text: 'Creating component (e.g., src/components/Dashboard.tsx)' },
            ]),
            correctAnswer: JSON.stringify(['step1', 'step2', 'step3']),
            explanation: 'The Lovable Agent first parses your prompt, then creates the necessary components and files, and finally hot-reloads the preview canvas.',
            orderIndex: 2,
          },
          {
            type: 'MULTIPLE_CHOICE',
            prompt: 'Which underlying database architecture powers the built-in Lovable Cloud backend?',
            options: JSON.stringify([
              { id: 'a', text: 'A NoSQL document store (like MongoDB)' },
              { id: 'b', text: 'An open-source PostgreSQL relational database' },
              { id: 'c', text: 'A graph database architecture' },
              { id: 'd', text: 'Local browser storage exclusively' }
            ]),
            correctAnswer: JSON.stringify({ answerId: 'b' }),
            explanation: 'Lovable Cloud builds directly on top of an open-source PostgreSQL relational database foundation.',
            orderIndex: 3,
          }
        ]
      }
    }
  });

  console.log(`Created Quiz: ${mod1Quiz.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
