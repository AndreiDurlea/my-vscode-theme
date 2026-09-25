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
