<script lang="ts" setup>
import TextInput from '@/ui/TextInput.vue'
import CheckBlock from '@/ui/CheckBlock.vue'
</script>

<template>
  <div class="flex flex-col gap-2 items-center justify-center mx-auto flex-1">
    <h1 class="text-shadow-xs text-xl sm:text-3xl font-bold">Пожертвование</h1>

    <div class="max-[400px]:w-full">
      <form action="" class="flex flex-col w-full gap-2 max-[400px]:px-4">
        <CheckBlock
          :status="false"
          icon="question-circle"
          title="Анонимно"
          description="Сделать пожертвование анонимным"
        />

        <TextInput icon="phone" placeholder="Укажите ваш телефон" />
        <TextInput icon="person" placeholder="Введите ваше ФИО" />

        <div class="input max-sm:w-full">
          <span
            class="icon-[f7--calendar] icon text-base-content/80 my-auto me-3 size-5 shrink-0"
          ></span>
          <label class="sr-only" for="leadingIconDefault">Дата рождения</label>
          <input
            @focus="
              (e) => {
                e.target.parentElement.querySelector('span').classList.add('text-primary')
              }
            "
            @blur="
              (e) => {
                e.target.parentElement.querySelector('span').classList.remove('text-primary')
              }
            "
            type="text"
            class="grow"
            placeholder="Укажите дату рождения"
            id="leadingIconDefault"
          />
        </div>

        <CheckBlock
          :status="false"
          icon="person-2"
          title="Группа"
          description="Сделать пожертвование от лица группы"
        />

        <div class="textarea group min-h-32 p-0">
          <span
            class="icon-[f7--ellipses-bubble] text-base-content/80 mt-2 ml-4 size-5 shrink-0"
          ></span>
          <textarea
            class="grow text-sm resize-none mx-2"
            placeholder="Можете оставить пожелания или список людей, участвующих в пожертвовании"
          ></textarea>
        </div>

        <select class="select w-full appearance-none" aria-label="select">
          <option disabled selected>Выберите способ оплаты</option>
          <option>СБП</option>
          <option>Картой онлайн</option>
        </select>
        <button class="btn btn-block btn-primary hover:btn-text">Сделать пожертвование</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
