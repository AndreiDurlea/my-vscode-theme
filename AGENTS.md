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
6. Keep paragraphs short and focused (maximum 1â€“3 sentences per paragraph). Explain architectures with clear prose and structured lists rather than unreadable ASCII box diagrams.
7. Provide parameter tables with explicit types and defaults, exact function signatures, and minimal working code examples.

### /.corecontext/user/AGENTS.md
# /.corecontext/user
This folder holds .md context files about the project that DON'T go on the remote, specifc to this user's machine and preferences

### /.corecontext/user/comments.md
When writing code, add comments only to explain hidden design decisions that are not immediately apparent from the symbol names. Code should be readable without any comments.

Exception: Simple comments explaining magic numbers, console key codes (e.g., `// Up arrow`), or platform-specific hex/integer constants are allowed.

### /.corecontext/user/commit.md
When commiting, use 3-4 words max for the message. Always try to ammend the latest commit(s) if you previously commited a task the user wanted, but then changes needed to be made to that same task/feature. When something new is started, it can become a new, atomic, commit.

### /.corecontext/user/docs.md
When writing or updating documentation, READMEs, and technical guides, strictly follow the standard in Coding/serious/writing/documentation.md.
Root README.md files must not include frontmatter. Badges should only be used where genuinely relevant (such as software libraries or CLI tools); never add badges to personal websites, web apps, CVs/resumes, writing guides, or non-tool repositories.
Convey maximum functional density using minimum words. Omit filler phrases, conversational preamble, and marketing fluff.
Don't use nonfactual adjectives or adverbs in the text.
Use direct imperative voice, quantify metrics, and state types, units, and error modes explicitly.
Do not prefix sentences, bullet points, or numbered lists with bold pseudo-labels followed by colons (such as **Word**: Explanation or 1. **Step**: Details). Summarizing a thought into an artificial bold keyword is nonfactual and breaks natural sentence flow; write direct, complete, factual sentences.
Keep paragraphs short, focused, and readable (maximum 2–3 sentences per paragraph). Never write dense walls of text. Decompose execution modes, lifecycles, and multi-step workflows into distinct, readable steps. Avoid unreadable ASCII box diagrams; explain architectures normally with clear prose and structured lists.

<!-- CORECONTEXT:AUTOGEN_END -->
