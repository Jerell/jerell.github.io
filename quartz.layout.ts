import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ links: { GitHub: "https://github.com/jerell" } }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.Explorer({ title: "Discover", filterFn: (node) => node.name !== "work-history" }),
    Component.RecentNotes({
      title: "Work history",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("work-history/") &&
        f.slug! !== "work-history/index" &&
        !f.frontmatter?.noindex,
      linkToMore: "work-history/" as SimpleSlug,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.Explorer({ title: "Discover", filterFn: (node) => node.name !== "work-history" }),
    Component.RecentNotes({
      title: "Work history",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("work-history/") &&
        f.slug! !== "work-history/index" &&
        !f.frontmatter?.noindex,
      linkToMore: "work-history/" as SimpleSlug,
    }),
  ],
  right: [],
}
