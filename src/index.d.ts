import { Root } from "hast"
import { Plugin } from "unified"

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

declare const colorPreview: Plugin<[Options?], Root>
export default colorPreview
