import { QuoteCard } from "#build/components"
import { log } from "console"

export { type QuoteSource, type PermissionToShare, type QuoteData, getUIStrings, quoteSourceIsPublic, getUsableQuotes}

/* Define Quote types */

enum QuoteSource {
  // (string equivalents are localization keys)
  Email           = 'quote-source.email',
  PayPalDonation  = 'quote-source.payPalDonation',
  GitHub          = 'quote-source.gitHub',
  StackExchange   = 'quote-source.stackExchange',
  Reddit          = 'quote-source.reddit',
  Lifehacker      = 'quote-source.lifehacker',
  YoutubeComment  = 'quote-source.youtubeComment',
}
enum PermissionToShare {
  None,
  Requested,
  Denied,
  Granted,
}
type QuoteData = {
  quote: string,
  quoteKey: string,
  originalLanguage: string,
  name: string,
  source: QuoteSource,
  link: string,
  permission: PermissionToShare,
  weight: number,
}

/* Helper functions */

function quoteSourceIsPublic(source: QuoteSource) {
  return source != QuoteSource.Email && source != QuoteSource.PayPalDonation
}

/* String Generator */

function getUIStrings(quote: QuoteData) {

  // Setup

  const { t } = useI18n()
  const { isCurrentLanguage } = useCoolI18n()
  const mt = useMT()

  // Get quote ui string

  // Setup
  var uiQuote = ''
  var isUsingTranslation = true

  // Try to get translation
  uiQuote = t(quote.quoteKey)

  // Fall back to original quote
  if (uiQuote == null || uiQuote.length == 0) { // Not sure if == 0 check is necessary
    uiQuote = quote.quote
    isUsingTranslation = false
  }
  // Validate
  console.assert(!isCurrentLanguage(quote.originalLanguage) || !isUsingTranslation, `We're using a translation for quote with key ${ quote.quoteKey }, despite that quote being in the current language.`)

  // Get quote SOURCE ui string

  // Get quote source string from stringsfile, insert name, and apply markdown
  var uiSource = mt( quote.source, { name: quote.name } )

  // Add disclaimer
  if (isUsingTranslation) {
    const disclaimer = t(`quotes.translation-disclaimer.${ quote.originalLanguage }`)
    uiSource = `${ uiSource } (${ disclaimer })`
  }

  // Return
  return { quote: uiQuote, source: uiSource }
}

function getUsableQuotes(): QuoteData[] {

  var result: QuoteData[] = quotes
                              .filter((quote) => quote.permission != PermissionToShare.Denied)
                              .toSorted((a: QuoteData, b: QuoteData) => b.weight - a.weight)
  return result
}

/* Define Quotes */

const quotes: QuoteData[] = [

  {
    quote: "Among all apps that try to fix this problem, this one is undoubtly the best!",
    quoteKey: "quotes.0",
    originalLanguage: 'en',
    name: "tomatsaev",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/34',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Mac Mouse Fix is literally everything you could want in your experience of using a mouse with OSX.",
    quoteKey: "quotes.1",
    originalLanguage: 'en',
    name: "William Park",
    source: QuoteSource.PayPalDonation,
    link: 'message:<3B.AC.57749.F6B6C326@ccg13mail02>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Works like a charm and it's easy to set up!",
    quoteKey: "quotes.2",
    originalLanguage: 'en',
    name: "Tomáš Nesrovnal",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371330/308049',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "This is the best mouse software on the Mac.",
    quoteKey: "quotes.3",
    originalLanguage: 'en',
    name: "samueljim",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/105',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Thank you for the amazing app in Mac Mouse Fix. Just what I needed, no subscription and no bloat. Thank you so much!",
    quoteKey: "quotes.4",
    originalLanguage: 'en',
    name: "Erik Svendsen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<04.52.53548.372FA446@ccg13mail05>',
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "Mac Mouse Fix is magical. I am absolutely blown away by how well-designed and user-friendly it is.",
    quoteKey: "quotes.5",
    originalLanguage: 'en',
    name: "Shaon Khan",
    source: QuoteSource.Email,
    link: "message:<CAFj72xngJzJz8dvOx4pzL+QZTG97dSeuJ0QQwEmETJ67eGzrbQ@mail.gmail.com>",
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "Cannot imagine using my office Mac without this software. Real productivity booster paired with my evoluent vertical mouse which does not have a driver for Mac like they do for Windows.",
    quoteKey: "quotes.6",
    originalLanguage: 'en',
    name: "abhimadav",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Thanks for this AMAZING software. 10/10!",
    quoteKey: "quotes.7",
    originalLanguage: 'en',
    name: "Timon Weides",
    source: QuoteSource.Email,
    link: 'message:<21D82608-53B7-4A72-AD52-E650FF0FED20@live.de>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Probably the best app on my Mac",
    quoteKey: "quotes.8",
    originalLanguage: 'en',
    name: "SaMaY-69",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/273',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "No other similar utility can compete",
    quoteKey: "quotes.9",
    originalLanguage: 'en',
    name: "5silentrain",
    source: QuoteSource.Email,
    link: 'message:<CAB+S4pXD+RP3OYxENZXa_+NWLmJBB1Uqf1_Z9xKLqRy=-QaTJg@mail.gmail.com>',
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "A must have app for any Mac user with a mouse.",
    quoteKey: "quotes.10",
    originalLanguage: 'en',
    name: "4332weizi",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "You just saved me from spending money on the MX Master.",
    quoteKey: "quotes.11",
    originalLanguage: 'en',
    name: "Andreea",
    source: QuoteSource.Email,
    link: 'message:<D50495F3-3F30-4159-A09E-9373A9F40777@gmail.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "This has nearly doubled my productivity.",
    quoteKey: "quotes.12",
    originalLanguage: 'en',
    name: "holdingsllc",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/419',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "The UI and gestures are so intuitive.",
    quoteKey: "quotes.13",
    originalLanguage: 'en',
    name: "Laurynas Tumosa",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634236926.25936@paypal.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Love this app so much, it's a must-have!",
    quoteKey: "quotes.14",
    originalLanguage: 'en',
    name: "LinusGeffarth",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/297#issuecomment-1211926291',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Your app is incredible and absolutely vital to my workflow. I literally can't use my mac without MMF.",
    quoteKey: "quotes.15",
    originalLanguage: 'en',
    name: "ar311krypton",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/369',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Mac Mouse Fix is the single most important Mac app for me. It feels incredibly polished.",
    quoteKey: "quotes.16",
    originalLanguage: 'en',
    name: "Florian Schmidt",
    source: QuoteSource.PayPalDonation,
    link: 'message:<94.9D.24537.7D594A26@ccg01mail03>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Mac Mouse Fix is the best in its class!",
    quoteKey: "quotes.17",
    originalLanguage: 'en',
    name: "ib0ndar",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "The vertical scroll is just awesome",
    quoteKey: "quotes.18",
    originalLanguage: 'en',
    name: "nickcolea",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Click & drag for switching between the screens feels so native.",
    quoteKey: "quotes.19",
    originalLanguage: 'en',
    name: "Lazar Manasijević",
    source: QuoteSource.Email,
    link: 'message:<BDF0E117-B5BB-4E3E-9CD5-C1DE163F7F02@gmail.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "I've been wanting to get rid of my Magic Mouse for a while and because of your app, I can do just that!",
    quoteKey: "quotes.20",
    originalLanguage: 'en',
    name: "Zach Taffet",
    source: QuoteSource.PayPalDonation,
    link: 'message:<E2.BB.41759.B545C736@ccg13mail04>',
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "I recommend Mac Mouse Fix, honestly it’s the cheapest, simple, and most well coded app I have yet seen.",
    quoteKey: "quotes.21",
    originalLanguage: 'en',
    name: "Rafiq_Kobayashi",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/MacOS/comments/y9q18r/comment/it80ce6/?utm_source=share&utm_medium=web2x&context=3',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Thank you, saved me from buying an apple mouse",
    quoteKey: "quotes.22",
    originalLanguage: 'en',
    name: "João Santos",
    source: QuoteSource.PayPalDonation,
    link: 'message:<5E.65.01822.93ADD426@ccg01mail02>',
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "The UI in V2 is fantastic and very intuitive.",
    quoteKey: "quotes.23",
    originalLanguage: 'en',
    name: "nghtstr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/135',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "I spent last week without it and my whole workflow was interrupted. Thank you for such a brilliant app.",
    quoteKey: "quotes.24",
    originalLanguage: 'en',
    name: "nianiam",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "I really appreciate the simplicity it brings.",
    quoteKey: "quotes.25",
    originalLanguage: 'en',
    name: "chamburr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/150',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "After switching to a mouse, I tried software such as SteerMouse, which received many recommendations and even charges, and finally found that this software meets my needs perfectly, every feature is very useful, and the performance is very good!",
    quoteKey: "quotes.26",
    originalLanguage: 'en',
    name: "SamyukL",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/449',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Awesome app, it definitely deserves to be shared widely with others 😁",
    quoteKey: "quotes.27",
    originalLanguage: 'en',
    name: "Jeff Su",
    source: QuoteSource.YoutubeComment,
    link: 'https://www.youtube.com/watch?v=gkYNdy-Hig4',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "This App Makes Your Cheap Mouse Work Better Than Trackpad Gestures",
    quoteKey: "quotes.28",
    originalLanguage: 'en',
    name: "Pranay Parab",
    source: QuoteSource.Lifehacker,
    link: 'https://lifehacker.com/this-app-makes-your-cheap-mouse-work-better-than-trackp-1848416099',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "This is the single greatest piece of software in Apple's history.",
    quoteKey: "quotes.29",
    originalLanguage: 'en',
    name: "Michael Hicklen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<13.9C.09725.38CA7836@ccg01mail05>',
    permission: PermissionToShare.Granted,
    weight: 0,
  },
  {
    quote: "This is great software and solved all my mouse issues.",
    quoteKey: "quotes.30",
    originalLanguage: 'en',
    name: "Mladen Mihajlovic",
    source: QuoteSource.StackExchange,
    link: 'https://superuser.com/a/1699506',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Utterly incredible software, bro :) so simple yet so functional. keep up the good work.",
    quoteKey: "quotes.31",
    originalLanguage: 'en',
    name: "Osman Keshawarz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<36.97.42814.18522A36@ccg01mail04>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Your app is literally the best Mac Mouse Fix available. So simple, light, M1 compatible, no bugs. I’m totally in love. I don’t even use Logitech Hub as your app is far superior. I’ll definitely be recommending your app as much as possible.",
    quoteKey: "quotes.32",
    originalLanguage: 'en',
    name: "Marvin Marker",
    source: QuoteSource.PayPalDonation,
    link: 'message:<221C5A7A-5754-4B3E-A74A-04EC3694772E@gmail.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "It's exact what I was looking for to make non-Apple-Mice work like I want ",
    quoteKey: "quotes.33",
    originalLanguage: 'en',
    name: "Wolf Spalteholz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<59.33.32745.E2035526@ccg13mail04>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "This software is amazing!",
    quoteKey: "quotes.34",
    originalLanguage: 'en',
    name: "NicolaeS",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371342/308049',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Thanks, the app is very cool",
    quoteKey: "quotes.35",
    originalLanguage: 'en',
    name: "danilinus",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/393',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "SUPER NICE APPLICATION",
    quoteKey: "quotes.36",
    originalLanguage: 'en',
    name: "Chien Wei Chek",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/136',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "It works perfectly with my mouse",
    quoteKey: "quotes.37",
    originalLanguage: 'en',
    name: "wnavarrobr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/455',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Works so well! Great idea and implementation, and of course the design, in the best Apple traditions!",
    quoteKey: "quotes.38",
    originalLanguage: 'en',
    name: "Dzhakhongir Normatov",
    source: QuoteSource.Email,
    link: 'message:<280189B0-BC31-4E89-907C-46FBFB584E38@icloud.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Many thanks for Mac Mouse Fix—it’s become an essential tool for me, and of all of the programs of this type I’ve found, it’s easily the best.",
    quoteKey: "quotes.39",
    originalLanguage: 'en',
    name: "David Isom",
    source: QuoteSource.Email,
    link: 'message:<E344087D-7575-4253-B310-D127CC9F4A99@me.com>',
    permission: PermissionToShare.Denied,
    weight: 0,
  },
  {
    quote: "Thank you for Mac Mouse Fix! I love it. You're doing what Apple didn't =)",
    quoteKey: "quotes.40",
    originalLanguage: 'en',
    name: "Fernanda",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634211506.4537@paypal.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Great app! Love the simplicity and it works like a charm! Thanx :)",
    quoteKey: "quotes.41",
    originalLanguage: 'en',
    name: "Peter Leijenhorst",
    source: QuoteSource.PayPalDonation,
    link: 'message:<49.05.55471.3D245B36@ccg01mail03>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "You are an absolute legend thank you so much for creating this app, it's literally perfect",
    quoteKey: "quotes.42",
    originalLanguage: 'en',
    name: "Herta Gatter",
    source: QuoteSource.PayPalDonation,
    link: 'message:<67.68.63016.6BAA3D36@ccg01mail02>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Thanks for your awesome app its just wonderful :).",
    quoteKey: "quotes.43",
    originalLanguage: 'en',
    name: "Marvin Pärli",
    source: QuoteSource.PayPalDonation,
    link: 'message:<9C61D7F1-CABE-4851-8F29-AE04AF932140@icloud.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  },
  {
    quote: "Your tool is literally the only way how I can use macOS (with a mouse especially) without freaking out!",
    quoteKey: "quotes.44",
    originalLanguage: 'en',
    name: "BlackBird11",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/414',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Beautiful piece of libre software. Thank you for your contribution to the open source cause.",
    quoteKey: "quotes.45",
    originalLanguage: 'en',
    name: "yonitubul",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "Thank you for this, i don't understand why apple didn't make this as default, like it's super intuitive doing gestures with the middle click.",
    quoteKey: "quotes.46",
    originalLanguage: 'en',
    name: "couch_ech",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 0,
  },
  {
    quote: "我找了半天类似的应用，终于发现这个了，赞👍",
    quoteKey: "quotes.47",
    originalLanguage: 'zh',
    name: "imzhuhl",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/25',
    permission: PermissionToShare.None,
    weight: 0,
  },
]

/*
  {
    quote: "",
    name: "",
    source: QuoteSource.,
    link: '',
    permission: PermissionToShare.
  },
  */