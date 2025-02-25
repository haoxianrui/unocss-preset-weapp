import { variantGetParameter } from '@unocss/rule-utils'
import type { VariantContext, VariantObject } from '@unocss/core'
import { h } from '../utils'
import type { Theme } from '../theme'

export const variantSupports: VariantObject = {
  name: 'supports',
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter('supports-', matcher, ctx.generator.config.separators)
    if (variant) {
      const [match, rest] = variant

      let supports = h.bracket(match) ?? ''
      if (supports === '')
        supports = ctx.theme.supports?.[match] ?? ''

      if (supports) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ''}@supports ${supports}`,
          }),
        }
      }
    }
  },
  multiPass: true,
}
