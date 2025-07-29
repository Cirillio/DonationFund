import { ComponentResolver } from 'unplugin-vue-components'

export const veeValidateResolver = (): ComponentResolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (name === 'Form') return { name: 'Form', from: 'vee-validate' }
    if (name === 'FormField') return { name: 'Field', from: 'vee-validate' }
    if (name === 'FormFieldArray') return { name: 'FieldArray', from: 'vee-validate' }
  },
})
