
export { type QuoteSource, type PermissionToShare, type QuoteData, getUIStringForQuoteSource as getQuoteSourceString, quoteSourceIsPublic, quotes}

/* Define Quote types */

enum QuoteSource {
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
  name: string,
  source: QuoteSource,
  link: string,
  permission: PermissionToShare,
}

/* Helper functions */

function quoteSourceIsPublic(source: QuoteSource) {
  return source != QuoteSource.Email && source != QuoteSource.PayPalDonation
}

/* String Generator */

function getUIStringForQuoteSource(source: QuoteSource, name: string) {

  const localizationKey: string = source

  const result = $mt(localizationKey, { name: name } )

  return result
}

/* Define Quotes */

const quotes: QuoteData[] = [


  /* Tier 1 */

  {
    quote: "This has nearly doubled my productivity.",
    name: "holdingsllc",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/419',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is the single most important Mac app for me. It feels incredibly polished.",
    name: "Florian Schmidt",
    source: QuoteSource.PayPalDonation,
    link: 'message:<94.9D.24537.7D594A26@ccg01mail03>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Click & drag for switching between the screens feels so native.",
    name: "Lazar Manasijević",
    source: QuoteSource.Email,
    link: 'message:<BDF0E117-B5BB-4E3E-9CD5-C1DE163F7F02@gmail.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "You just saved me from spending money on the MX Master.",
    name: "Andreea",
    source: QuoteSource.Email,
    link: 'message:<D50495F3-3F30-4159-A09E-9373A9F40777@gmail.com>',
    permission: PermissionToShare.Requested,
  },
  {
    quote: "A must have app for any Mac user with a mouse.",
    name: "4332weizi",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None
  },
  {
    quote: "Your app is incredible and absolutely vital to my workflow. I literally can't use my mac without MMF.",
    name: "ar311krypton",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/369',
    permission: PermissionToShare.None
  },
  {
    quote: "The vertical scroll is just awesome",
    name: "nickcolea",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is literally everything you could want in your experience of using a mouse with OSX.",
    name: "William Park",
    source: QuoteSource.PayPalDonation,
    link: 'message:<3B.AC.57749.F6B6C326@ccg13mail02>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "I've been wanting to get rid of my Magic Mouse for a while and because of your app, I can do just that! You're awesome!!!!",
    name: "Zachary Taffet",
    source: QuoteSource.PayPalDonation,
    link: 'message:<E2.BB.41759.B545C736@ccg13mail04>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "I recommend Mac Mouse Fix, honestly it’s the cheapest, simple, and most well coded app I have yet seen.",
    name: "Rafiq_Kobayashi",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/MacOS/comments/y9q18r/comment/it80ce6/?utm_source=share&utm_medium=web2x&context=3',
    permission: PermissionToShare.None
  },
  {
    quote: "The UI and gestures are so intuitive.",
    name: "Laurynas Tumosa",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634236926.25936@paypal.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Thank you, saved me from buying an apple mouse",
    name: "Joao Santos",
    source: QuoteSource.PayPalDonation,
    link: 'message:<5E.65.01822.93ADD426@ccg01mail02>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Probably the best app on my Mac",
    name: "SaMaY-69",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/273',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is magical. I am absolutely blown away by how well-designed and user-friendly it is.",
    name: "Shaon Khan",
    source: QuoteSource.Email,
    link: "message:<CAFj72xngJzJz8dvOx4pzL+QZTG97dSeuJ0QQwEmETJ67eGzrbQ@mail.gmail.com>",
    permission: PermissionToShare.Granted,
  },
  {
    quote: "The UI in V2 is fantastic and very intuitive.",
    name: "nghtstr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/135',
    permission: PermissionToShare.None
  },
  {
    quote: "Love this app so much, it's a must-have!",
    name: "LinusGeffarth",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/297#issuecomment-1211926291',
    permission: PermissionToShare.None
  },
  {
    quote: "I spent last week without it and my whole workflow was interrupted. Thank you for such a brilliant app.",
    name: "nianiam",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/326',
    permission: PermissionToShare.None
  },

  /* Tier 2 */

  {
    quote: "Awesome app, it definitely deserves to be shared widely with others 😁",
    name: "Jeff Su",
    source: QuoteSource.YoutubeComment,
    link: 'https://www.youtube.com/watch?v=gkYNdy-Hig4',
    permission: PermissionToShare.None
  },
  {
    quote: "This App Makes Your Cheap Mouse Work Better Than Trackpad Gestures",
    name: "Pranay Parab",
    source: QuoteSource.Lifehacker,
    link: 'https://lifehacker.com/this-app-makes-your-cheap-mouse-work-better-than-trackp-1848416099',
    permission: PermissionToShare.None
  },
  {
    quote: "This is the single greatest piece of software in Apple's history.",
    name: "Michael Hicklen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<13.9C.09725.38CA7836@ccg01mail05>',
    permission: PermissionToShare.Granted
  },
  {
    quote: "Cannot imagine using my office Mac without this software. Real productivity booster paired with my evoluent vertical mouse which does not have a driver for Mac like they do for Windows.",
    name: "abhimadav",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
  },
  {
    quote: "Works like a charm and it's easy to set up!",
    name: "Tomáš Nesrovnal",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371330/308049',
    permission: PermissionToShare.None
  },
  {
    quote: "This is great software and solved all my mouse issues.",
    name: "Mladen Mihajlovic",
    source: QuoteSource.StackExchange,
    link: 'https://superuser.com/a/1699506',
    permission: PermissionToShare.None
  },
  {
    quote: "I really appreciate the simplicity it brings.",
    name: "chamburr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/150',
    permission: PermissionToShare.None
  },
  {
    quote: "Among all apps that try to fix this problem, this one is undoubtly the best!",
    name: "tomatsaev",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/34',
    permission: PermissionToShare.None
  },
  {
    quote: "This is the best mouse software on the Mac.",
    name: "samueljim",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/105',
    permission: PermissionToShare.None
  },
  {
    quote: "Mac Mouse Fix is the best in its class!",
    name: "ib0ndar",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/378',
    permission: PermissionToShare.None
  },
  {
    quote: "No other similar utility can compete",
    name: "5silentrain",
    source: QuoteSource.Email,
    link: 'message:<CAB+S4pXD+RP3OYxENZXa_+NWLmJBB1Uqf1_Z9xKLqRy=-QaTJg@mail.gmail.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Utterly incredible software, bro :) so simple yet so functional. keep up the good work.",
    name: "Osman Keshawarz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<36.97.42814.18522A36@ccg01mail04>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Your app is literally the best Mac Mouse Fix available. So simple, light, M1 compatible, no bugs. I’m totally in love. I don’t even use Logitech Hub as your app is far superior. I’ll definitely be recommending your app as much as possible.",
    name: "Marvin Marker",
    source: QuoteSource.PayPalDonation,
    link: 'message:<221C5A7A-5754-4B3E-A74A-04EC3694772E@gmail.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Thanks for this AMAZING software. 10/10!",
    name: "Timon Weides",
    source: QuoteSource.Email,
    link: 'message:<21D82608-53B7-4A72-AD52-E650FF0FED20@live.de>',
    permission: PermissionToShare.Requested,
  },
  {
    quote: "Thank you for the amazing app in Mac Mouse Fix. Just what I needed, no subscription and no bloat. Thank you so much!",
    name: "Erik Svendsen",
    source: QuoteSource.PayPalDonation,
    link: 'message:<04.52.53548.372FA446@ccg13mail05>',
    permission: PermissionToShare.Granted,
  },
  {
    quote: "It's exact what I was looking for to make non-Apple-Mice work like I want ",
    name: "Wolf Spalteholz",
    source: QuoteSource.PayPalDonation,
    link: 'message:<59.33.32745.E2035526@ccg13mail04>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "After switching to a mouse, I tried software such as SteerMouse, which received many recommendations and even charges, and finally found that this software meets my needs perfectly, every feature is very useful, and the performance is very good!",
    name: "SamyukL",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/449',
    permission: PermissionToShare.None
  },


  /* Tier 3 */

  {
    quote: "This software is amazing!",
    name: "NicolaeS",
    source: QuoteSource.StackExchange,
    link: 'https://apple.stackexchange.com/a/371342/308049',
    permission: PermissionToShare.None
  },
  {
    quote: "Thanks, the app is very cool",
    name: "danilinus",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/393',
    permission: PermissionToShare.None
  },
  {
    quote: "SUPER NICE APPLICATION",
    name: "Chien Wei Chek",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/136',
    permission: PermissionToShare.None
  },
  {
    quote: "It works perfectly with my mouse",
    name: "wnavarrobr",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/455',
    permission: PermissionToShare.None
  },
  {
    quote: "Works so well! Great idea and implementation, and of course the design, in the best Apple traditions!",
    name: "Dzhakhongir Normatov",
    source: QuoteSource.Email,
    link: 'message:<280189B0-BC31-4E89-907C-46FBFB584E38@icloud.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Many thanks for Mac Mouse Fix—it’s become an essential tool for me, and of all of the programs of this type I’ve found, it’s easily the best.",
    name: "David Isom",
    source: QuoteSource.Email,
    link: 'message:<E344087D-7575-4253-B310-D127CC9F4A99@me.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Thank you for Mac Mouse Fix! I love it. You're doing what Apple didn't =)",
    name: "Fernanda Bari Ramos",
    source: QuoteSource.PayPalDonation,
    link: 'message:<1634211506.4537@paypal.com>',
    permission: PermissionToShare.Requested,
  },
  {
    quote: "Great app! Love the simplicity and it works like a charm! Thanx :)",
    name: "Peter Leijenhorst",
    source: QuoteSource.PayPalDonation,
    link: 'message:<49.05.55471.3D245B36@ccg01mail03>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "You are an absolute legend thank you so much for creating this app, it's literally perfect",
    name: "Herta Gatter",
    source: QuoteSource.PayPalDonation,
    link: 'message:<67.68.63016.6BAA3D36@ccg01mail02>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Thanks for your awesome app its just wonderful :).",
    name: "Marvin Pärli",
    source: QuoteSource.PayPalDonation,
    link: 'message:<9C61D7F1-CABE-4851-8F29-AE04AF932140@icloud.com>',
    permission: PermissionToShare.Requested
  },
  {
    quote: "Your tool is literally the only way how I can use macOS (with a mouse especially) without freaking out!",
    name: "BlackBird11",
    source: QuoteSource.GitHub,
    link: 'https://github.com/noah-nuebling/mac-mouse-fix/issues/414',
    permission: PermissionToShare.None
  },
  {
    quote: "Beautiful piece of libre software. Thank you for your contribution to the open source cause.",
    name: "yonitubul",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
  },
  {
    quote: "Thank you for this, i don't understand why apple didn't make this as default, like it's super intuitive doing gestures with the middle click.",
    name: "couch_ech",
    source: QuoteSource.Reddit,
    link: 'https://www.reddit.com/r/macapps/comments/s5h7gb/mac_mouse_fix_2_featuring_nativefeeling_gestures/',
    permission: PermissionToShare.None
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