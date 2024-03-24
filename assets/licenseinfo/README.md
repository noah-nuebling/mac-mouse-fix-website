# Readme about licenseinfo folder

- The config.json file is loaded by MMF3 to determine the price etc to display in-app. See `LicenseConfig.swift` for the interface code.

When editing config.json: 
- Use https://jsonlint.com/ -> Make sure you're not mispelling anything or forgetting any commas, otherwise MMF will fall back to hardcoded values.
  - ! Don't add a comma after the last element in an object
- When you change `price` also change the price on **Gumroad/Paddle/...**
- When you update `price` or `trialDays` then also update **GitHub** release notes which contain them. Don't forget to re-generate the in-app update notes which are generated from the gh release notes.
  - Update: We mention that prices might change in the release notes, so it's okay.
- To make the changes to config.json take effect, remember to use `pnpm upload`

Countries:
- Countries are specified by BCP 47 Region Identifiers. For example "IN" for India. Also see ([BCP 47 Search](https://www.techonthenet.com/js/language_tags.php) and [OSX Language ID Documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html))
- Reasons for making MMF free in certain countries:
  - China (CN): Gumroad is blocked by the great Firewall
  - Russia (RU): Not totally sure anymore. I think PayPal and credit cards which Gumroad supports don't work in Russia because of the war.
  - India (IN): Seems like PayPal doesn't work and many Indians don't have a credit card. So Gumroad is not a good option. See [this mail](message:<6F7DBCB6-CF25-4FA4-8EC1-B9ACA7DF414F@icloud.com>).
  - Azerbaijan (AZ): Bank says ('Unfortunately, payment in this store [gumroad] is prohibited in Azerbaijan'). See [this mail](message:<4656428B-A309-4306-AF73-BA8660B805A1@gmail.com>).
  - Turkey (TR): It's too expensive for college student even at $1.99 due to current (December 2023) terrible economic situation in Turkey. Source: [this mail](message:<5C18F7A2-8336-48B5-A458-D6A193CEFFAC@icloud.com>).
  - Iran (IR): According to [this mail](message:<CAHkB1paSesFmjY-AehsPuOUr5WfZACkXCxDuaWtqgdn4kKrcuw@mail.gmail.com>) they can't pay in Dollars due to economic sanctions
  - Myanmar (MM): According to [this mail](message:<0FD140DD-9672-4B29-BEA5-F3EEBAE0736A@gmail.com>) the checkout page is available but the person can't actually check out.
  - Nepal (NP): According to [this mail](message:<CAFf=ELgRHw0d0G10z-JbO7RpiVrkc8Ktjh0QoaFmAG6O2NVw-Q@mail.gmail.com>) they "don't have any payment gateway in dollars", "Paypal has yet to come to our country, and we can only make transactions inside our country.", and $2.99 is very expensive for a student.

Other notes:
- I removed ?wanted=true from the quickpPayLink (https://noahnuebling.gumroad.com/l/mmfinappusd?wanted=true). Now it's less 'quick' which might be annoying to users, but I think it's less confusing, because all the stuff about the 1. 2. 3. Options still shows up for ?wanted=true but without context which I think is sort of confusing.