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
- Countries are specified by BCP 47 Region Identifiers. For example "IN" for India. Also see ([ISO Country Code Browser](https://www.iso.org/obp/ui/#search) and [OSX Language ID Documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html))
- Reasons for making MMF free in certain countries:
  - China (CN): Gumroad is blocked by the great Firewall
  - Russia (RU): Not totally sure anymore. I think PayPal and credit cards which Gumroad supports don't work in Russia because of the war.
  - India (IN): Seems like PayPal doesn't work and many Indians don't have a credit card. So Gumroad is not a good option. See [this mail](message:<6F7DBCB6-CF25-4FA4-8EC1-B9ACA7DF414F@icloud.com>).
  - Azerbaijan (AZ): Bank says ('Unfortunately, payment in this store [gumroad] is prohibited in Azerbaijan'). See [this mail](message:<4656428B-A309-4306-AF73-BA8660B805A1@gmail.com>).
  - Turkey (TR): It's too expensive for college student even at $1.99 due to current (December 2023) terrible economic situation in Turkey. Source: [this mail](message:<5C18F7A2-8336-48B5-A458-D6A193CEFFAC@icloud.com>).
  - Iran (IR): According to [this mail](message:<CAHkB1paSesFmjY-AehsPuOUr5WfZACkXCxDuaWtqgdn4kKrcuw@mail.gmail.com>) they can't pay in Dollars due to economic sanctions
      - Update: [Mar 2025] [this email](message:<87429F97-8B7B-4FBD-BEBE-90E7724943A1@gmail.com>) (and other IIRC) says that some Iranians don't like to set their system region to Iran since they worry it'll cause "unexpected limitations – whether from app store restrictions, system behavior, or compatibility issues".
        - User from this mail suggests crypto-payment or IP-based location tracking as alternatives for Iranian users. 
          - SIDENOTE: Stripe supports crypto, unsure about the other platforms we considered (Paddle and Lemonsqueezy)
  - Myanmar (MM): According to [this mail](message:<0FD140DD-9672-4B29-BEA5-F3EEBAE0736A@gmail.com>) the checkout page is available but the person can't actually check out.
  - Nepal (NP): According to [this mail](message:<CAFf=ELgRHw0d0G10z-JbO7RpiVrkc8Ktjh0QoaFmAG6O2NVw-Q@mail.gmail.com>) they "don't have any payment gateway in dollars", "Paypal has yet to come to our country, and we can only make transactions inside our country.", and $2.99 is very expensive for a student.
  - Lebanon (LB): According to [this mail](message:<769F6BFC-D895-4DC3-8207-7CCDD51D7A18@icloud.com>) Gumroad tells people in Lebanon "Sorry, this item is not available in your location". 
  - Egypt (EG): The mister in this [this mail](message:<CABj_fxkd40BWQq5UwdfkVZu=qBsz6+Ova8QzWogasJLhVPACXw@mail.gmail.com>) wrote: "I'm unable to make payments in USD [...] due to the banking system in Egypt" and "the ongoing economic situation [...] has made it difficult for me to pay for products in foreign currencies." (Sep 2024)
  - Belarus (BY): "There is a payment error and I cannot purchase" (Src: [this mail](message:<02929B0E-719D-44D8-9A11-2B8D3F4A2B13@icloud.com>)). Most likely due to Russia sanctions.
  - Venezuela (VE): There are US sanctions, I think, not sure why. Part of unsupported countries list for Paddle. Received [this message](message:<GoC9yZV6u_WniGgCiCvc3uErhT1FseoKHFjXJFa4I3_5pCbm18q-QrwHtM1GJsW-pxwDMD5ZiBn7cSXeWxdrAK43vWC1TdX1p4qcT8Lc1GY=@proton.me>) from Venezuelan user. (Last Updated: Sep 2024)
  - Sri Lanka (LK): I got one single [email](message:<CACu8jAS3uoCB2v1VrNxRdz9ENvg3Tuu6eaq++R5twq_Q6u=Dxg@mail.gmail.com>) from a Sri Lankan user with a Visa Debit Card whose card couldn't be charged by Gumroad. Not sure this is a Sri Lankan problem or limited to that user. But we'll just preemptively make it free until we build the Paddle checkout.
  - Syrian Arab Republic (SY): Got one [email](message:<CANu2DJJ=3iM6_u+Ma5FSTc-Trd+-7-wuayOsyckW1YULU59Erg@mail.gmail.com>) saying: "I am based in Syria, and unfortunately, due to ongoing political issues, there aren't many reliable payment methods available here". Also can't see any sales from Syria in Gumroad analytics even with 'All Time' timerange.
  - Zimbabwe (ZW): [Apr 2025] Received [this email](message:<11F2CD7C-D1D1-41C8-BE4D-2F2F05DB869A@icloud.com>) Zimbabwean user saying "the payment page by Gumroad says ‘not available in your country’.". (ZW is also [unsupported by Paddle](https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle)).

Other notes:
- I removed ?wanted=true from the quickpPayLink (https://noahnuebling.gumroad.com/l/mmfinappusd?wanted=true). Now it's less 'quick' which might be annoying to users, but I think it's less confusing, because all the stuff about the 1. 2. 3. Options still shows up for ?wanted=true but without context which I think is sort of confusing. Ideally the quick checkout would just take you to the 1. Option.
- Here's a list of sanctioned countries by Paddle - this might give some insight why certain countries can't pay on Gumroad.com: https://www.paddle.com/help/legal/sanctions/which-countries-are-supported-by-paddle