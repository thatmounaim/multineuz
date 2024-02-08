type Preferences = {
  browser: {
    enabled: boolean
  }
  /*
  tabs: {
    showAll: boolean
    removeOnStop: boolean
  }*/
}

const defaultPreferences: Preferences = {
  browser: {
    enabled: true
  }
  /*tabs: {
    showAll: false,
    removeOnStop: false
  }*/
}

export { defaultPreferences }
export type { Preferences }
