/* 

Note:
- This file used to be .ts but we had to convert it to .js to make it easily accessible from our quotesTool.mjs node script.
- However we could achieve equivalent 'type safety' in pure .js which is nice.

*/

export { QuoteSource, PermissionToShare, QuoteData, getUIStrings, getThankYouText, getExpandButtonText, quoteSourceIsPublic, getUsableQuotes}

function getLocalizationFunctions() {

  /* Import helper
      Note: I feel like we're doing this in a stupid way.
  */

  const app = useNuxtApp();
  const { $coolI18n: { mdrf, _localizedString, MFLocalizedString } } = app;

  return { mdrf, _localizedString, MFLocalizedString }
}

/* Define Quote types and helper functions */

const inactive = (...items) => []; // General helper function for deactivating elements in an array literal. Use like this: ...inactive(element1, element2).

const QuoteSource = Object.freeze ({
  Email            : Symbol('Email'),
  PayPalDonation   : Symbol('PayPalDonation'),
  GitHub           : Symbol('GitHub'),
  StackExchange    : Symbol('StackExchange'),
  Reddit           : Symbol('Reddit'),
  Lifehacker       : Symbol('Lifehacker'),
  YoutubeComment   : Symbol('YoutubeComment'),
  Acknowledgements : Symbol('Acknowledgements'),
})

function quoteSourceIsPublic(quoteSource) {

  if (!Object.values(QuoteSource).includes(quoteSource)) {
    throw new TypeError(`Unknown QuoteSource ${ quoteSource }`)
  }

  return  quoteSource != QuoteSource.Email 
          && quoteSource != QuoteSource.PayPalDonation
}

const PermissionToShare = {

  // Notes:
  //   What is the difference between None and Unrequested?
  //   -> They're kind of the same, Unrequested was sort of a "note-to-self: Request this one", which was intended to be used with non-public quoteSource's

  None            : 'none',
  Unrequested     : 'unrequested',
  Requested       : 'requested',
  Denied          : 'denied',
  Granted         : 'granted',
}
function quoteIsSharable(quote) {
  
  const work = (quote) => {
    if (quote.permission == PermissionToShare.None)         { return quoteSourceIsPublic(quote.source) }
    if (quote.permission == PermissionToShare.Unrequested)  { return quoteSourceIsPublic(quote.source) }
    if (quote.permission == PermissionToShare.Requested)    { return false }
    if (quote.permission == PermissionToShare.Denied)       { return false }
    if (quote.permission == PermissionToShare.Granted)      { return true }
    
    console.assert(false, `Found quote with unknown permission value: ${ quote.permission }`)
    throw new TypeError(`Unknown permission: ${ quote.permission }`)

    return false
  }

  const result = work(quote)

  if (result == false) { // Debugging
    // console.debug(`Quote ${quote.quoteKey} is not sharable.`)
  }

  return result
}

class QuoteData {
  constructor({originalQuote, englishQuote, quoteKey, originalLanguage, name, source, link, permission, weight}) {
    
    // Validate required values
    var requiredValues = typeof englishQuote === 'string'
                          && typeof quoteKey === 'string'
                          && typeof originalLanguage === 'string'
                          && typeof name === 'string'
                          && Object.values(QuoteSource).includes(source)
                          && typeof link === 'string'
                          && Object.values(PermissionToShare).includes(permission)
                          && typeof weight === 'number';

    if (!requiredValues) {
      throw new TypeError(`ERROR: Quote ${quoteKey} is missing required values.`)
    }

    // Validate originalLanguage stuff
    if (originalLanguage != 'en') {
      if (typeof originalQuote ==! 'string') {
        throw new TypeError(`ERROR: Quote ${quoteKey} is not originally in English, yet doesn't have originalLanguage field`)
      }
    } else {
      if (originalQuote) {
        throw new TypeError(`ERROR: Quote ${quoteKey} is originally in English, yet has originalLanguage field`)
      }
    }

    // Validate permission
    if (permission == PermissionToShare.Unrequested && quoteSourceIsPublic(source)) {
      throw new TypeError(`ERROR: Quote ${quoteKey} source is public (${source}), yet its state is Unrequested.`)
    }

    // Store values
    this.originalQuote = originalQuote;
    this.englishQuote = englishQuote;
    this.quoteKey = quoteKey;
    this.originalLanguage = originalLanguage;
    this.name = name;
    this.source = source;
    this.link = link;
    this.permission = permission;
    this.weight = weight;
  }
  
}

/* Helper functions */

function getUsableQuotes() { 
  
  // Notes:
  // - This is the main interface for getting the quotes.
  // - Returns QuoteData objects

  var result = quotes
                    .filter((quote) => quoteIsSharable(quote))
                    .toSorted((a, b) => b.weight - a.weight)
  return result
}

/* String Generator */

function getExpandButtonText(quotesAreExpanded) { 
  /// Note: We put all quotes.[...] strings into quotes.js so they get extracted into Quotes.xcstrings by our python script.

  const { MFLocalizedString } = getLocalizationFunctions()

  if (!quotesAreExpanded)
    return MFLocalizedString(`See More`, 'quotes.see-more', 'Label for a button that lets you see more quotes from Mac Mouse Fix users.')
  else
    return MFLocalizedString(`See Less`, 'quotes.see-less', '')
}

function getThankYouText() {
  const { mdrf, MFLocalizedString, } = getLocalizationFunctions()
  return mdrf(MFLocalizedString(
    `
    **Thank you** to everyone sharing their appreciation and feedback over the years! Reading your nice messages is always motivating **:)**
    `, 
    'quotes.thankyou', 
    ''
  ))
}

function getUIStrings(quote, localeCode) {

  /* 
    Notes:
    - I'm not sure passing in `localeCode` serves any purpose.
  */

  /* Import */
  const { mdrf, _localizedString, MFLocalizedString, } = getLocalizationFunctions()

  /* Get quote ui string */

  // Setup
  var uiQuote = '';
  var isUsingTranslation = true;

  // Try to get translation
  //  Note: We use _localizedString instead of MFLocalizedString, since the quotes are extracted from the source code through quotestool.mjs instead of through regexing over the source code. (MFLocalizedString is what we regex for.)
  uiQuote = _localizedString(quote.quoteKey, localeCode);

  // Log
  // console.debug(`UI ${uiQuote}, en: ${ quote.englishQuote }, og: ${ quote.originalQuote} `)
  
  /* Determine isUsingTranslation */
  const ogQuote = quote.originalLanguage == 'en' ? quote.englishQuote : quote.originalQuote;
  if (uiQuote == ogQuote) {
    isUsingTranslation = false;
  }

  /* 
    Get quote SOURCE ui string 
    Notes: 
    - Is it a problem that we don't pass MFLocalizedString() the localeCode like we do for _localizedString() ? 
  */
  
  var uiSource
  switch (quote.source) {
          case QuoteSource.Acknowledgements  : uiSource = mdrf(MFLocalizedString(
            '**{name}** in a Gumroad donation message', 
            'quotes.source.acknowledgements',  
            'The "quote.source.[...]" strings are displayed directly below the quotes themselves. "{name}" is replaced with the name of the author of the quote.'), 
            { name: quote.name }, true)
  break;  case QuoteSource.Email             : uiSource = mdrf(MFLocalizedString('**{name}** in an email', 'quotes.source.email', ''), { name: quote.name }, true)
  break;  case QuoteSource.PayPalDonation    : uiSource = mdrf(MFLocalizedString('**{name}** in a PayPal donation message',  'quotes.source.payPalDonation',    ''), { name: quote.name }, true)
  break;  case QuoteSource.GitHub            : uiSource = mdrf(MFLocalizedString('**{name}** on GitHub',                     'quotes.source.gitHub',            ''), { name: quote.name }, true)
  break;  case QuoteSource.StackExchange     : uiSource = mdrf(MFLocalizedString('**{name}** on Stack Exchange',             'quotes.source.stackExchange',     ''), { name: quote.name }, true)
  break;  case QuoteSource.Reddit            : uiSource = mdrf(MFLocalizedString('**{name}** on Reddit',                     'quotes.source.reddit',            ''), { name: quote.name }, true)
  break;  case QuoteSource.Lifehacker        : uiSource = mdrf(MFLocalizedString('**{name}** in a LifeHacker article',       'quotes.source.lifehacker',        ''), { name: quote.name }, true)
  break;  case QuoteSource.YoutubeComment    : uiSource = mdrf(MFLocalizedString('**{name}** in a YouTube comment',          'quotes.source.youtubeComment',    ''), { name: quote.name }, true)
  }
  // Add disclaimer 
  if (isUsingTranslation) {
    var disclaimer;
    switch (quote.originalLanguage) {
            case 'en': disclaimer = MFLocalizedString('Translated from English', 'quotes.translation-disclaimer.en', 'This is shown below translated quotes that were originally in English')
    break;  case 'zh': disclaimer = MFLocalizedString('Translated from Chinese', 'quotes.translation-disclaimer.zh', 'This is shown below translated quotes that were originally in Chinese')
    }
    uiSource = `${ uiSource } (${ disclaimer })`;
  }

  /* Return */
  return { quote: uiQuote, source: uiSource };
}

/* Define Quotes */

const quotes = [ // QuoteData objects

  /*
    Design consideration:
      The first and last quotes are probably the most 'visible'. I tend to skim over the ones in the middle. At the end we can hide some more quirky or interesting ones.
  */

  new QuoteData ({
    englishQuote: "Among all apps that try to fix this problem, this one is undoubtly the best!",
    quoteKey: "quotes.0",
    originalLanguage: 'en',
    name: "tomatsaev",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/34',
    permission: PermissionToShare.None,
    weight: 101,
  }),
  new QuoteData ({
    englishQuote: "Mac Mouse Fix is literally everything you could want in your experience of using a mouse with OSX.",
    quoteKey: "quotes.1",
    originalLanguage: 'en',
    name: "William Park",
    source: QuoteSource.PayPalDonation,
    link: 'message:<3B.AC.57749.F6B6C326@ccg13mail02>',
    permission: PermissionToShare.Granted,
    weight: 175,
  }),
  new QuoteData ({
    englishQuote: "Works like a charm and it's easy to set up!",
    quoteKey: "quotes.2",
    originalLanguage: 'en',
    name: "Tomáš Nesrovnal",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371330/308049',
    permission: PermissionToShare.None,
    weight: 140,
  }),
  new QuoteData ({
    englishQuote: "This is the best mouse software on the Mac.",
    quoteKey: "quotes.3",
    originalLanguage: 'en',
    name: "samueljim",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/105',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Thank you for the amazing app in Mac Mouse Fix. Just what I needed, no subscription and no bloat. Thank you so much!",
    quoteKey: "quotes.4",
    originalLanguage: 'en',
    name: "Erik Svendsen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<04.52.53548.372FA446@ccg13mail05>',
    permission: PermissionToShare.Granted,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Mac Mouse Fix is magical. I am absolutely blown away by how well-designed and user-friendly it is.",
    quoteKey: "quotes.5",
    originalLanguage: 'en',
    name: "Shaon Khan",
    source: QuoteSource.Email,
    link: "message:<CAFj72xngJzJz8dvOx4pzL+QZTG97dSeuJ0QQwEmETJ67eGzrbQ@mail.gmail.com>",
    permission: PermissionToShare.Granted,
    weight: 200,
  }),
  new QuoteData ({
    englishQuote: "Cannot imagine using my office Mac without this software. Real productivity booster paired with my evoluent vertical mouse which does not have a driver for Mac like they do for Windows.",
    quoteKey: "quotes.6",
    originalLanguage: 'en',
    name: "abhimadav",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 142.5, // Note: [Mar 2025] sort of a replacement for quotes.32, since that one's really long, and it feels weird if they're all super short.
  }),
  new QuoteData ({
    englishQuote: "Thanks for this AMAZING software. 10/10!",
    quoteKey: "quotes.7",
    originalLanguage: 'en',
    name: "Timon Weides",
    source: QuoteSource.Email,
    link: 'message:<21D82608-53B7-4A72-AD52-E650FF0FED20@live.de>',
    permission: PermissionToShare.Requested,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Probably the best app on my Mac",
    quoteKey: "quotes.8",
    originalLanguage: 'en',
    name: "SaMaY-69",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/273',
    permission: PermissionToShare.None,
    weight: 199,
  }),
  new QuoteData ({
    englishQuote: "No other similar utility can compete",
    quoteKey: "quotes.9",
    originalLanguage: 'en',
    name: "5silentrain",
    source: QuoteSource.Email,
    link: 'message:<CAB+S4pXD+RP3OYxENZXa_+NWLmJBB1Uqf1_Z9xKLqRy=-QaTJg@mail.gmail.com>',
    permission: PermissionToShare.Granted,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "A must have app for any Mac user with a mouse.",
    quoteKey: "quotes.10",
    originalLanguage: 'en',
    name: "4332weizi",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None,
    weight: 170,
  }),
  new QuoteData ({
    englishQuote: "You just saved me from spending money on the MX Master.",
    quoteKey: "quotes.11",
    originalLanguage: 'en',
    name: "Andreea",
    source: QuoteSource.Email,
    link: 'message:<D50495F3-3F30-4159-A09E-9373A9F40777@gmail.com>',
    permission: PermissionToShare.Requested,
    weight: 145,
  }),
  new QuoteData ({
    englishQuote: "This has nearly doubled my productivity.",
    quoteKey: "quotes.12",
    originalLanguage: 'en',
    name: "holdingsllc",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/419',
    permission: PermissionToShare.None,
    weight: 180,
  }),
  new QuoteData ({
    englishQuote: "The UI and gestures are so intuitive.",
    quoteKey: "quotes.13",
    originalLanguage: 'en',
    name: "Laurynas Tumosa",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634236926.25936@paypal.com>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Love this app so much, it's a must-have!",
    quoteKey: "quotes.14",
    originalLanguage: 'en',
    name: "LinusGeffarth",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/297#issuecomment-1211926291',
    permission: PermissionToShare.None,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Your app is incredible and absolutely vital to my workflow.",
    quoteKey: "quotes.15",
    originalLanguage: 'en',
    name: "ar311krypton",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/369',
    permission: PermissionToShare.None,
    weight: 160,
  }),
  new QuoteData ({
    englishQuote: "Mac Mouse Fix is the single most important Mac app for me. It feels incredibly polished.",
    quoteKey: "quotes.16",
    originalLanguage: 'en',
    name: "Florian Schmidt",
    source: QuoteSource.PayPalDonation,
    link: 'message:<94.9D.24537.7D594A26@ccg01mail03>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Mac Mouse Fix is the best in its class!",
    quoteKey: "quotes.17",
    originalLanguage: 'en',
    name: "ib0ndar",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "The vertical scroll is just awesome",
    quoteKey: "quotes.18",
    originalLanguage: 'en',
    name: "nickcolea",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None,
    weight: 150,
  }),
  new QuoteData ({
    englishQuote: "Click & drag for switching between the screens feels so native.",
    quoteKey: "quotes.19",
    originalLanguage: 'en',
    name: "Lazar Manasijević",
    source: QuoteSource.Email,
    link: 'message:<BDF0E117-B5BB-4E3E-9CD5-C1DE163F7F02@gmail.com>',
    permission: PermissionToShare.Granted,
    weight: 102,
  }),
  new QuoteData ({
    englishQuote: "I've been wanting to get rid of my Magic Mouse for a while and because of your app, I can do just that!",
    quoteKey: "quotes.20",
    originalLanguage: 'en',
    name: "Zach Taffet",
    source: QuoteSource.PayPalDonation,
    link: 'message:<E2.BB.41759.B545C736@ccg13mail04>',
    permission: PermissionToShare.Granted,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "I recommend Mac Mouse Fix, honestly it’s the cheapest, simple, and most well coded app I have yet seen.",
    quoteKey: "quotes.21",
    originalLanguage: 'en',
    name: "Rafiq_Kobayashi",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/MacOS/comments/y9q18r/comment/it80ce6/?utm_source=share&utm_medium=web2x&context=3',
    permission: PermissionToShare.None,
    weight: 100.9,
  }),
  new QuoteData ({
    englishQuote: "Thank you, saved me from buying an apple mouse",
    quoteKey: "quotes.22",
    originalLanguage: 'en',
    name: "João Santos",
    source: QuoteSource.PayPalDonation,
    link: 'message:<5E.65.01822.93ADD426@ccg01mail02>',
    permission: PermissionToShare.Granted,
    weight: 101,
  }),
  new QuoteData ({
    englishQuote: "The UI in V2 is fantastic and very intuitive.",
    quoteKey: "quotes.23",
    originalLanguage: 'en',
    name: "nghtstr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/135',
    permission: PermissionToShare.None,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "I spent last week without it and my whole workflow was interrupted. Thank you for such a brilliant app.",
    quoteKey: "quotes.24",
    originalLanguage: 'en',
    name: "nianiam",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "I really appreciate the simplicity it brings.",
    quoteKey: "quotes.25",
    originalLanguage: 'en',
    name: "chamburr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/150',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "After switching to a mouse, I tried software such as SteerMouse, which received many recommendations and even charges, and finally found that this software meets my needs perfectly, every feature is very useful, and the performance is very good!",
    quoteKey: "quotes.26",
    originalLanguage: 'en',
    name: "SamyukL",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/449',
    permission: PermissionToShare.None,
    weight: -1,
  }),
  new QuoteData ({
    englishQuote: "Awesome app, it definitely deserves to be shared widely with others 😁",
    quoteKey: "quotes.27",
    originalLanguage: 'en',
    name: "Jeff Su",
    source: QuoteSource.YoutubeComment,
    link: 'https://www.youtube.com/watch?v=gkYNdy-Hig4',
    permission: PermissionToShare.None,
    weight: -200,
  }),
  new QuoteData ({
    englishQuote: "This App Makes Your Cheap Mouse Work Better Than Trackpad Gestures",
    quoteKey: "quotes.28",
    originalLanguage: 'en',
    name: "Pranay Parab",
    source: QuoteSource.Lifehacker,
    link: 'https://lifehacker.com/this-app-makes-your-cheap-mouse-work-better-than-trackp-1848416099',
    permission: PermissionToShare.None,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "This is the single greatest piece of software in Apple's history.",
    quoteKey: "quotes.29",
    originalLanguage: 'en',
    name: "Michael Hicklen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<13.9C.09725.38CA7836@ccg01mail05>',
    permission: PermissionToShare.Granted,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "This is great software and solved all my mouse issues.",
    quoteKey: "quotes.30",
    originalLanguage: 'en',
    name: "Mladen Mihajlovic",
    source: QuoteSource.StackExchange,
    link: 'https://superuser.com/a/1699506',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({ // Note: [Mar 2025] We could perhaps use this to replace quotes.32 (which we don't have express permission to share) since this also mentions that the app is 'simple'.
    englishQuote: "Utterly incredible software, bro :) so simple yet so functional. keep up the good work.",
    quoteKey: "quotes.31",
    originalLanguage: 'en',
    name: "Osman Keshawarz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<36.97.42814.18522A36@ccg01mail04>',
    permission: PermissionToShare.Requested,
    weight: 101,
  }),
  new QuoteData ({ // Note: [Mar 2025] We used to show this prominently, but we don't have express permission to share. It's the only quote mentioning 'light' so we don't have a great replacement. Perhaps we should search for another quote in our Email/GitHub? Edit: quotes.26 mentions 'performance'. 
    englishQuote: "Your app is literally the best Mac Mouse Fix available. So simple, light, M1 compatible, no bugs. I’m totally in love. I don’t even use Logitech Hub as your app is far superior. I’ll definitely be recommending your app as much as possible.",
    quoteKey: "quotes.32",
    originalLanguage: 'en',
    name: "Marvin Marker",
    source: QuoteSource.PayPalDonation,
    link: 'message:<221C5A7A-5754-4B3E-A74A-04EC3694772E@gmail.com>',
    permission: PermissionToShare.Requested,
    weight: 142.5,
  }),
  new QuoteData ({
    englishQuote: "It's exact what I was looking for to make non-Apple-Mice work like I want ",
    quoteKey: "quotes.33",
    originalLanguage: 'en',
    name: "Wolf Spalteholz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<59.33.32745.E2035526@ccg13mail04>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "This software is amazing!",
    quoteKey: "quotes.34",
    originalLanguage: 'en',
    name: "NicolaeS",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371342/308049',
    permission: PermissionToShare.None,
    weight: 101.5,
  }),
  new QuoteData ({
    englishQuote: "Thanks, the app is very cool",
    quoteKey: "quotes.35",
    originalLanguage: 'en',
    name: "danilinus",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/393',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "SUPER NICE APPLICATION",
    quoteKey: "quotes.36",
    originalLanguage: 'en',
    name: "Chien Wei Chek",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/136',
    permission: PermissionToShare.None,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "It works perfectly with my mouse",
    quoteKey: "quotes.37",
    originalLanguage: 'en',
    name: "wnavarrobr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/455',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Works so well! Great idea and implementation, and of course the design, in the best Apple traditions!",
    quoteKey: "quotes.38",
    originalLanguage: 'en',
    name: "Dzhakhongir Normatov",
    source: QuoteSource.Email,
    link: 'message:<280189B0-BC31-4E89-907C-46FBFB584E38@icloud.com>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Many thanks for Mac Mouse Fix—it’s become an essential tool for me, and of all of the programs of this type I’ve found, it’s easily the best.",
    quoteKey: "quotes.39",
    originalLanguage: 'en',
    name: "David Isom",
    source: QuoteSource.Email,
    link: 'message:<E344087D-7575-4253-B310-D127CC9F4A99@me.com>',
    permission: PermissionToShare.Denied,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Thank you for Mac Mouse Fix! I love it. You're doing what Apple didn't =)",
    quoteKey: "quotes.40",
    originalLanguage: 'en',
    name: "Fernanda",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634211506.4537@paypal.com>',
    permission: PermissionToShare.Requested,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Great app! Love the simplicity and it works like a charm! Thanx :)",
    quoteKey: "quotes.41",
    originalLanguage: 'en',
    name: "Peter Leijenhorst",
    source: QuoteSource.PayPalDonation,
    link: 'message:<49.05.55471.3D245B36@ccg01mail03>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "You are an absolute legend thank you so much for creating this app, it's literally perfect",
    quoteKey: "quotes.42",
    originalLanguage: 'en',
    name: "Herta Gatter",
    source: QuoteSource.PayPalDonation,
    link: 'message:<67.68.63016.6BAA3D36@ccg01mail02>',
    permission: PermissionToShare.Requested,
    weight: -100,
  }),
  new QuoteData ({
    englishQuote: "Thanks for your awesome app its just wonderful :).",
    quoteKey: "quotes.43",
    originalLanguage: 'en',
    name: "Marvin P.",
    source: QuoteSource.PayPalDonation,
    link: 'message:<9C61D7F1-CABE-4851-8F29-AE04AF932140@icloud.com>',
    permission: PermissionToShare.Requested,
    weight: -200,
  }),
  new QuoteData ({
    englishQuote: "Your tool is literally the only way how I can use macOS (with a mouse especially) without freaking out!",
    quoteKey: "quotes.44",
    originalLanguage: 'en',
    name: "BlackBird11",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/414',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Beautiful piece of libre software. Thank you for your contribution to the open source cause.",
    quoteKey: "quotes.45",
    originalLanguage: 'en',
    name: "yonitubul",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Thank you for this, i don't understand why apple didn't make this as default, like it's super intuitive doing gestures with the middle click.",
    quoteKey: "quotes.46",
    originalLanguage: 'en',
    name: "couch_ech",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    originalQuote: "我找了半天类似的应用，终于发现这个了，赞👍",
    englishQuote: "I've been searching for a similar app for a long time, and finally found this one, thumbs up 👍.",
    quoteKey: "quotes.47",
    originalLanguage: 'zh',
    name: "imzhuhl",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/25',
    permission: PermissionToShare.None,
    weight: 0,
  }),
  new QuoteData ({
    // Notes: 
    //  - [Mar 2025] Potential replacement for quotes.11 – it's short and mentions replacing the MX Master (Mention specific products makes it more memorable/less abstract I guess?) (we don't have express permission to share quotes.11)
    //  - [Mar 2025] Downside: The superlight is very expensive and Brendon says it has a mushy/fragile scroll wheel and that he's using a finalmouse ulx now (also expensive). So perhaps we shouldn't be promoting the superlight.

    englishQuote: "You've made my superlight better than an mx master.", 
    quoteKey: "quotes.48",
    originalLanguage: 'en',
    name: "Brendon Janku",
    source: QuoteSource.Email,
    link: 'message:<CAMbYH-qmh-ib65wqiFVJW8CpmvJTqHZSG_YwoySc5cnvKSSO-w@mail.gmail.com>',
    permission: PermissionToShare.Granted,
    weight: 1,
  }),
  new QuoteData ({
    englishQuote: "This app is so f*cking good", // TODO: Translate and request this one
    quoteKey: "quotes.49",
    originalLanguage: 'en',
    name: "Brendon Janku",
    source: QuoteSource.Email,
    link: 'message:<CAMbYH-qmh-ib65wqiFVJW8CpmvJTqHZSG_YwoySc5cnvKSSO-w@mail.gmail.com>',
    permission: PermissionToShare.Unrequested,
    weight: 0,
  }),

  ...inactive(
    // vvv 50 and 51 don't feel right to share I think. I think the Acknowledgements should just be a little secret not used for marketing.
    new QuoteData ({
      englishQuote: "Noah you made my cheap mouse MAGICal without buying APPLE's Magic Mouse!!!! Congratz", // TODO: Translate and request this one
      quoteKey: "quotes.50",
      originalLanguage: 'en',
      name: "Periklis Petridis",
      source: QuoteSource.Acknowledgements,
      link: 'https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md#-very-generous-contributors',
      permission: PermissionToShare.None,
      weight: 0,
    }),
    new QuoteData ({
      englishQuote: "This beautiful piece of software turned a cheap mouse into a great mouse, which I even started preferring over my MX Master. Thank you Noah and keep making awesome stuff! Much love, Markus ❤️", // TODO: Translate and request this one
      quoteKey: "quotes.51",
      originalLanguage: 'en',
      name: "Markus Leonhard",
      source: QuoteSource.Acknowledgements,
      link: 'https://github.com/noah-nuebling/mac-mouse-fix/blob/master/Acknowledgements.md#-very-generous-contributors',
      permission: PermissionToShare.None,
      weight: 0,
    })
  ),
  new QuoteData ({
    englishQuote: "Input devices are important. You fixed it. Makes all the difference. ❤️ from Sweden.", // TODO: Translate and request this one
    quoteKey: "quotes.52",
    originalLanguage: 'en',
    name: "Stefan",             /* Note: Maybe it's better not to include their last names – even if it's only in the source – before they've granted permission to share. */
    source: QuoteSource.Email,
    link: 'message:<367F5FF6-F2F1-45AB-8AB5-CEC419B08A2F@live.com>',
    permission: PermissionToShare.Unrequested,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "AWESOME SHIT !!!! Greetings from Granada Spain, keeping it simple, cheap, dope and nice.", // TODO: Translate and request this one
    quoteKey: "quotes.53",
    originalLanguage: 'en',
    name: "Alfonso",
    source: QuoteSource.Email,
    link: 'message:<0E9E6E86-0284-42DA-9A6B-753A2918EDB2@gmail.com>',
    permission: PermissionToShare.Unrequested,
    weight: 0,
  }),
  new QuoteData ({
    englishQuote: "Amazing product! Absolutely love it! My Logitech trackball is like an extension of me now.",
    quoteKey: "quotes.54", 
    originalLanguage: 'en', 
    name: 'Andriy Babkin',
    source: QuoteSource.Email,
    link: 'message:<ED1D1358-1F14-4152-8A35-A345A63DF1D4@gmail.com>',
    permission: PermissionToShare.Granted,
    weight: 142.6, // Note: [Mar 2025] Potential replacement for quotes.11. (Also mentions specific Logitech product.)
  })
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