# Categories Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Categories page MVP with overview insights, data-table listing, modal CRUD, and safe deletion rules aligned with the approved spec.

**Architecture:** Keep `src/app/(private)/(sidebar)/categories/page.tsx` as the orchestration entrypoint and split UI into focused components under `src/components/categories/**`. Use TanStack Table state in a dedicated client table component, keep business rules in small helper modules, and isolate dialog flows for create/edit and delete confirmation.

**Tech Stack:** Next.js App Router, React 19, TypeScript, shadcn/ui, TanStack Table, Zod, Recharts, Vitest.

---

Command hygiene for this repository:

- Quote any shell path that contains parentheses, for example: `"src/app/(private)/(sidebar)/categories/page.tsx"`.

### Task 1: Establish category domain contracts and mock source

**Files:**
- Create: `src/http/types/category.ts`
- Create: `src/components/categories/data/categories-mock.ts`
- Create: `src/components/categories/lib/categories-overview.ts`
- Create: `src/components/categories/lib/categories-overview.test.ts`
- Modify: `src/app/(private)/(sidebar)/categories/page.tsx`

- [ ] **Step 1: Write the failing test for overview aggregation**

```ts
import { describe, expect, it } from "vitest"
import { getCategoriesOverview } from "@/components/categories/lib/categories-overview"

describe("getCategoriesOverview", () => {
  it("counts total, active, inactive and in-use categories", () => {
    const result = getCategoriesOverview([
      { id: "1", status: "active", usageCount: 2 },
      { id: "2", status: "inactive", usageCount: 0 },
    ] as any)

    expect(result).toEqual({ total: 2, active: 1, inactive: 1, inUse: 1 })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm vitest run "src/components/categories/lib/categories-overview.test.ts"`
Expected: FAIL with module/file not found.

- [ ] **Step 3: Write minimal implementation and mock data wiring**

```ts
export type CategoryStatus = "active" | "inactive"

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  status: CategoryStatus
  usageCount: number
  updatedAt: Date
}

export function getCategoriesOverview(categories: Category[]) {
  const active = categories.filter((item) => item.status === "active").length
  const inUse = categories.filter((item) => item.usageCount > 0).length

  return {
    total: categories.length,
    active,
    inactive: categories.length - active,
    inUse,
  }
}
```

- [ ] **Step 4: Re-run test to verify it passes**

Run: `pnpm vitest run "src/components/categories/lib/categories-overview.test.ts"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/http/types/category.ts src/components/categories/data/categories-mock.ts src/components/categories/lib/categories-overview.ts src/components/categories/lib/categories-overview.test.ts "src/app/(private)/(sidebar)/categories/page.tsx"
git commit -m "feat: add category domain contracts and overview aggregation"
```

### Task 2: Add validation and business-rule helpers (TDD)

**Files:**
- Create: `src/components/categories/lib/category-schema.ts`
- Create: `src/components/categories/lib/category-slug.ts`
- Create: `src/components/categories/lib/category-rules.ts`
- Create: `src/components/categories/lib/category-schema.test.ts`
- Create: `src/components/categories/lib/category-rules.test.ts`

- [ ] **Step 1: Write failing tests for slug normalization and delete blocking**

```ts
import { describe, expect, it } from "vitest"
import { normalizeCategorySlug, isSlugUnique } from "@/components/categories/lib/category-slug"
import { canDeleteCategory } from "@/components/categories/lib/category-rules"

describe("category business rules", () => {
  it("normalizes slug from name", () => {
    expect(normalizeCategorySlug("Casa e Mercado")).toBe("casa-e-mercado")
  })

  it("checks slug uniqueness case-insensitively", () => {
    expect(isSlugUnique("Moradia", ["housing", "MORADIA"])).toBe(false)
    expect(isSlugUnique("servicos", ["housing", "food"])).toBe(true)
  })

  it("blocks delete when category is in use", () => {
    expect(canDeleteCategory({ usageCount: 3 } as any)).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run "src/components/categories/lib/category-rules.test.ts"`
Expected: FAIL with missing exports/files.

- [ ] **Step 3: Implement minimal helpers and schema**

```ts
import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(2).max(40),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  icon: z.string().min(1),
  status: z.enum(["active", "inactive"]).default("active"),
})

export function normalizeCategorySlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function isSlugUnique(slug: string, existingSlugs: string[]) {
  return !existingSlugs.some((item) => item.toLowerCase() === slug.toLowerCase())
}

export function canDeleteCategory(category: { usageCount: number }) {
  return category.usageCount === 0
}
```

- [ ] **Step 4: Re-run tests and ensure pass**

Run: `pnpm vitest run "src/components/categories/lib/category-schema.test.ts" "src/components/categories/lib/category-rules.test.ts"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/lib/category-schema.ts src/components/categories/lib/category-slug.ts src/components/categories/lib/category-rules.ts src/components/categories/lib/category-schema.test.ts src/components/categories/lib/category-rules.test.ts
git commit -m "feat: add category validation and business rules"
```

### Task 3: Build page shell with header and insights layout

**Files:**
- Create: `src/components/categories/categories-page-header.tsx`
- Create: `src/components/categories/categories-overview-cards.tsx`
- Create: `src/components/categories/categories-radial-chart.tsx`
- Create: `src/app/(private)/(sidebar)/categories/page.test.tsx`
- Modify: `src/app/(private)/(sidebar)/categories/page.tsx`

- [ ] **Step 1: Write a failing rendering smoke test for layout sections**

```ts
import { describe, expect, it } from "vitest"

describe("categories page", () => {
  it("renders insights and management sections", () => {
    expect(true).toBe(false)
  })
})
```

- [ ] **Step 2: Run the smoke test and verify fail**

Run: `pnpm vitest run "src/app/(private)/(sidebar)/categories/page.test.tsx"`
Expected: FAIL.

- [ ] **Step 3: Implement page shell with composable sections**

```tsx
<div className="@container/main flex flex-col p-4 md:p-6">
  <CategoriesPageHeader total={categories.length} onCreate={openCreateDialog} />
  <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
    <CategoriesOverviewCards overview={overview} className="lg:col-span-6" />
    <CategoriesRadialChart data={chartData} month={monthLabel} className="lg:col-span-6" />
  </section>
  <section className="mt-4">
    <CategoriesDataTable ... />
  </section>
</div>
```

- [ ] **Step 4: Replace placeholder smoke test with stable assertions and pass**

Run: `pnpm vitest run "src/app/(private)/(sidebar)/categories/page.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/categories-page-header.tsx src/components/categories/categories-overview-cards.tsx src/components/categories/categories-radial-chart.tsx "src/app/(private)/(sidebar)/categories/page.tsx" "src/app/(private)/(sidebar)/categories/page.test.tsx"
git commit -m "feat: compose categories page insights section"
```

### Task 4: Implement Categories data table foundation and status toggle behavior

**Files:**
- Create: `src/components/categories/categories-data-table/categories-data-table.tsx`
- Create: `src/components/categories/categories-data-table/categories-data-table-columns.tsx`
- Create: `src/components/categories/categories-data-table/categories-data-table-pagination.tsx`
- Create: `src/components/categories/categories-data-table/categories-data-table-toolbar.tsx`
- Create: `src/components/categories/categories-data-table/filter-categories.ts`
- Create: `src/components/categories/categories-data-table/filter-categories.test.ts`
- Create: `src/components/categories/lib/category-status.ts`
- Create: `src/components/categories/lib/category-status.test.ts`

- [ ] **Step 1: Write failing test for category filtering behavior**

```ts
import { describe, expect, it } from "vitest"
import { filterCategories } from "@/components/categories/categories-data-table/filter-categories"
import { sortCategoriesByName, toggleCategoryStatus } from "@/components/categories/lib/category-status"

describe("filterCategories", () => {
  it("filters by text and status", () => {
    const result = filterCategories(
      [{ name: "Moradia", slug: "housing", status: "active" }] as any,
      { search: "mora", status: "active" }
    )
    expect(result).toHaveLength(1)
  })

  it("toggles status between active and inactive", () => {
    expect(toggleCategoryStatus("active")).toBe("inactive")
    expect(toggleCategoryStatus("inactive")).toBe("active")
  })

  it("supports sorting by category name", () => {
    const data = [
      { name: "Transporte" },
      { name: "Alimentacao" },
    ] as any

    expect(sortCategoriesByName(data, "asc").map((item: any) => item.name)).toEqual([
      "Alimentacao",
      "Transporte",
    ])
  })
})
```

- [ ] **Step 2: Run test to verify fail**

Run: `pnpm vitest run src/components/categories/categories-data-table/filter-categories.test.ts`
Expected: FAIL with missing file.

- [ ] **Step 3: Implement table and filtering utility**

```ts
export function filterCategories(data: Category[], filters: { search: string; status: "all" | CategoryStatus }) {
  return data.filter((item) => {
    const matchesSearch =
      filters.search.length === 0 ||
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.slug.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStatus = filters.status === "all" || item.status === filters.status

    return matchesSearch && matchesStatus
  })
}

export function toggleCategoryStatus(status: CategoryStatus): CategoryStatus {
  return status === "active" ? "inactive" : "active"
}

export function sortCategoriesByName(data: Category[], direction: "asc" | "desc") {
  return [...data].sort((a, b) =>
    direction === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  )
}
```

- [ ] **Step 4: Re-run filter test and table quality checks**

Run: `pnpm vitest run "src/components/categories/categories-data-table/filter-categories.test.ts"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/categories-data-table/categories-data-table.tsx src/components/categories/categories-data-table/categories-data-table-columns.tsx src/components/categories/categories-data-table/categories-data-table-pagination.tsx src/components/categories/categories-data-table/categories-data-table-toolbar.tsx src/components/categories/categories-data-table/filter-categories.ts src/components/categories/categories-data-table/filter-categories.test.ts src/components/categories/lib/category-status.ts src/components/categories/lib/category-status.test.ts
git commit -m "feat: add categories table with filtering pagination and status toggle"
```

### Task 5: Implement create/edit dialog flow

**Files:**
- Create: `src/components/categories/category-form-dialog.tsx`
- Create: `src/components/categories/lib/category-form-submit.ts`
- Create: `src/components/categories/lib/category-form-submit.test.ts`
- Modify: `src/app/(private)/(sidebar)/categories/page.tsx`
- Modify: `src/components/categories/categories-data-table/categories-data-table-toolbar.tsx`

- [ ] **Step 1: Write failing tests for dialog submit rules (duplicate slug + submit state)**

```ts
import { describe, expect, it } from "vitest"
import { validateCategorySubmit } from "@/components/categories/lib/category-form-submit"

describe("category form submit", () => {
  it("rejects duplicate slug for create", () => {
    const result = validateCategorySubmit(
      { id: undefined, slug: "moradia" },
      [{ id: "1", slug: "MORADIA" }]
    )

    expect(result.ok).toBe(false)
    expect(result.error).toContain("Slug ja existe")
  })
})
```

- [ ] **Step 2: Run tests and verify fail**

Run: `pnpm vitest run "src/components/categories/lib/category-form-submit.test.ts"`
Expected: FAIL with missing file/export.

- [ ] **Step 3: Implement dialog with controlled icon list and auto-slug UX**

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{mode === "create" ? "Nova categoria" : "Editar categoria"}</DialogTitle>
    </DialogHeader>
    {/* name, slug, icon select, status select */}
  </DialogContent>
</Dialog>
```

- [ ] **Step 3.1: Enforce slug uniqueness for create and edit flows**

```ts
const existingSlugs = categories
  .filter((item) => item.id !== editingCategoryId)
  .map((item) => item.slug)

if (!isSlugUnique(values.slug, existingSlugs)) {
  setFormError("slug", "Slug ja existe. Escolha outro.")
  return
}
```

- [ ] **Step 3.2: Add submit loading state and toast feedback**

```ts
setIsSubmitting(true)
try {
  await onSubmit(values)
  toast.success(mode === "create" ? "Categoria criada" : "Categoria atualizada")
  onOpenChange(false)
} catch {
  toast.error("Nao foi possivel salvar a categoria")
} finally {
  setIsSubmitting(false)
}
```

- [ ] **Step 3.3: Implement submit rule helper used by dialog**

```ts
export function validateCategorySubmit(
  current: { id?: string; slug: string },
  existing: Array<{ id: string; slug: string }>
) {
  const duplicates = existing
    .filter((item) => item.id !== current.id)
    .some((item) => item.slug.toLowerCase() === current.slug.toLowerCase())

  return duplicates ? { ok: false, error: "Slug ja existe. Escolha outro." } : { ok: true }
}
```

- [ ] **Step 4: Verify behavior manually + lint**

Run: `pnpm lint`
Expected: PASS with no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/category-form-dialog.tsx src/components/categories/lib/category-form-submit.ts src/components/categories/lib/category-form-submit.test.ts "src/app/(private)/(sidebar)/categories/page.tsx" src/components/categories/categories-data-table/categories-data-table-toolbar.tsx
git commit -m "feat: add category create and edit dialog flow"
```

### Task 6: Implement delete confirmation with blocking rule

**Files:**
- Create: `src/components/categories/delete-category-alert-dialog.tsx`
- Modify: `src/components/categories/categories-data-table/categories-data-table-columns.tsx`
- Modify: `src/app/(private)/(sidebar)/categories/page.tsx`

- [ ] **Step 1: Write failing tests for delete rule messaging**

```ts
import { describe, expect, it } from "vitest"
import { getDeleteBlockReason } from "@/components/categories/lib/category-rules"

describe("delete category guard", () => {
  it("returns blocking reason when usageCount > 0", () => {
    expect(getDeleteBlockReason({ usageCount: 2 } as any)).toContain("nao pode ser excluida")
  })
})
```

- [ ] **Step 2: Run tests and verify fail**

Run: `pnpm vitest run "src/components/categories/lib/category-rules.test.ts"`
Expected: FAIL with missing rule message helper.

- [ ] **Step 3: Implement alert dialog flow and table action wiring**

```tsx
<AlertDialog open={open} onOpenChange={onOpenChange}>
  <AlertDialogContent>
    <AlertDialogTitle>Excluir categoria</AlertDialogTitle>
    {isBlocked ? <Alert>Categoria em uso. Inative em vez de excluir.</Alert> : null}
  </AlertDialogContent>
</AlertDialog>
```

- [ ] **Step 4: Re-run rule tests and lint**

Run: `pnpm vitest run "src/components/categories/lib/category-rules.test.ts" && pnpm lint`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/delete-category-alert-dialog.tsx src/components/categories/categories-data-table/categories-data-table-columns.tsx "src/app/(private)/(sidebar)/categories/page.tsx" src/components/categories/lib/category-rules.ts src/components/categories/lib/category-rules.test.ts
git commit -m "feat: enforce safe category deletion with blocking dialog"
```

### Task 7: Empty state, responsive polish, and accessibility pass

**Files:**
- Create: `src/components/categories/categories-empty-state.tsx`
- Modify: `src/components/categories/categories-data-table/categories-data-table.tsx`
- Modify: `src/components/categories/categories-data-table/categories-data-table-toolbar.tsx`
- Modify: `src/app/(private)/(sidebar)/categories/page.tsx`

- [ ] **Step 1: Write failing test for empty-state condition helper**

```ts
import { describe, expect, it } from "vitest"
import { shouldShowEmptyState } from "@/components/categories/lib/categories-overview"

describe("shouldShowEmptyState", () => {
  it("returns true when no categories", () => {
    expect(shouldShowEmptyState([])).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify fail**

Run: `pnpm vitest run "src/components/categories/lib/categories-overview.test.ts"`
Expected: FAIL with missing helper.

- [ ] **Step 3: Implement empty state and mobile/responsive refinements**

```tsx
return categories.length === 0 ? (
  <CategoriesEmptyState onCreate={openCreateDialog} />
) : (
  <CategoriesDataTable ... />
)
```

- [ ] **Step 4: Validate pass criteria (lint/build)**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/categories/categories-empty-state.tsx src/components/categories/categories-data-table/categories-data-table.tsx src/components/categories/categories-data-table/categories-data-table-toolbar.tsx "src/app/(private)/(sidebar)/categories/page.tsx" src/components/categories/lib/categories-overview.ts src/components/categories/lib/categories-overview.test.ts
git commit -m "feat: add categories empty state and responsive polish"
```

### Task 8: Final verification and docs alignment

**Files:**
- Modify: `docs/superpowers/specs/2026-03-27-categories-page-design.md` (only if behavior changed)
- Optional: `README.md` (only if developer workflow changed)

- [ ] **Step 1: Run targeted test suite**

Run: `pnpm vitest run "src/components/categories/**/*.test.ts"`
Expected: PASS.

- [ ] **Step 2: Run full quality checks**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Perform manual UX checks in browser**

Checklist:
- Create category with auto-generated slug
- Edit category and preserve slug uniqueness rule
- Toggle active/inactive from row actions
- Attempt delete for in-use category and verify block
- Submit create/edit while loading and verify disabled submit button + toast feedback
- Verify table sorting by category name in both directions
- Confirm table filters and columns menu work on desktop/mobile

- [ ] **Step 4: Update docs only if implementation differs from spec**

Run: `git diff docs/superpowers/specs/2026-03-27-categories-page-design.md`
Expected: No diff (or intentional sync diff only).

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-03-27-categories-page-design.md README.md "src/app/(private)/(sidebar)/categories/page.tsx" src/http/types/category.ts src/components/categories/
git commit -m "chore: verify categories page mvp and align documentation"
```

## Notes for Implementer

- Keep component boundaries tight: avoid building a single large categories file.
- Reuse existing transactions table patterns where they are already idiomatic in this codebase.
- Prefer semantic shadcn variants and existing UI primitives before custom markup.
- If test tooling setup is missing, add minimal Vitest scripts first:
  - `pnpm add -D vitest`
  - Add script: `"test": "vitest run"`
