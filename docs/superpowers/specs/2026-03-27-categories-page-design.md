# Categories Page Design (MVP)

Date: 2026-03-27
Status: Approved for planning
Scope: `src/app/(private)/(sidebar)/categories/page.tsx` plus new categories feature components under `src/components/categories/**`

## 1) Objective

Design and deliver a Categories management page consistent with the existing Transactions experience, with:

- Overview at the top (summary cards + radial chart)
- Data-table based listing
- Full CRUD management flow for categories
- Safe deletion rules for data integrity

This MVP includes required category fields:

- `name`
- `slug`
- `icon`
- `status` (`active` | `inactive`)

Out of scope for this MVP:

- Category type (income/expense)
- Budget limits per category

## 2) Chosen Approach

Selected approach: **Table-first with modal CRUD**.

Why this approach:

- Closest to current product patterns (`transactions` page/table)
- Fastest path to production with predictable UI behavior
- Better maintainability than hybrid or master-detail for first iteration
- Enables future expansion (grid mode, advanced analytics) without rework

## 3) Page Architecture

`categories/page.tsx` follows the same high-level structure used by `transactions/page.tsx`:

1. **Top section (insights)**
   - Header (title + action)
   - Overview cards
   - Categories radial chart

2. **Main section (management)**
   - Categories data table
   - Filters and column visibility controls
   - Row actions for edit/status/delete

### Responsibility boundaries

- `page.tsx`: data orchestration + section composition
- Overview components: visual-only summaries
- Table components: sorting/filtering/pagination/selection
- Dialog components: create/edit and delete confirmation flows

## 4) Component Design

## 4.1 Core components

- `src/components/categories/categories-page-header.tsx`
  - Title, description, primary CTA (`Nova categoria`)

- `src/components/categories/categories-overview-cards.tsx`
  - Summary metrics: total, active, inactive, in use

- `src/components/categories/categories-radial-chart.tsx`
  - Distribution chart (usage by category)

- `src/components/categories/categories-data-table/categories-data-table.tsx`
  - Table shell (TanStack state + rendering)

- `src/components/categories/categories-data-table/categories-data-table-columns.tsx`
  - Column definitions and row action cell

- `src/components/categories/categories-data-table/categories-data-table-toolbar.tsx`
  - Search, status filter, reset, columns menu, quick create action

- `src/components/categories/category-form-dialog.tsx`
  - Create/Edit category modal

- `src/components/categories/delete-category-alert-dialog.tsx`
  - Delete confirmation and deletion-block messaging

- `src/components/categories/categories-empty-state.tsx`
  - Empty state + CTA when no categories exist

## 4.2 Suggested shared types

`src/components/categories/types.ts`:

```ts
export type CategoryStatus = "active" | "inactive"

export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  status: CategoryStatus
  usageCount: number
  updatedAt: Date | string
}

export type CategoriesOverview = {
  total: number
  active: number
  inactive: number
  inUse: number
}
```

## 5) Data Flow

Initial MVP flow:

1. `categories/page.tsx` loads initial category list (mock or API)
2. Data is passed to overview and table components
3. Table manages local UI state (sort/filter/pagination/visibility)
4. CRUD handlers update local state optimistically
5. Later API integration can replace handlers without redesigning UI boundaries

MVP data source decision:

- First implementation uses mock/local data with contracts compatible with future API wiring.

### Handlers contract

- `onCreate(payload)`
- `onUpdate(id, payload)`
- `onToggleStatus(id, status)`
- `onRequestDelete(category)`
- `onConfirmDelete(id)`

## 6) Business Rules

1. Required fields: `name`, `slug`, `icon`
2. `status` defaults to `active`
3. `slug` must be unique (case-insensitive)
4. `slug` normalization: lowercase + hyphenated
5. Deletion is blocked if category has linked transactions (`usageCount > 0`)
6. Inactive categories remain visible for historical/admin purposes

## 7) Validation and Error Handling

Form validation (create/edit):

- `name`: 2-40 chars
- `slug`: 2-50 chars, `^[a-z0-9-]+$`
- `icon`: required

Icon input decision:

- `icon` is chosen from a controlled predefined list (no free-text icon names in MVP).

UX feedback rules:

- Inline field errors in dialog
- Delete-block reason shown clearly in `AlertDialog`
- Toast feedback for non-blocking success/failure events
- Submit actions disabled while saving

## 8) UI/UX and Performance Guidelines

## 8.1 UX

- Keep visual and interaction parity with Transactions page
- Place high-frequency actions in table toolbar and row menu
- Keep destructive actions explicit with confirmation
- Ensure mobile usability with horizontal filter overflow and essential columns

## 8.2 Performance

- Memoize derived values (overview metrics, filtered dataset)
- Avoid recreating static option lists during render
- Keep table logic modular to limit unnecessary rerenders
- Maintain columns in dedicated module

## 9) shadcn Component Stack

Use existing shadcn primitives already aligned with the project:

- `Card`
- `Table`
- `Dialog`
- `AlertDialog`
- `DropdownMenu`
- `Select`
- `Input`
- `Button`
- `Badge`
- `Alert`
- `Chart`

Plus existing TanStack table approach already used on transactions.

## 10) Acceptance Criteria

1. Categories list renders with sorting, filtering, pagination, and column visibility controls
2. User can create and edit category via dialog with validation
3. User can activate/inactivate category from row actions
4. User can delete a category only when `usageCount === 0`
5. If deletion is blocked, UI explains why and suggests inactivation
6. Overview cards and radial chart reflect current dataset
7. Page is responsive and coherent with Transactions visual language

## 11) Delivery Plan Readiness

This design is approved and ready for implementation planning.
Implementation plan should split work into:

1. Type/contracts and mocks
2. Page composition and overview section
3. Data table and toolbar
4. CRUD dialogs and rules enforcement
5. Polish, responsiveness, and verification
