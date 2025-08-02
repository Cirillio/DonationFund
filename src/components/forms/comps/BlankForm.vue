<script lang="ts" setup>
import { watch } from 'vue'
import { useFormConfig } from '@/composables/useFormConfig'
import { blankSchema, phoneSpecs, placeholders } from '@/data/donation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useDonationStore } from '@/stores/donation.store'
import { FormField } from '@/components/ui/form'

const donationStore = useDonationStore()

const { phoneMask, phoneMaskSelected } = useFormConfig({
  phoneSelector: {
    _default: donationStore.phoneCode,
    phoneSpecs: phoneSpecs,
  },
})

const donorBlank = useForm({
  validationSchema: toTypedSchema(blankSchema),
  initialValues: {
    ...donationStore.blankForm,
    blankPhone: donationStore.blankForm.blankPhone
      ? donationStore.blankForm.blankPhone
      : phoneMaskSelected.value.code,
  },
  name: 'donationBlank',
})

watch(
  () => donorBlank.values,
  (values) => {
    donationStore.blankForm = { ...values }
  },
  {
    deep: true,
  }
)

watch(
  () => donorBlank.meta.value.valid,
  (valid) => {
    donationStore.setBlankValidity(valid)
  }
)
</script>

<template>
  <form @submit.prevent="() => {}">
    <CardTitledContent icon="f7--person-crop-rectangle" title="Анкета">
      <template #desc>
        <span class="text-center max-[400px]:text-xs text-sm text-muted-foreground"
          >Пожалуйста, укажите имя,
          <div class="mt-1 dark:m-0 flex gap-2 dark:gap-1 items-center">
            <span
              class="dark:text-primary dark:bg-transparent dark:p-0 bg-primary/50 text-primary-foreground px-1.5 py-0.5 rounded-md"
              >номер телефона</span
            >
            и
            <span
              class="dark:text-primary dark:bg-transparent dark:p-0 bg-primary/50 text-primary-foreground px-1.5 py-0.5 rounded-md"
              >дату рождения</span
            >
          </div>
        </span>
      </template>

      <div class="flex flex-col w-full gap-4">
        <!-- Phone -->
        <FormField
          v-slot="{ componentField, resetField }"
          :validate-on-blur="!donorBlank.isFieldDirty"
          name="blankPhone"
        >
          <FormItem class="gap-1">
            <FormControl>
              <TypedInput
                v-mask="phoneMask"
                v-bind="componentField"
                icon="f7--phone"
                :placeholder="phoneMaskSelected.code"
                name="blankPhone"
                type="tel"
              >
                <template #actionButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button :variant="'outline'" class="px-3 gap-1 md:gap-2 w-fit">
                        <span v-if="phoneMaskSelected" class="text-sm md:text-base">{{
                          phoneMaskSelected.icon
                        }}</span>
                        <span v-else class="text-sm text-muted-foreground">Select</span>
                        <F7Icon class="f7--chevron-down size-3.5 md:size-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      :align="'end'"
                      class="min-w-[var(--radix-dropdown-menu-trigger-width)] gap-2 duration-25 flex flex-col"
                    >
                      <DropdownMenuItem
                        v-for="spec in phoneSpecs"
                        :key="spec.id"
                        @select="
                          () => {
                            phoneMaskSelected = spec
                            donationStore.phoneCode = spec.id
                            resetField({ value: spec.code })
                          }
                        "
                        class="flex gap-2 md:py-1 cursor-pointer"
                        :class="{
                          '!bg-primary !text-primary-foreground shadow-sm':
                            phoneMaskSelected.code === spec.code,
                        }"
                      >
                        <span class="text-sm md:text-base">{{ spec.icon }}</span>
                        <span>{{ spec.name }}</span>
                        <span class="ml-auto">{{ spec.code }}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </template>
              </TypedInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex max-[400px]:flex-col gap-4">
          <!-- Name -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankName"
          >
            <FormItem class="gap-1 flex-3">
              <FormControl>
                <TypedInput
                  v-bind="componentField"
                  icon="f7--person"
                  placeholder=""
                  name="blankName"
                  type="text"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Оставьте пустым для анонимности</FormDescription>
            </FormItem>
          </FormField>

          <!-- Birth -->
          <FormField
            v-slot="{ componentField }"
            :validate-on-blur="!donorBlank.isFieldDirty"
            name="blankBirth"
          >
            <FormItem class="gap-1 flex-2">
              <FormControl>
                <TypedInput
                  v-bind="componentField"
                  icon="f7--calendar"
                  placeholder="дд.мм.гггг"
                  name="blankBirth"
                  type="text"
                  v-mask="'##.##.####'"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="flex gap-2 items-center">
          <Separator class="shrink mx-2" />
          <span class="text-xs md:text-sm text-muted-foreground">Дополнительно</span>
          <Separator class="shrink mx-2" />
        </div>

        <!-- Group -->
        <FormField
          v-slot="{ componentField }"
          :validate-on-blur="!donorBlank.isFieldDirty"
          name="blankGroup"
        >
          <FormItem class="gap-1">
            <FormControl>
              <div class="flex flex-col">
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
          <FormItem class="gap-1">
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
    </CardTitledContent>
  </form>
</template>
