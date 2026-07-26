# ReplyFlow Admin Setup (GitHub + Cloudflare Pages)

## Required one-time setup

1. Open `public/admin/config.yml`.
2. Replace `REPLACE_WITH_GITHUB_USERNAME/replyflow` with the exact `owner/repository` from GitHub.
3. If your deployment branch is not `main`, change `branch`.
4. Push this project to that repository. Cloudflare Pages will rebuild automatically after every CMS commit.
5. Open `https://replyflow.procsctools.in/admin/` and sign in with a GitHub account that has write access to the repository.

## What the admin manages

- Message templates with custom URL slug, industry, editable category, channel, language, tone, variables, SEO and raw Markdown.
- Industries: add, edit, delete and reorder. New industries generate `/industry/<slug>`.
- Template categories: add and select them while creating a template.
- Blog categories and Markdown blog posts. New posts generate `/blog/<slug>` and category pages.
- Draft/publish controls. Draft content is excluded from production routes and sitemap.
- Images uploaded into `public/uploads`.
- General site and ad settings.
- Automatic `/sitemap.xml` generated from all published templates, industries and blog posts.

## Important limitation

The GitHub repository owner/name cannot be inferred from the website domain. The exact `owner/repository` value must be entered once before login and publishing can work.
