export const Api_Endpoints = {

  dashboard: '/user/admin/dashboard',
  primary: '/core/admin/primary/',
  country: '/core/admin/country/',
  auth: {
    login: '/user/admin/auth/login/',
    send_email: '/user/admin/auth/two_step_email_send/',
    two_step_g2f: '/user/admin/auth/two_step_g2f/',
    two_step_email: '/user/admin/auth/two_step_email/',
  },
  club: {
    list: "/clubs/admin/poan_level/",
    add: "/clubs/admin/poan_level/",
    detail: "/clubs/admin/poan_level/",
    delete: "/clubs/admin/poan_level/",
    status: "/clubs/admin/poan_level/status/",
    updateUserPoanLevel: "/clubs/admin/poan_level/change_user_level/",
    getUserLevel: "/clubs/admin/poan_level/get_user_level_details_by_user_id/",
    commission: {
      show: '/user/admin/users/level_currency_setting/',
      add: '/user/admin/users/level_currency_setting/',
      delete: '/user/admin/users/level_currency_setting/',
      edit: '/user/admin/users/level_currency_setting/',
      patch: '/user/admin/users/level_currency_setting/blocked/',

    }
  },
  user: {
    list: '/user/admin/users',
    add: '/user/admin/users',
    update: '/user/admin/users/',
    details: '/user/admin/users/',
    block: '/user/admin/users/block/',
    unblock: '/user/admin/users/unblock/',
    session: '/user/admin/users/session/',
    terminateSession: '/user/admin/users/session/terminate/',
    wallet: "/payment/admin/wallet/",
    resetPassword: "/user/admin/users/reset_password/",
    commission: {
      show: '/user/admin/users/user_currency_setting/',
      add: '/user/admin/users/user_currency_setting/',
      delete: '/user/admin/users/user_currency_setting/',
      edit: '/user/admin/users/user_currency_setting/',
      patch: '/user/admin/users/user_currency_setting/blocked/',

    }
  },
  app: {
    software: {
      list: '/core/admin/software/list/',
      version: '/core/admin/software/',
      update_version: '/core/admin/software/:software_id/version/:version_id',
      set_active_version: '/core/admin/software/:software_id/set_active_version/',
      show_version: '/core/admin/software/:software_id/version/:version_id/',
      languages: '/core/admin/software/',
      update_language: '/core/admin/software/:software_id/language_code/',
    },
  },
  report: {
    deposits: '/transaction/admin/reports/deposits/',
    exchange: '/transaction/admin/reports/exchange/',
    pair_exchange: '/transaction/admin/reports/pair_exchange/',
    hot_wallets: '/payment/admin/wallet/currency/balance',
    withdraws: '/transaction/admin/reports/withdraws/',
    address: '/payment/admin/report/address/',
  },
  support: {
    task: {
      list: '/support/admin/task',
      details: '/support/admin/task/',
      update_status: '/support/admin/task/update_status/',
    },
    ticket: {
      list: '/support/admin/ticket/',
      details: '/support/admin/ticket/',
      comments: '/support/admin/ticket/comment/',
    },
    offlineDeposit: {
      list: '/transaction/admin/deposit/offline/requests',
      show: '/transaction/admin/deposit/offline/request/',
      accept: '/transaction/admin/deposit/offline/accept/',
      reject: '/transaction/admin/deposit/offline/reject/',
      modify: '/transaction/admin/deposit/offline/return_modify/',
      money: '/transaction/admin/deposit/offline/return_money/'
    },
  },
  network: {
    crud: createStandardCrudEndpoints({baseUrl: '/payment/admin/payment/network/'}),
    show: '/payment/admin/payment/network/show/',
    add: '/payment/admin/payment/network/add/',
    delete: '/payment/admin/payment/network/delete/',
    edit: '/payment/admin/payment/network/update/',
    list: '/payment/admin/payment/network/',
    addNetworkAddress:'/payment/admin/crypto_currency_address/',
    patch: '/payment/admin/payment/network/update_by_key/',

  },
  pricereference: {
    list: '/payment/admin/payment/currency_price_reference/',
    show: '/payment/admin/payment/currency_price_reference/',
    add: '/payment/admin/payment/currency_price_reference/',
    delete: '/payment/admin/payment/currency_price_reference/',
    update: '/payment/admin/payment/currency_price_reference/',
    update_status: '/payment/admin/payment/currency_price_reference/update_by_key/',
    update_selected: '/payment/admin/payment/currency_price_reference/update_by_key/',
    currency: '/payment/admin/payment/currency_price_reference/price_symbols/',
    AutomationSetting: {
      show: "/payment/admin/currency_price/fiat/settingAutomationMode",
      update: "/payment/admin/currency_price/fiat/settingAutomationMode",
    }


  },
  currency: {
    crud: createStandardCrudEndpoints({baseUrl: '/payment/admin/payment/currency/'}),
    all: '/payment/admin/payment/currency/all/',
    patch: '/payment/admin/payment/currency/update_by_key/',
    address: {
      show: '/payment/admin/payment/currency_account/',
      add: '/payment/admin/payment/currency_account/',
      delete: '/payment/admin/payment/currency_account/',
      edit: '/payment/admin/payment/currency_account/'
    },
    setting: {
      show: '/payment/admin/payment/currency_setting/',
      add: '/payment/admin/payment/currency_setting/',
      delete: '/payment/admin/payment/currency_setting/',
      edit: '/payment/admin/payment/currency_setting/'
    }
  },
  currency_pairs: {
    all: '/payment/admin/payment/currency_pairs/all/',
    crud: createStandardCrudEndpoints({baseUrl: '/payment/admin/payment/currency_pairs/'}),
    patch: '/payment/admin/payment/currency_pairs/update_by_key/',
  },
  core: {
    country: "/core/country"
  },
  roles: {
    list: "/user/admin/roles"
  },
  market: {
    list: "/transaction/order/market"
  },
  settings: {
    maxWithdrawCrypto: "/transaction/admin/setting/MAX_WITHDRAW_CRYPTO_CURRENCY",
    withdrawFiatConfirm: "/transaction/admin/setting/WITHDRAW_FIAT_MANAGER_CONFIRMATION",
    withdrawNotification: "/transaction/admin/setting/SEND_NOTIFICATION_WITHDRAW_TASK",
    maxWithdrawFiat: "/transaction/admin/setting/MAX_WITHDRAW_FIAT",
    withdrawFiat: "/transaction/admin/setting/WITHDRAW_FIAT_CURRENCY_INTERFACE",
    withdrawCrypto: "/transaction/admin/setting/WITHDRAW_CRYPTO_CURRENCY_CURRENCY_INTERFACE",
    withdrawCryptoConfirm: "/transaction/admin/setting/WITHDRAW_CRYPTO_CURRENCY_MANAGER_CONFIRMATION",
    MIN_BALANCE_BINANCE: "/transaction/admin/setting/MIN_BALANCE_BINANCE",
    MOBILE_NOTIFICATION_TO_MANAGER: "/transaction/admin/setting/MOBILE_NOTIFICATION_TO_MANAGER",
    EMAIL_NOTIFICATION_TO_MANAGER: "/transaction/admin/setting/EMAIL_NOTIFICATION_TO_MANAGER",
  }

}

export function createStandardCrudEndpoints(param: { baseUrl: string }) {
  return {
    list: `${param.baseUrl}`,
    add: `${param.baseUrl}`,
    show: `${param.baseUrl}`,
    update: `${param.baseUrl}`,
    delete: `${param.baseUrl}`,
  };
}
