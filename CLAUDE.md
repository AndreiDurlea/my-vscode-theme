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

Keep the root README.md continuously synchronized with all changes to the codebase. When adding or modifying tools, command-line arguments, CMake options, APIs, configuration formats, or system architectures, update README.md in the same commit.

Follow the 	echnical-documentation skill and the specification in Coding/serious/writing/documentation.md:

1. Convey maximum functional density using minimum words. Omit filler phrases, conversational preamble, and subjective marketing adjectives.
2. Do not prefix sentences, bullet points, or list items with bold pseudo-labels followed by colons (such as **Word**: Explanation or 1. **Step**: Details). Write direct, complete, factual sentences.
3. Use the standardized section hierarchy: Document Title and Summary, ## 1. Architecture, ## 2. Reference, ## 3. Features, ## 4. Examples, and ## 5. Exit Codes.
4. Keep paragraphs short and focused (maximum 1–3 sentences per paragraph). Explain architectures with clear prose and structured lists rather than unreadable ASCII box diagrams.
5. Provide parameter tables with explicit types and defaults, exact function signatures, and minimal working code examples.

<!-- CORECONTEXT:AUTOGEN_END -->
