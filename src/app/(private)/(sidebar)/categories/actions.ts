'use server'

import { HTTPCreateCategory } from "@/http/create-category"
import { HTTPUpdateCategory } from "@/http/update-category"
import { HTTPError } from "ky"
import z from "zod"

export interface CategoryActionState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export async function createCategoryAction(formData: FormData): Promise<CategoryActionState> {
  const schema = z.object({
    name: z.string().trim().min(2, { message: "Name must have at least 2 characters." }),
    description: z.string().trim().max(240, { message: "Description can have at most 240 characters." }).optional(),
  })

  const parser = schema.safeParse(Object.fromEntries(formData))

  if (!parser.success) {
    return {
      success: false,
      message: null,
      errors: parser.error.flatten().fieldErrors,
    }
  }

  try {
    await HTTPCreateCategory({
      name: parser.data.name,
      description: parser.data.description || undefined,
    })

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      const payload = await err.response.json<{ message?: string }>()

      return {
        success: false,
        message: payload?.message ?? "Unable to create category.",
        errors: null,
      }
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    }
  }
}

export async function updateCategoryAction(formData: FormData): Promise<CategoryActionState> {
  const schema = z.object({
    categoryId: z.string().trim().min(1, { message: "Category id is required." }),
    name: z.string().trim().min(2, { message: "Name must have at least 2 characters." }),
    description: z.string().trim().max(240, { message: "Description can have at most 240 characters." }).optional(),
  })

  const parser = schema.safeParse(Object.fromEntries(formData))

  if (!parser.success) {
    return {
      success: false,
      message: null,
      errors: parser.error.flatten().fieldErrors,
    }
  }

  try {
    await HTTPUpdateCategory({
      categoryId: parser.data.categoryId,
      name: parser.data.name,
      description: parser.data.description || undefined,
    })

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      const payload = await err.response.json<{ message?: string }>()

      return {
        success: false,
        message: payload?.message ?? "Unable to update category.",
        errors: null,
      }
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    }
  }
}
