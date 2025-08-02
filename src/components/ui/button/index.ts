import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  "inline-flex duration-150 ease-in-out w-fit cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary border border-primary/10 text-primary-foreground shadow-xs  dark:hover:border-primary dark:hover:bg-primary/80',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-card   border-input dark:text-card-foreground text-primary-foreground shadow-xs backdrop-blur-sm',
        secondary:
          'bg-secondary border border-secondary/50 text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'backdrop-blur-lg border hover:bg-popover/30 shadow-xs shadow-input border-transparent bg-popover/10 hover:text-accent-foreground darl:text-popover-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        ring: 'border border-ring  bg-card ring-ring/25 ring-[2px]  disabled:ring-ring/50 disabled:hover:bg-input/20 backdrop-blur-lg shadow-xs',
        text: 'bg-transparent shadow-none border border-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
