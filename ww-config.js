export default {
  editor: {
    label: { en: 'PV Input Text' },
    icon: 'text-input',
    customSettingsPropertiesOrder: [
      'formInfobox',
      ['fieldName', 'customValidation', 'validation'],
      'initialValue',
      'placeholder',
      'disabled',
      'readonly',
      'required',
    ],
  },
  triggerEvents: [
    { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
    { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    { name: 'onEnterKey', label: { en: 'On enter key' }, event: { value: '' } },
    { name: 'focus', label: { en: 'On focus' }, event: null },
    { name: 'blur', label: { en: 'On blur' }, event: null },
  ],
  properties: {
    initialValue: {
      label: { en: 'Initial value' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Initial value for the input',
      },
      /* wwEditor:end */
    },
    placeholder: {
      label: { en: 'Placeholder' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Placeholder text',
      },
      /* wwEditor:end */
    },
    disabled: {
      label: { en: 'Disabled' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to disable the input: true | false',
      },
      /* wwEditor:end */
    },
    readonly: {
      label: { en: 'Read only' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean to set the input as read only: true | false',
      },
      /* wwEditor:end */
    },
    required: {
      label: { en: 'Required' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'A boolean that defines if the input is required: true | false',
      },
      /* wwEditor:end */
    },
    /* wwEditor:start */
    form: {
      editorOnly: true,
      hidden: true,
      defaultValue: false,
    },
    formInfobox: {
      type: 'InfoBox',
      section: 'settings',
      options: (_, sidePanelContent) => ({
        variant: sidePanelContent.form?.name ? 'success' : 'warning',
        icon: 'pencil',
        title: sidePanelContent.form?.name || 'Unnamed form',
        content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
        cta: {
          label: 'Select form',
          action: 'selectForm',
        },
      }),
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    /* wwEditor:end */
    fieldName: {
      label: { en: 'Field name' },
      section: 'settings',
      type: 'Text',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The field name for form submission.',
      },
      /* wwEditor:end */
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    customValidation: {
      label: { en: 'Custom validation' },
      section: 'settings',
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Enable custom validation rules.',
      },
      /* wwEditor:end */
      hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
    },
    validation: {
      label: { en: 'Validation' },
      section: 'settings',
      type: 'Formula',
      defaultValue: '',
      bindable: false,
      hidden: (content, sidePanelContent) =>
        !sidePanelContent.form?.uid || !content?.customValidation,
    },
  },
};
