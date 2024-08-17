# Locales Readme

## Overview 
(16.08.2024)

- Overview: (16.08.2024)
- Localizable.xcstrings, quotes.js,and Quotes.xcstrings are the ground-truth sources for all UI Strings.
- Translations for the .vue files throughout the project are inside Localizable.xcstrings, while translations for quotes.js are inside Quotes.xcstrings.
- quotes.js contains the English and Original-language versions of all quotes. Quotes.xcstrings is updated with the data from quotes.js through build scripts that run before the page is built.         
    (Implemented in the `sync-strings` script in the `mac-mouse-fix-scripts` subrepo). The other language versions of the quotes are defined directly inside Quotes.xcstrings.
- All other ui strings are defined directly inside Localizable.xcstrings.
- Before the app is built, all uistrings are compiled into Localizable.js by one of our build scripts (build-strings script inside `mac-mouse-fix-scripts` iirc). Localizable.js is then directly used by nuxt-i18n to load the strings.

- Also see:
  1. Python scripts inside `mac-mouse-fix-scripts` where all this stuff is implemented have some explanations at the top of the files.
  2. Details of the higher level concepts are discussion in the `mac-mouse-fix` repo's readme(s) about localization. (- we should possibly remove the discussion here and reference the `mac-mouse-fix` repo instead.)

Details: Why use this convoluted system?
  - In Summer of 2024, we wanted to create a system where translators can access all localization resources for the MMF project from a single place. And then edit and submit translations in a relatively easy-to-use, and non-technical way. (Before, localizers had to build the Xcode project / nuxt app, them edit the source files, and then submit pull requests. The state of each localizable string had to be looked up in the State of Localization GitHub discussion). 
  I decided I wanted to use .xcstrings files to hold our localizations (as well as keep track of the state of each localizable string) and export them for localizers as .xcloc files. (Xcode can import/export .xcstrings files as translator-friendly .xcloc files)
  - So we wanted to use .xcstrings files for the whole project, so we can export/import everything as .xcloc files. 
    But requires us to implement two functionalities:
    1. Functionality: You need to compile the .xcstrings files into a format that is compatible with the target. Xcode automatically compiles the .xcstrings files to .strings and .stringsdict files when you build an app for an Apple platform. For the MMF Website, we compile the .xcstrings files into the Localizable.js file, which is then used by @nuxt/i18n to load the translated strings. We do this with a python script that runs before we build the nuxt app. This is relatively simple, since .xcstrings files are nicely-structured .json files under-the-hood, that we just have to restructure a little bit and then wrap with `export default {` to create a valid `.js` file.
    2. Functionality: Usually, you have one/several source files, which the .xcstrings files are translating. You want to keep the .xcstrings file in-sync with the source files that are being translated. 
       Xcode does this automatically, for C (Objective-C, C++, etc.) and .swift source code files, as well as .nib and .storyboard (interface-builder) files. But for our purposes we also wanted to use.md, .js, and .vue files as source files to be translated by our `.xcstrings` files. Specfically, for the MMF website, all the `.vue` files are the source files for `Localizable.xcstrings`, and `quotes.js` is the source file for `Quotes.xcstrings`. At the time of writing, we have a script that syncs `Quotes.xcstrings` with `quotes.js`. (Leveraging Apple's `xcstringstool` clt) For the `.vue` files, we don't have a syncing-script that updates `Localizable.xcstrings`, yet, but since the `.vue` files do not contain the source language (English) uiStrings directly, (instead, they only contain the string-keys) - it shouldn't be too much of a hassle to keep `Localizable.xcstrings` reasonably in-sync with the `.vue` files by hand.

Rambling: (This stuff is also discussed in the `mac-mouse-fix` repo's readme on localizatio -  we should possibly remove this and reference that instead.) 
  Why did we decide to use .xcstrings + .xcloc files instead of using an online platform like crowdin or localazy:
    This decision is a bit questionable but here are the reasons I remember:
    - We can embed auto-generated localization screenshots, which will be shown in-line to translators, as they edit the .xcloc files
      -> Apple even promised that Xcode would auto-generate localization screenshots, but I couldn't get it to work and we ended up implementing our own mechanism for doing that. (I couldn't stop myself. Result is nice)
    - The localization state (stale, needs_review, translated, do_not_translate, etc.) is being kept track of by Xcode automatically as you edit the .xcstrings / .xcloc files. And the state is shown in-line for editors and for me, right in the project.
    - The editing experience is imo nicer/cleaner/simpler than most online localization platforms, like localazy and crowdin (although localazy is pretty good and supports .xcstrings files iirc. I have detailed notes on my tests somewhere.)
    - It's free (I don't think the online platforms like crowdin and localazy would be free for MMF, since MMF is not free and doesn't have an officially authorized open-source license.) (On the other hand, the platforms aren't very expensive IIRC, and it would have surely been worth it.)
    - To make it easier to translate our Readme.md and Acknowledgements.md files, I thought it's really nice to use .xcstrings files, since you can break the long document down into little chunks where each chunk has a state, such as 'needs_review' which is automatically managed by Xcode. Translators can see the original section right in line with the translated section in the editor, and compiling/syncing the markdown documents from/to .xcstrings files really wasn't hard. Not sure something comparable would be possible with an online platform.


## Why do we have an Xcode project here? 

The only purpose is so that we use the `xcodebuild` command-line-tool to export the Localizable.xcstrings file as an .xcloc file.

I'm not entirelyyy sure the Xcode project is necessary.

We had to add the `dummy-xcode-target` Target, and then add the .xcstrings file to that target. (It's a macOS `App` target. I also tried more lightweight targets like a Command Line Tool but it didn't work), in order for the "Export Localizations..." option in Xcode to work. Not sure if this is also necessary for exporting .xcloc files using the `xcodebuild` command-line-tool which we plan to use.

Sidenote: After creating the target in the Xcode Project, we had to turn off the "Generate Info.plist File" build setting and turn off localization for MainMenu.xib to prevent those files from adding unnecessary strings to the .xcloc exports. Update: Later to export the localizations from the command line with xcodebuild, the project needs to be buildable. So we had to add manually add xcode-dummy-target-Info.plist and delete the localizable keys from it (CFBundleName).

To export an .xcloc file for German into the folder `localization-export` go to the folder that contains the .xcodeproj file and use the following command:

```
xcodebuild -exportLocalizations -localizationPath localization-export -exportLanguage de
```

## On automatic analysis

(Outdated as of August 2024)
(Since we don't use the autoanalysis script (aka `State of Localization` script) anymore and instead use .xcstrings now.)

The python script in the MMF repo which automatically analyzes missing, superfluous and outdated translations, relies on the file structure here to be like:

Base file at:
`locales/en-US.js`

Translations at:
`locales/*.js`

(Don't use `.ts` as file extension)\
See the output of the script in the comment at: https://github.com/noah-nuebling/mac-mouse-fix/discussions/731

## Notes from old en-US.js file

We had these notes inside the en-US.js file before we moved over to using Localizable.xcstrings

### Trackpad Features

Notes: 
- Terminology
  - Main reference: https://support.apple.com/en-us/102482
  - app-expose terminology
    - It's called "App Exposé" in Trackpad settings "Application Windows" in other places in the settings, and there's an Apple Help articale that speaks of "App Windows"
      - Here's the help article: https://support.apple.com/en-US/guide/mac-help/mchlp2469/mac
    - In MMF we opted for "Application Windows", but since we're comparing with the Trackpad here, we used App Exposé, just like Trackpad Settings.

### Scrolling

  Title Ideas:
  - Scrolling Has Never Felt So Good
  - Scroll About with Style
  - Get On The Scroller-Coaster
  - Bad UX? Scroll Past That.
  - Schlechte Software? Einfach weiterscrollen.
  - Bad software? Just keep scrolling.
  - An Expensive Trackpad? Just Keep Scrolling.
  - Scrolls Like Butter.
  - Scrolling. Smooth Like Butter.
  - Scrolling: Smooth Like Butter.
  - Scrolling. Like Butter.
    - ^ Can't really translate Smooth Like Butter to other languages, but Like Butter might work better? Edit: Nope: Still relies on cultural association between butter and smoothness.

  Body ideas:
  - Mac Mouse Fix makes scrolling feel as **smooth** and **fluid** as on an Apple trackpad, or as **consistent** and **precise** as on Windows - with just a few simple clicks.
    - ^ It's a bit weird to emphasize the way you set things up ("few simple click") right in the intro. Because we should focus on WHAT it does, not how the settings work at first. Also the 'settings are easy' point could be made anywhere. But can't think of a better way to phrase this right now. 
  - Scrolling with a third-party mouse on macOS can feel **jolty** and **hard to control**. With Mac Mouse Fix, scrolling will feel **polished** and **ergonomic**.
    - ^ Don't explain a problem to people they might not have / have never thought about as a problem. Might create disconnect.
  - Mac Mouse Fix makes scrolling on your mouse feel as **smooth** and **fluid** as on an Apple trackpad, or as **consistent** and **precise** as on Windows - Choose your preference with just a few clicks.
    - ^ Leaning MORE into setup, makes it less weird I think.

### Action Table

/*

  Discussion:
  - We tried to add a numbered list into the action table body, describing the steps to setup a new gesture. Buttt we couldn't get it to work in a reasonable time. So we're just making it as good as possible in a flowing text. Edit: made a numbered list after all.
  - Problem: It might be nicer to have a shorter text, like the MMF 2 reddit post, and then have the details in the video demo. This would sound better and be easier to read. But I think the little MMF-on-studio-display image is hard to make sense of if you don't have the step-by-step instructions. So we're keeping the step-by-step for now.
  - Thought process: We spent a long time on the Section title and body. A LOT of tinkering with the text and then noticing the fundamental idea was flawed. Now our plan is this:
    - The **main goals** we identified for the other section body texts is to:
      - Create context and understanding. Answer the questions: 
        - How does this feature relate to my wants and needs or the wants and needs of other people? 
        - Why does this feature exist in the way it does? What are the thoughts and ideas behind it and its design? 
        - Provide this context and understanding very briefly and at a high level, without going into specifics, because we'll explain specifics later.
      - Furthermore we want to the text to be easy to read, enthusiastic, and have some emotionally resonant, engaging quality to it. Possibly 'narrative' elements to create emotional resonance.
      - We also want to convey a sense of simplicity and high quality of Mac Mouse Fix.
    - Based on these goals we want to say sth like: 'MMF lets you do almost anything you can think of with your mouse. And is remarkably easy to use.'
      - Its very brief compared to the other body texts, but that's okay. It fulfills all the goals we have for the text. It's exciting, desirable, emotionally resonant and engaging/inspiring, and communicates the main idea behind the design and how I feel when I use the UI. 
    - We also had this idea of creating this narrative contrast like the other body texts, where we first present a problem and then say 'not with mac mouse fix'. And the problem we meant to talk about was that other software that is very powerful is usually complicated. But we decided that we shouldn't give this idea high priority in the text because it doesn't help us with the goals listed above. It doesn't relate to any want or need of the user and it doesn't create insight or understanding for the feature and its design. What it's adding is basically just a 'flex'. Saying 'look how impressive and MMF is compared to other software' or saying 'isn't it cool how it breaks the expectaion and is both powerful AND intuitive?'. This is a neat thing to highlight to give the user a sense of quality or 'this is cool', but it's not the main thing we want to focus on. So we want to deemphasize this by putting it at the end, and giving it less text or even removing it completely
    - Since we want to de-emphasize the notion of 'powerful AND simple', we think that we might want to change the title, too, since it's heavily focused around that. But I'm not sure, yet "Amazingly Flexible\n*and* Intuitive." is still acceptable and makes sense I think.
  
    - !!! Update on ^^^: We wrote the section pretty quickly, this approach really works!! I created a mindmap with the 'goals' described above, and then fleshed it out with concrete ideas that fulfill those goals. Finally we put it into a coherent text and polished it by translating back and forth between German and English and and editing together with ChatGPT. And we arrived at a really great result that I'm super happy with in a reasonable amount of time without endless fiddling and revisions. Awesome!

  MMF 2 Reddit Post alternative:
    Move the pointer into the "+" field, then simply show Mac Mouse Fix the clicks and drags that you want to assign a new Action to.

  Alternative action table body:  
    
      **With the Action Table you can add a new action to your mouse in just a few seconds**
      1. Put the mouse pointer over the '+'-field
      2. Click, drag, or scroll on your mouse
      3. Choose an action
      Done! Now you can use the action you chose by clicking, dragging, or scrolling in the way you just did.
      You can also double click, use keyboard modifiers, and more.
  */

### Previous values for remap-engine.body
(Renamed to customization.intro.body)

//"**Powerful customization options** usually come with a complex user interface. Well, you guessed it, not with Mac Mouse Fix! It lets you set up your mouse exactly the way you want, while being **remarkably simple**.", 
//"Too often, powerful customization options come with **complex** and **confusing** user interfaces. Well, you guessed it, not Mac Mouse Fix! It lets you set up your mouse **exactly** the way you want - and it's **remarkably easy**!", 
//"Set up your mouse **exactly** how you want it - In **seconds**!", 
// "With Mac Mouse Fix you can configure your mouse to do **almost anything** your computer can do - in a vast number of ways. And it takes only **seconds** to set up.", 
// "With Mac Mouse Fix you can configure your mouse to do **almost anything** - in almost any way. And it takes **seconds** to set up.", 
//"With Mac Mouse Fix, you can set up your Mouse exactly how you want it - **in seconds**. [[details -- breeze through macOS ]]", 
//Customizing how your mouse works in Mac Mouse Fix is **better than in any competing app** - Both when it comes to how **easy** it is, *and* when it comes to the range of **powerful** things you can do. That's amazing isn't it? 
//Mac Mouse Fix makes it incredibly **easy and intuitive to precisely customize** what your mouse does.

### Previous values for customization-feature.action-table.body

//"Move the pointer into the \"+\" field, then **simply show** Mac Mouse Fix the **clicks, drags, and scrolls** that you want to assign a new Action to. It's incredibly intuitive - *and* flexible. (Click to see it in action.)",

### kv-pairs that were commented out in en-US.js


  //'test-stuff': "en-us stuff",  
  //'test.80-chars-roman': 'These are some amazing characters, very nice characters in deed. 80 of em in nu.',
  // 'feature-card.minimize-hint': 'Minimize 􀜪',

  //'card-header.video-hint': 'Click any card for a *Video Demo*',
  // 'feature.action-table.expand-button': "See How to Add Gestures to Your Mouse",
  // 'alternatives.mx-master-rant': "The MX Master and other Logitech mice actually has very bad build quality and components compared to its price, and has very bad ergonomics too, at least for my hands. The button placing is very inconvenient, the mouse is way too heavy making it uncomfortable compared to ligher mouse, it's too big, not fitting my hand well, sensor is low quality and inaccurate, lots of input lag on bluetooth, the hardware features it has (gesture button, horizontal wheel, and free-spin) are not well-engineered, and do not feel good or ergonomic to use and their functionality can easily be replaced by Mac Mouse Fix in a better way.",
  // 'pay-reason.pity': "Support me. Idk I struggle a lot with life, autism, childhood trauma, can't work a normal job. So I hope I can contribute to society and survive with this. Sincere thanks to anyone paying for the app.",
  // 'pay-reason.open-source-indie': "Support open source, indie development making software with passion and a focus on a great user experience.",
  //'user-feedback.card-header.title':  "**What people say** about Mac Mouse Fix",
  //'user-feedback.card-header.sub':    "Thanks to anyone sharing feedback! :)",
  //'quotes.thankyou.source': '**Noah Nuebling**, creator of Mac Mouse Fix',


### Good Sofware & Pricing

  /*

  Discussion:
  - We considered including download count here, but I don't think it's useful and might seem braggadocious/out-of-place or sth in the places where we though to put it. We can just put a little badge at the top of the site or on github.

  */

  /*

  
  title: 
  - Good software that puts your experience first
  - Good Software\nPuts Your\nExperience First
  - Good Software\nFor Your Computer
  - Software You Can Feel Good About Installing
  - Software You Can Install With A Good Feeling
  - Install With A Good Feeling
  - Install With Confidence
  - Software You Can Install With Confidence
  content: Mac Mouse Fix is unobtrusive, lightweight, polished, and easy to use. Every detail has been considered to give you the best possible experience while feeling like a natural, lightweight extension of your Mac. Additionally, it is completely open source which means that you can trust that it is secure ((and does not steal your data or mine bitcoin in the background or anything like that)), and (I'm glad to say that) to say the app has been downloaded x times, and users really love it. Here are some positive things that people have to say about the app. Thanks to everyone sharing their feedback...
  content: <Cards of what people said>

  title:
  - Serious bang for your buck
  - Great pricing
  - Free for 30 days, $1.99 to own
  - One simple price
  - One Simple App. One Simple Price.
  - Great Software Doesn't Have To Come At a Great Price
  - Great Software, Small Price
  content: 
  - Mac Mouse Fix is free for 30 days and costs $1.99 to own. There are no subscriptions or additional costs, and you can easily pay in few clicks from inside the app with Apple Pay, PayPal, Credit card and more.
  - More info (??) on trial: Free days only count down when you actually use the app - so you can relax when testing app without worry that your free days will run out. 
  - More info (??) on comparison to alternatives: Buying Mac Mouse Fix and using it with a cheaper mouse is wayyy cheaper compared to alternatives like buying an MX Master ($99.99 MSRP), or an Apple Trackpad ($129.00 MSRP) - and it's not only cheaper, but - in my opinion - you even get a far nicer experience compared to an MX Master, and even slightly nicer than an Apple Trackpad.
  - More info/rant on why MX Master sucks: The MX Master and other Logitech mice actually has very bad build quality and components compared to its price, and has very bad ergonomics too, at least for my hands. The button placing is very inconvenient, the mouse is way too heavy making it uncomfortable compared to ligher mouse, it's too big, not fitting my hand well, sensor is low quality and inaccurate, lots of input lag on bluetooth, the hardware features it has (gesture button, horizontal wheel, and free-spin) are not well-engineered, and do not feel good or ergonomic to use and their functionality can easily be replaced by Mac Mouse Fix in a better way.
  - Why it's good to pay (???): 
    - Support me. Idk I struggle a lot with life, autism, childhood trauma, can't work a normal job. So I hope I can contribute to society and survive with this. Sincere thanks to anyone paying for the app.
    - Support open source, indie development making software with passion and a focus on a great user experience.


  
  
  Section 1:
  - Adjectives:
    - Collection of adjectives: easy-to-use, polished, fast, detail-oriented, optimized, efficient, lightweight (as in resource-efficient), unobtrusive - stays in background without being noticable or wasting resources when unused, natural extension of your mac
    - German: poliert, detailorientiert, benutzerfreundlich, unaufdringlich, (schnell, optimiert, effizient, ressourcenschonend,)
  - Title tdeas:
    - Unobtrusive, Lightweight, Polished, Easy to use - good software! (from Readme I wrote)
    - Unaufdringlich, benutzerfreundlich, ressourcenschonend, poliert - gute Software!
    - Good software that puts your experience first
      - content: Mac Mouse Fix is unobtrusive, lightweight, polished, and easy to use. Every detail has been considered to give you the best possible experience while feeling like a natural, lightweight extension of your Mac. Additionally, it is completely open source which means that you can trust that it is secure and does not steal your data or mine bitcoin in the background or anything like that, and (I'm glad to say that) users really love it. Here are some positive things that people have said about the app...
  - open source (which good in iself, support (indie) open source development), trustworthy, secure
  - Title ideas
  Section 2:
  - number of downloads, popular, (secure), Stuff people say. People think it's amazing. 
  Section 3:
  - Pricing 
        - free for 30 days, $1.99 to own,
        - very cheap, (and better) compared to alternatives like MX Master, Apple Trackpad, other mouse-enhancing-software. 
        - easily pay in few clicks from inside the app with Apple Pay, PayPal, Credit card
        - free days only count when in use so you can relax when testing app, 
        - in China, Russia, India, some other places, there's a different payment provider (does anybody care??)
  */

#### Idea for open-source.body

//Also, other awesome projects can benefit from Mac Mouse Fix' innovations in trackpad simulation and other areas.",

#### Notes from under alternatives.body

//https://www.apple.com/us/shop/mac/accessories/mice-keyboards // https://www.logitech.com/en-us/products/mice/mx-master-3s
//"Mac Mouse Fix makes your $10 mouse better than an Apple Trackpad. And **far** better than a Logitech MX Master! Even though those two are often considered the best input devices for Macs. \n\nYet, Mac Mouse Fix is **{ priceFactorMXMaster }x** cheaper than an MX Master and **{priceFactorTrackpad}x** cheaper than a Trackpad.", // Keep MXMasterPrice in index.vue in sync with this, so that the price factor is correct.
//"Mac Mouse Fix is **{ priceFactorMXMaster }x** cheaper compared a Logitech MX Master ($99.99 MSRP), and **{priceFactorTrackpad}x** cheaper compared to an Apple Trackpad ($129.00 MSRP).\n\nAnd that's even though Mac Mouse Fix offers an experience that is at least as good - if not better! Even paired with a cheap mouse.", // Keep MXMasterPrice in index.vue in sync with this, so that the price factor is correct.

#### Notes above price.disclaimer

/*
  
  On PayPal currency conversion fees:
  
  General Info:
  - For the conversion, PayPal charges 4.5% fee: https://www.paypal.com/sr/webapps/mpp/paypal-fees#:~:text=What%20a%20deal.,conversion%20service%20charge%20of%204.5%25.
  - Gumroad always converts to my PayPal account's 'default currency' (Euro) according to: https://help.gumroad.com/article/46-what-currency-does-gumroad-use#:~:text=Gumroad%20processes%20all%20transactions%20in%20United%20States%20Dollars.&text=However%2C%20during%20the%20checkout%20process,purchases%20to%20USD%20for%20processing.
    - In PayPal I activated some setting to not convert payments in other currencies to Euro, but Gumroad seems to override this.

  Thoughts:
  - I could change my PayPal's 'default currency' to USD, but then all non-usd paying customers would still have to pay the conversion fee. And I'd have to conver the dollars back to Euros to use them. So not a good idea.

  Also see: 
  - I wrote feedback to Gumroad about this: https://gumroad.nolt.io/871  
  - I was made aware of this by the conversation around this mail: message:<CALQY+mqTdN4y8+mpFADAaLexSq5eALzkso3QPP4P3AMUZw9y4g@mail.gmail.com>
   
    */

#### Alternatives for price.disclaimer

  //"Note on taxes: The price of **${price}** does not include consumption taxes, which must be paid in most regions. For example, Sales Tax in the US, or VAT in Europe. The tax will be added to the price at the time of purchase, depending on your location. I would really like to include the tax in the price - to make the buying experience simpler and clearer. But this is currently not feasible due to limitations with the sales platform Gumroad.com. I hope the price still feels very fair and cheap. To see your final price, visit the [checkout page](https://app.gumroad.com/checkout?wanted=true).",
  //"Note: The price of **${price}** does not include the local consumption tax, which must be paid in most regions.\nFor example, the Sales Tax in the USA, or VAT in Europe. The tax will be added to the price at the time of purchase, depending on your location.",
  //"Note: The price of **${price}** does not include the consumption tax that has to be paid in your region.\n(Such as sales tax in the US or VAT in Europe)", 
  // Note: The price of **${price}** does not include consumption tax, which will be added according to the tax laws in your region. This may include taxes like sales tax in the US or VAT in Europe.

### German Notes after from open-source.body

//Außerdem hilft es dabei, Mac Mouse Fix in verschiedene Sprachen zu übersetzen, die Software-Qualität zu verbessern, und mehr.",

### German alternatives for remap-engine.body
(Renamed to customization.intro.body)

//"Richte deine Maus **genau** so ein wie du es willst - **In Sekunden**!",//'Mit Mac Mouse Fix kannst du **fast alles tun**, was dein Computer kann. Und deine Maus **in Sekunden** genau so einrichten, wie du es willst.',
