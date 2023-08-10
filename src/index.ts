import type { Root } from "hast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

export type Options = {
	/**
	 * @default "color"
	 */
	className?: string
	/**
	 * @default "color"
	 */
	cssVariable?: string
	/**
	 * @default /#[\da-fA-F]{6,8}/
	 */
	colorRegex?: RegExp
}

const colorPreview: Plugin<[Options?], Root> = (options?: Options) => {
	const defaultOptions: Required<Options> = {
		className: "color",
		cssVariable: "color",
		colorRegex: /#[\da-fA-F]{6,8}/,
	}
	const { className, cssVariable, colorRegex } = Object.assign(defaultOptions, options)

	return (ast: Root) => {
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

export default colorPreview
