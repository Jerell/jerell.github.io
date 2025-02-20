import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const DateCalculator: QuartzTransformerPlugin = () => {
  return {
    name: "DateCalculator",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "text", (node: { value: string }) => {
              // Match expressions like {{ year() - 2018 }}
              const dateRegex = /\{\{\s*year\(\)\s*-\s*(\d+)\s*\}\}/g
              if (dateRegex.test(node.value)) {
                node.value = node.value.replace(dateRegex, (_match: string, startYear: string) => {
                  const currentYear = new Date().getFullYear()
                  return String(currentYear - parseInt(startYear))
                })
              }
            })
          }
        },
      ]
    },
  }
}
