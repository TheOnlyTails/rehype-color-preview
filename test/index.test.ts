import colorPreview, { type Options } from "../src"

import { expect, test } from "vitest"

import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

const createProccessor = (options?: Options) =>
	unified().use(remarkParse).use(remarkRehype).use(colorPreview, options).use(rehypeStringify)

const processFile = async (content: string) =>
	await createProccessor().process(content).then(String)

test("basic transformation", async () => {
	expect(await processFile("`#ABCDEF`")).toMatchInlineSnapshot(
		`"<p><code class=\\"color\\" style=\\"--color:#ABCDEF\\">#ABCDEF</code></p>"`,
	)
})
