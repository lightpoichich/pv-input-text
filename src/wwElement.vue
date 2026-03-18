<template>
  <div class="pv-input-text">
    <div class="pv-input-text__inner" :class="{ 'pv-input-text--invalid': props.content?.invalid }">
      <PvInputText
        :modelValue="internalValue"
        :type="props.content?.type || 'text'"
        :inputmode="props.content?.inputmode || null"
        :placeholder="props.content?.placeholder"
        :disabled="props.content?.disabled"
        :readonly="props.content?.readonly"
        :invalid="props.content?.invalid"
        unstyled
        :pt="passthrough"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <input
        :type="props.content?.type || 'text'"
        :name="props.content?.fieldName"
        :value="internalValue"
        :required="props.content?.required"
        tabindex="-1"
        class="pv-input-text__fake-input"
      />
    </div>
  </div>
</template>

<script>
import { computed, watch, inject } from 'vue';
import { installPrimeVue } from '../shared/install-primevue.js';
import InputText from 'primevue/inputtext';

export default {
  components: { PvInputText: InputText },
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    wwElementState: { type: Object, default: () => ({}) },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    installPrimeVue();

    // Internal variable
    const { value: internalValue, setValue: setInternalValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'value',
        type: 'string',
        defaultValue: '',
      });

    // Sync initialValue
    watch(
      () => props.content?.initialValue,
      (v) => {
        if (v !== undefined) {
          setInternalValue(v);
          emit('trigger-event', { name: 'initValueChange', event: { value: v } });
        }
      },
      { immediate: true }
    );

    // Event handlers
    const handleInput = (event) => {
      const newVal = event.target?.value ?? event;
      if (internalValue.value !== newVal) {
        setInternalValue(newVal);
        emit('trigger-event', { name: 'change', event: { value: newVal } });
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Enter') {
        emit('trigger-event', { name: 'onEnterKey', event: { value: internalValue.value } });
      }
    };

    const handleFocus = () => {
      emit('trigger-event', { name: 'focus', event: null });
    };

    const handleBlur = () => {
      emit('trigger-event', { name: 'blur', event: null });
    };

    // PassThrough
    const passthrough = {
      root: { class: 'pv-input-text__input' },
    };

    // Form integration
    const fieldName = computed(() => props.content?.fieldName || props.wwElementState?.name);
    const validation = computed(() => props.content?.validation);
    const customValidation = computed(() => props.content?.customValidation);
    const initValue = computed(() => props.content?.initialValue ?? '');

    const useForm = inject('_wwForm:useForm', () => {});
    useForm(
      internalValue,
      { fieldName, validation, customValidation, initialValue: initValue },
      { elementState: props.wwElementState, emit, sidepanelFormPath: 'form', setValue: setInternalValue }
    );

    /* wwEditor:start */
    const selectForm = inject('_wwForm:selectForm', () => {});
    /* wwEditor:end */

    return {
      props,
      internalValue,
      handleInput,
      handleKeydown,
      handleFocus,
      handleBlur,
      passthrough,
      /* wwEditor:start */
      selectForm,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped lang="scss">
@import '../shared/styles/base';
@import '../shared/styles/tokens';

.pv-input-text {
  &__inner {
    position: relative;
    width: 100%;
  }

  :deep(.pv-input-text__input) {
    @include pv-input-base;
    width: 100%;

    &:focus {
      @include pv-focus-ring;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &[readonly] {
      cursor: default;
    }

  }

  &--invalid :deep(.pv-input-text__input) {
    border-color: var(--pv-danger, #EF4444);

    &:focus {
      border-color: var(--pv-danger, #EF4444);
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
    }
  }

  &__fake-input {
    background: rgba(0, 0, 0, 0);
    border: 0;
    bottom: -1px;
    font-size: 0;
    height: 1px;
    left: 0;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0;
    width: 100%;
  }
}
</style>
