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

type CommunityFavourite = {
  id: string
  label: string
  url: string
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

const browserCommunityFavs: CommunityFavourite[] = [
  {
    id: 'flyffipedia',
    label: 'Flyffipedia',
    url: 'https://flyffipedia.com'
  },
  {
    id: 'siegestats',
    label: 'SiegeStats',
    url: 'https://siegestats.cc/'
  },
  {
    id: 'flyffulator',
    label: 'Flyffulator',
    url: 'https://flyffulator.com'
  }
]

export { defaultPreferences, browserCommunityFavs }
export type { Preferences }
