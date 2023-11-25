# Readme about licenseinfo folder

- The config.json file is loaded by MMF3 to determine the price etc to display in-app. See `LicenseConfig.swift` for the interface code.

When editing config.json: 
- Use https://jsonlint.com/ -> Make sure you're not mispelling anything or forgetting any commas, otherwise MMF will fall back to hardcoded values.
  - ! Don't add a comma after the last element in an object
- When you change `price` also change the price on **Gumroad/Paddle/...**
- When you update `price` or `trialDays` then also update **GitHub** release notes which contain them. Don't forget to re-generate the in-app update notes which are generated from the gh release notes.

Countries:
- Countries are specified by BCP 47 Region Identifiers. For example "IN" for India. Also see ([BCP 47 Search](https://www.techonthenet.com/js/language_tags.php) and [OSX Language ID Documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html))
- Reasons for making MMF free in certain countries:
  - China (CN): Gumroad is blocked by the great Firewall
  - Russia (RU): Not totally sure anymore. I think PayPal and credit cards which Gumroad supports don't work in Russia because of the war.
  - India (IN): Seems like PayPal doesn't work and many Indians don't have a credit card. So Gumroad is not a good option. See [this mail](message:<6F7DBCB6-CF25-4FA4-8EC1-B9ACA7DF414F@icloud.com>).
  - Azerbaijan (AZ): Bank says ('Unfortunately, payment in this store [gumroad] is prohibited in Azerbaijan'). See [this mail](message:<4656428B-A309-4306-AF73-BA8660B805A1@gmail.com>).
