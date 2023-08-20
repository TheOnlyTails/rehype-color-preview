import { visit } from "unist-util-visit"

/**
 * @typedef {import(".").Options} Options
 * @typedef {import("hast").Root} Root
 *
 * @type {import("unified").Plugin<[Options?], Root>}
 * @returns {import("unified").Transformer<Root, Root>}
 */
export default function colorPreview(options) {
	/**
	 * @type {Required<Options>}
	 */
	const defaultOptions = {
		className: "color",
		cssVariable: "color",
		colorRegex: /#[\da-fA-F]{6,8}/,
	}
	const { className, cssVariable, colorRegex } = Object.assign(defaultOptions, options)

	return (ast) => {
		visit(ast, "element", (node) => {
			if (node.tagName !== "code") return
			if (node.children.length !== 1) return
			const content = node.children[0]
			if (content.type !== "text") return

			const match = content.value.match(colorRegex)?.[0]
			if (!match) return

			node.properties ??= {}
			node.properties.class =
				node.properties.class && Array.isArray(node.properties.class)
					? [...node.properties.class, className]
					: className
			node.properties.style = node.properties.style
				? `${node.properties.style};--${cssVariable}:${match}`
				: `--${cssVariable}:${match}`
		})
	}
}
