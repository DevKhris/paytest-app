export const i18n = {
  landing: {
    title: 'landing.title',
    subtitle: 'landing.subtitle',
    form: {
      title: 'landing.form.title',
      label: 'landing.form.label',
      placeholder: 'landing.form.placeholder',
      submit: 'landing.form.submit',
      loading: 'landing.form.loading',
      error: 'landing.form.error',
      success: 'landing.form.success',
      empty: 'landing.form.empty',
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
    },
    transfer: {
      title: 'dashboard.transfer.title',
      send: 'dashboard.transfer.send',
      receive: 'dashboard.transfer.receive',
      amount: 'dashboard.transfer.amount',
      recipientId: 'dashboard.transfer.recipientId',
      submit: 'dashboard.transfer.submit',
      cancel: 'dashboard.transfer.cancel',
      soon: 'dashboard.transfer.soon',
    },
    transactions: {
      title: 'dashboard.transactions.title',
      empty: 'dashboard.transactions.empty',
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
