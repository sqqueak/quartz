import { FullSlug, _stripSlashes, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function Head({ cfg, fileData, externalResources }: QuartzComponentProps) {
    const title = fileData.frontmatter?.title ?? "Untitled"
    const description = fileData.description?.trim() ?? "No description provided"
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")

    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`
    // "static/social-images/slug-filename.md.webp"
    const ogImageGeneratedPath = `https://${cfg.baseUrl}/${fileDir.replace(
      `${ctx.argv.output}/`,
      "",
    )}/${fileName}.${extension}`

    // Use default og image if filePath doesnt exist (for autogenerated paths with no .md file)
    const useDefaultOgImage = fileName === undefined || !cfg.generateSocialImages

    // Path to og/social image (priority: frontmatter > generated image (if enabled) > default image)
    let ogImagePath = useDefaultOgImage ? ogImageDefaultPath : ogImageGeneratedPath

    // TODO: could be improved to support external images in the future
    // Aliases for image and cover handled in `frontmatter.ts`
    const frontmatterImgUrl = fileData.frontmatter?.socialImage

    // Override with default og image if config option is set
    if (fileData.slug === "index") {
      ogImagePath = ogImageDefaultPath
    }

    // Override with frontmatter url if existing
    if (frontmatterImgUrl) {
      ogImagePath = `https://${cfg.baseUrl}/static/${frontmatterImgUrl}`
    }

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* OG/Twitter meta tags */}
        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:type" content={`image/${extension}`} />
        <meta property="og:image:alt" content={description} />
        {/* Dont set width and height if unknown (when using custom frontmatter image) */}
        {!frontmatterImgUrl && (
          <>
            <meta property="og:image:width" content={fullOptions.width.toString()} />
            <meta property="og:image:height" content={fullOptions.height.toString()} />
          </>
        )}
        <meta property="og:image:url" content={ogImagePath} />
        {cfg.baseUrl && (
          <>
            <meta name="twitter:image" content={ogImagePath} />
            <meta property="og:image" content={ogImagePath} />
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
