import { formatDistanceToNow as fnsFormatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDistanceToNow(date: number | Date): string {
  return fnsFormatDistanceToNow(date, {
    addSuffix: true,
    locale: es,
  })
}
