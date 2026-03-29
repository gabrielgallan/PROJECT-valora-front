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

export type CategoryFormPayload = {
  name: string
  slug: string
  icon: string
  status: CategoryStatus
}
