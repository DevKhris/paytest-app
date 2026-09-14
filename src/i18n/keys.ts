export const i18n = {
  landing: {
    title: 'landing.title',
    subtitle: 'landing.subtitle',
    form: {
      title: 'landing.form.title',
      nameLabel: 'landing.form.nameLabel',
      namePlaceholder: 'landing.form.namePlaceholder',
      codeLabel: 'landing.form.codeLabel',
      codePlaceholder: 'landing.form.codePlaceholder',
      submit: 'landing.form.submit',
      loading: 'landing.form.loading',
      error: 'landing.form.error',
      success: 'landing.form.success',
      empty: 'landing.form.empty',
      setupTitle: 'landing.form.setupTitle',
      setupSubtitle: 'landing.form.setupSubtitle',
      yourId: 'landing.form.yourId',
      idCopied: 'landing.form.idCopied',
      createPassword: 'landing.form.createPassword',
      passwordPlaceholder: 'landing.form.passwordPlaceholder',
      passwordSoon: 'landing.form.passwordSoon',
      continueDashboard: 'landing.form.continueDashboard',
    },
  },
  dashboard: {
    title: 'dashboard.title',
    subtitle: 'dashboard.subtitle',
    close: 'dashboard.close',
    profile: {
      title: 'dashboard.profile.title',
      id: 'dashboard.profile.id',
      balance: 'dashboard.profile.balance',
      welcomeBack: 'dashboard.profile.welcomeBack',
    },
    transfer: {
      title: 'dashboard.transfer.title',
      send: 'dashboard.transfer.send',
      receive: 'dashboard.transfer.receive',
      amount: 'dashboard.transfer.amount',
      expectedAmount: 'dashboard.transfer.expectedAmount',
      recipientId: 'dashboard.transfer.recipientId',
      submit: 'dashboard.transfer.submit',
      cancel: 'dashboard.transfer.cancel',
      soon: 'dashboard.transfer.soon',
    },
    transactions: {
      title: 'dashboard.transactions.title',
      empty: 'dashboard.transactions.empty',
      contacts: 'dashboard.transactions.contacts',
      noContacts: 'dashboard.transactions.noContacts',
    },
    sections: {
      funds: 'dashboard.sections.funds',
      activity: 'dashboard.sections.activity',
    },
  },
  footer: {
    copyright: 'footer.copyright',
  },
} as const;

type PathsToStringProps<T> = T extends string
  ? []
  : { [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>] }[Extract<keyof T, string>];

type Join<T extends string[], D extends string = '.'> = T extends []
  ? never
  : T extends [infer F, ...infer R]
    ? F extends string
      ? `${F}${D}${Join<Extract<R, string[]>, D>}`
      : never
    : string;

export type I18nKey = Join<PathsToStringProps<typeof i18n>, '.'>;

export function t(key: I18nKey): string {
  return key;
}
