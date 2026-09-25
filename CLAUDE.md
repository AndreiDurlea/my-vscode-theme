Always start your response with my own name.

Project knowledge base: /.corecontext
Never write or modify agent instruction files (AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules, .windsurfrules, COPILOT.md, CODEX.md) directly. Always store persistent rules, memories, and preferences exclusively in /.corecontext/project (for all developers on this project) or /.corecontext/user (for only the current user's preferences).

<!-- CORECONTEXT:AUTOGEN_START -->

### /.corecontext/project/AGENTS.md
# /.corecontext/project
This folder holds .md context files about the project that are shared between all users

### /.corecontext/project/corecontext.md
When writing files in corecontext, dont add markdown elements unless necessary, keep short knowledge files as brief, plaintext sentences.
When asked to add files/knowledge in memory, or asked to remember things, write them in corecontext, as that's what the user is using for managing knowledge.

### /.corecontext/project/readme_updates.md
# README & Technical Documentation Standards

Keep the root `README.md` continuously synchronized with all changes to the codebase. When adding or modifying tools, command-line arguments, CMake options, APIs, configuration formats, or system architectures, update `README.md` in the same commit.

Follow the `technical-documentation` skill and the specification in `Coding/serious/writing/documentation.md`:

1. Write in an objective, dispassionate, academic paper style. Present facts, mechanisms, and specifications without promotional bias.
2. Don't use nonfactual, subjective, or promotional adjectives and adverbs in the text. Replace qualitative claims with quantitative metrics or explicit behavioral specifications.
3. Convey maximum functional density using minimum words. Omit filler phrases, conversational preamble, and marketing fluff.
4. Do not prefix sentences, bullet points, or list items with bold pseudo-labels followed by colons (such as `**Word**: Explanation` or `1. **Step**: Details`). Write direct, complete, factual sentences.
5. Adapt section structure to the component domain (CLI, library, theme, document). Select natural, descriptive section titles and do not shoehorn artificial sections (e.g. exit codes do not belong in pure software libraries).
6. Keep paragraphs short and focused (maximum 1–3 sentences per paragraph). Explain architectures with clear prose and structured lists rather than unreadable ASCII box diagrams.
7. Provide parameter tables with explicit types and defaults, exact function signatures, and minimal working code examples.

<!-- CORECONTEXT:AUTOGEN_END -->
