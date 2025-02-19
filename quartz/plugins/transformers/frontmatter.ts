import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { slugTag } from "../../util/path"
import { QuartzPluginData } from "../vfile"

export interface Options {
  delims: string | string[]
  language: "yaml" | "toml"
  oneLineTagDelim: string
}

const defaultOptions: Options = {
  delims: "---",
  language: "yaml",
  oneLineTagDelim: ",",
}

export const FrontMatter: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins() {
      const { oneLineTagDelim } = opts

      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const { data } = matter(Buffer.from(file.value), {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            })

            // tag is an alias for tags
            if (data.tag) {
              data.tags = data.tag
            }

            // coerce title to string
            if (data.title) {
              data.title = data.title.toString()
            } else if (data.title === null || data.title === undefined) {
              data.title = file.stem ?? "Untitled"
            }

            if (data.tags) {
              // coerce to array
              if (!Array.isArray(data.tags)) {
                data.tags = data.tags
                  .toString()
                  .split(oneLineTagDelim)
                  .map((tag: string) => tag.trim())
              }

              // remove all non-string tags
              data.tags = data.tags
                .filter((tag: unknown) => typeof tag === "string" || typeof tag === "number")
                .map((tag: string | number) => tag.toString())
            }

            // slug them all!!
            data.tags = [...new Set(data.tags?.map((tag: string) => slugTag(tag)))]

            const socialImage = coalesceAliases(data, ["socialImage", "image", "cover"])

            const created = coalesceAliases(data, ["created", "date"])
            if (created) data.created = created
            const modified = coalesceAliases(data, [
              "modified",
              "lastmod",
              "updated",
              "last-modified",
            ])
            if (modified) data.modified = modified
            const published = coalesceAliases(data, ["published", "publishDate", "date"])
            if (published) data.published = published

            if (socialImage) data.socialImage = socialImage

            // fill in frontmatter
            file.data.frontmatter = data as QuartzPluginData["frontmatter"]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    frontmatter: { [key: string]: any } & {
      title: string
      tags: string[]
    }
  }
}
