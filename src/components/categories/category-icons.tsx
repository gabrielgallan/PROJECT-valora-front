import {
  Briefcase,
  Car,
  CircleDollarSign,
  HeartPulse,
  House,
  PiggyBank,
  Receipt,
  ShoppingBasket,
  Sparkles,
  Utensils,
  Wrench,
} from "lucide-react"

export const CATEGORY_ICON_OPTIONS = [
  { value: "shopping-basket", label: "Compras", icon: ShoppingBasket },
  { value: "house", label: "Moradia", icon: House },
  { value: "utensils", label: "Alimentacao", icon: Utensils },
  { value: "car", label: "Transporte", icon: Car },
  { value: "heart-pulse", label: "Saude", icon: HeartPulse },
  { value: "piggy-bank", label: "Investimentos", icon: PiggyBank },
  { value: "briefcase", label: "Renda", icon: Briefcase },
  { value: "wrench", label: "Servicos", icon: Wrench },
  { value: "receipt", label: "Contas", icon: Receipt },
  { value: "sparkles", label: "Lazer", icon: Sparkles },
] as const

const categoryIconMap = {
  "shopping-basket": ShoppingBasket,
  house: House,
  utensils: Utensils,
  car: Car,
  "heart-pulse": HeartPulse,
  "piggy-bank": PiggyBank,
  briefcase: Briefcase,
  wrench: Wrench,
  receipt: Receipt,
  sparkles: Sparkles,
} as const

export function getCategoryIcon(icon: string) {
  return categoryIconMap[icon as keyof typeof categoryIconMap] ?? CircleDollarSign
}
