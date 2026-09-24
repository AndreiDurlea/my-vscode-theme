# README & Technical Documentation Standards

Keep the root README.md continuously synchronized with all changes to the codebase. When adding or modifying tools, command-line arguments, CMake options, APIs, configuration formats, or system architectures, update README.md in the same commit.

Follow the 	echnical-documentation skill and the specification in Coding/serious/writing/documentation.md:

1. Convey maximum functional density using minimum words. Omit filler phrases, conversational preamble, and subjective marketing adjectives.
2. Do not prefix sentences, bullet points, or list items with bold pseudo-labels followed by colons (such as **Word**: Explanation or 1. **Step**: Details). Write direct, complete, factual sentences.
3. Use the standardized section hierarchy: Document Title and Summary, ## 1. Architecture, ## 2. Reference, ## 3. Features, ## 4. Examples, and ## 5. Exit Codes.
4. Keep paragraphs short and focused (maximum 1–3 sentences per paragraph). Explain architectures with clear prose and structured lists rather than unreadable ASCII box diagrams.
5. Provide parameter tables with explicit types and defaults, exact function signatures, and minimal working code examples.