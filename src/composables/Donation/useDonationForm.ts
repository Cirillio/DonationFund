import { useForm } from 'vee-validate'
import type { FormContext } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import actualSchema, { IDonorSchema } from '@/data/donation/donation.schema.data'

type DonationForm = {
  schema: typeof actualSchema
}

export function useDonationForm(form: DonationForm) {
  return {
    createForm: (params: { initials: Partial<IDonorSchema> }): FormContext<IDonorSchema> =>
      useForm<IDonorSchema>({
        validationSchema: toTypedSchema(form.schema),
        initialValues: params.initials || {},
      }),
  }
}
