const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Explicit mapping of dataset categories to existing database categories
const CATEGORY_MAP = {
  "Programming — React & Frontend": "Web Development",
  "Programming — Next.js & Backend": "Web Development",
  "Programming — Database & AI": "Web Development",
  "DSA & Interview Prep": "DSA",
  "AI Prompt Engineering": "AI & Prompt Engineering",
  Career: "Resume & Career",
  "Cyber Security & DevOps": "Cloud & DevOps",
  "Productivity & Support": "Productivity & Mindset",
};

// Descriptions for new categories to create if missing
const NEW_CATEGORY_DESCRIPTIONS = {
  "UI/UX Design":
    "Production-ready prompts for UI/UX design systems, wireframing, and user experience.",
  "Mobile Development":
    "Expert prompts for React Native, Flutter, and iOS/Android app architecture.",
  Marketing:
    "High-converting prompts for copywriting, SEO, social media, and growth strategy.",
  "Writing & Documentation":
    "Comprehensive prompts for technical writing, API docs, and content structuring.",
  "Learning & Study":
    "Interactive prompts for active recall, Feynman technique, and study roadmap creation.",
  "Business & Startups":
    "Strategic prompts for pitch decks, business models, and startup validation.",
  "Content Creation":
    "Creative prompts for video scripts, blog posts, and newsletter generation.",
  "E-Commerce":
    "Conversion-focused prompts for product descriptions, Shopify, and ad copy.",
  "Data Science":
    "Analytical prompts for data cleaning, machine learning pipelines, and EDA.",
};

async function main() {
  console.log("🌱 Starting Top 100 Prompt Library Dataset Import...");

  const mdPath = path.join(process.cwd(), "future-with-ai-top-100-prompts.md");
  if (!fs.existsSync(mdPath)) {
    console.error("❌ Dataset file future-with-ai-top-100-prompts.md not found!");
    process.exit(1);
  }

  const raw = fs.readFileSync(mdPath, "utf8");
  const lines = raw.split("\n");

  let currentCategoryName = "";
  const parsedPrompts = [];
  let currentPrompt = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Category heading matcher e.g. ## 1. Programming — React & Frontend (10)
    if (line.startsWith("## ")) {
      currentCategoryName = line
        .replace(/^##\s+\d+\.\s+/, "")
        .replace(/\s*\(\d+\)\s*$/, "")
        .trim();
      continue;
    }

    // Prompt title line matcher e.g. **1. React Landing Page Generator**
    const titleMatch = line.match(/^\*\*\d+\.\s+(.*?)\*\*/);
    if (titleMatch) {
      if (currentPrompt) {
        parsedPrompts.push(currentPrompt);
      }
      currentPrompt = {
        rawCategory: currentCategoryName,
        title: titleMatch[1].trim(),
        difficulty: "Intermediate",
        tags: [],
        description: "",
        contentLines: [],
      };
      continue;
    }

    if (!currentPrompt) continue;

    if (line.startsWith("- Difficulty:")) {
      const diffMatch = line.match(/- Difficulty:\s*([^|]+)\|\s*Tags:\s*(.*)/);
      if (diffMatch) {
        currentPrompt.difficulty = diffMatch[1].trim();
        currentPrompt.tags = diffMatch[2].split(",").map((t) => t.trim());
      }
    } else if (line.startsWith("- Description:")) {
      currentPrompt.description = line.replace("- Description:", "").trim();
    } else if (line.startsWith("> ")) {
      currentPrompt.contentLines.push(line.substring(2));
    } else if (currentPrompt.contentLines.length > 0 && line.startsWith(">")) {
      currentPrompt.contentLines.push(line.substring(1));
    } else if (
      currentPrompt.contentLines.length > 0 &&
      line.trim() !== "" &&
      !line.startsWith("- ") &&
      !line.startsWith("#") &&
      !line.startsWith("---")
    ) {
      currentPrompt.contentLines.push(line);
    }
  }

  if (currentPrompt) {
    parsedPrompts.push(currentPrompt);
  }

  console.log(`📄 Parsed ${parsedPrompts.length} prompts from dataset.`);

  // 1. Fetch existing categories and titles in DB
  const existingCategories = await prisma.promptCategory.findMany();
  const categoryMapByName = new Map(
    existingCategories.map((c) => [c.name.toLowerCase().trim(), c])
  );

  const existingPrompts = await prisma.prompt.findMany({
    select: { title: true },
  });
  const existingPromptTitlesSet = new Set(
    existingPrompts.map((p) => p.title.toLowerCase().trim())
  );

  let reusedCategoryCount = 0;
  let createdCategoryCount = 0;
  let importedPromptsCount = 0;
  let skippedDuplicatesCount = 0;

  // Track category target IDs
  const targetCategoryMap = new Map(); // rawCategory -> PromptCategory Object

  const rawCategories = Array.from(
    new Set(parsedPrompts.map((p) => p.rawCategory))
  );

  for (const rawCat of rawCategories) {
    const targetName = CATEGORY_MAP[rawCat] || rawCat;
    const lowerTarget = targetName.toLowerCase().trim();

    if (categoryMapByName.has(lowerTarget)) {
      targetCategoryMap.set(rawCat, categoryMapByName.get(lowerTarget));
      reusedCategoryCount++;
    } else {
      // Create new category
      const description =
        NEW_CATEGORY_DESCRIPTIONS[targetName] ||
        `Curated prompts for ${targetName}.`;

      const newCategory = await prisma.promptCategory.create({
        data: {
          name: targetName,
          description,
        },
      });

      categoryMapByName.set(lowerTarget, newCategory);
      targetCategoryMap.set(rawCat, newCategory);
      createdCategoryCount++;
      console.log(`📁 Created new category: "${newCategory.name}"`);
    }
  }

  // Helper to determine PromptType from difficulty and index
  const getPromptType = (difficulty, index) => {
    if (difficulty === "Beginner") return "FREE";
    if (difficulty === "Advanced") {
      return index % 2 === 0 ? "PREMIUM" : "ONE_TIME_PREMIUM";
    }
    // Intermediate
    return index % 3 === 0 ? "PREMIUM" : "FREE";
  };

  // 2. Insert prompts with duplicate prevention
  for (let idx = 0; idx < parsedPrompts.length; idx++) {
    const p = parsedPrompts[idx];
    const cleanTitleLower = p.title.toLowerCase().trim();

    if (existingPromptTitlesSet.has(cleanTitleLower)) {
      skippedDuplicatesCount++;
      continue;
    }

    const targetCat = targetCategoryMap.get(p.rawCategory);
    if (!targetCat) {
      console.warn(`⚠️ Warning: Category mapping missing for "${p.rawCategory}"`);
      continue;
    }

    const contentText = p.contentLines.join("\n").trim();
    if (!contentText) continue;

    const type = getPromptType(p.difficulty, idx);

    await prisma.prompt.create({
      data: {
        title: p.title,
        content: contentText,
        type,
        categoryId: targetCat.id,
      },
    });

    existingPromptTitlesSet.add(cleanTitleLower);
    importedPromptsCount++;
  }

  console.log("\n🎉 Seed & Dataset Import Complete!");
  console.log(`-----------------------------------`);
  console.log(`📂 Categories in Dataset:   ${rawCategories.length}`);
  console.log(`♻️  Categories Reused:      ${reusedCategoryCount}`);
  console.log(`✨ Categories Created:     ${createdCategoryCount}`);
  console.log(`📝 Prompts Imported:       ${importedPromptsCount}`);
  console.log(`⏭️  Duplicates Skipped:     ${skippedDuplicatesCount}`);
  console.log(`-----------------------------------`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Error running prompt import seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
