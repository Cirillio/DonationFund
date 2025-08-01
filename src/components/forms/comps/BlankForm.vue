<script lang="ts" setup>
import { useFormConfig } from '@/composables/useFormConfig'
import { blankSchema, phoneSpecs, placeholders } from '@/data/donation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { phoneMask, phoneMaskSelected } = useFormConfig({
  phoneSelector: {
    _default: 'RU',
    phoneSpecs: phoneSpecs,
  },
})

const donorBlank = useForm({
  validationSchema: toTypedSchema(blankSchema),
  initialValues: {
    blankPhone: phoneMaskSelected.value.code,
    blankGroup: false,
  },
  name: 'donationBlank',
})
</script>

<template>
  <form @submit.prevent="() => {}">
    <CardTitledContent
      icon="f7--person-crop-rectangle"
      title="Анкета"
      desc="Пожалуйста, заполните необходимые поля (*)"
    >
      <div class="flex w-full gap-4">
        <div class="flex-1 flex flex-col gap-4">
          <!-- Name -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankName"
          >
            <FormItem v-auto-animate class="gap-1">
              <FormControl>
                <TypedInput
                  v-bind="componentField"
                  icon="f7--person"
                  label="Имя"
                  placeholder=""
                  name="blankName"
                  type="text"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Оставьте пустым для анонимности</FormDescription>
            </FormItem>
          </FormField>

          <!-- Phone -->
          <FormField
            v-slot="{ componentField, resetField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankPhone"
          >
            <FormItem v-auto-animate class="gap-1">
              <FormControl>
                <TypedInput
                  v-mask="phoneMask"
                  v-bind="componentField"
                  icon="f7--phone"
                  label="Телефон*"
                  placeholder="Укажите номер телефона"
                  name="blankPhone"
                  type="text"
                >
                  <template #actionButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button
                          :variant="'outline'"
                          class="dark:hover:border-primary px-3 h-9 gap-2 justify-between w-fit"
                        >
                          <span v-if="phoneMaskSelected" class="text-base">{{
                            phoneMaskSelected.icon
                          }}</span>
                          <span v-else class="text-sm text-muted-foreground">Select</span>
                          <F7Icon class="f7--chevron-down size-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        :align="'end'"
                        class="min-w-[var(--radix-dropdown-menu-trigger-width)] gap-1 flex flex-col"
                      >
                        <DropdownMenuItem
                          v-for="spec in phoneSpecs"
                          :key="spec.id"
                          @select="
                            () => {
                              phoneMaskSelected = spec
                              resetField({ value: spec.code })
                            }
                          "
                          class="flex hover:!bg-input/50 hover:shadow-xs transition-all items-center px-2 py-1 text-sm gap-2"
                          :class="{
                            'bg-muted hover:!bg-muted shadow-xs':
                              phoneMaskSelected.code === spec.code,
                          }"
                        >
                          <span class="text-base">{{ spec.icon }}</span>
                          <span>{{ spec.name }}</span>
                          <span class="ml-auto text-muted-foreground">{{ spec.code }}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </template>
                </TypedInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Birth -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankBirth"
          >
            <FormItem v-auto-animate class="gap-1">
              <FormControl>
                <TypedInput
                  v-bind="componentField"
                  icon="f7--calendar"
                  label="Дата рождения*"
                  name="blankBirth"
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Separator orientation="vertical" class="!bg-input" />

        <div class="flex-1 flex flex-col gap-4">
          <!-- Group -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankGroup"
          >
            <FormItem v-auto-animate class="gap-1">
              <FormControl>
                <div class="flex flex-col">
                  <Label class="pb-1.25 text-base w-fit">Дополнительно</Label>

                  <CheckBlock
                    class="w-full"
                    v-bind="componentField"
                    label="От лица группы"
                    icon="f7--person-2"
                  />
                </div>
              </FormControl>
              <FormDescription>Отметьте, если участвует коллектив</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Desc -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankDesc"
          >
            <FormItem v-auto-animate class="gap-1">
              <FormControl>
                <Textarea
                  :placeholder="placeholders.get(donorBlank.values.blankGroup || false)"
                  v-bind="componentField"
                  class="resize-none min-h-24 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
    </CardTitledContent>
  </form>
</template>
