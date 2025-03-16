<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


Website Polish Problems [Mar 2025] 
    (Is there a better place for this?)
    - [ ] FeatureCards still get permanently squished sometimes when opening/closing them quickly. But it seems rare.
    - [ ] When you load the 404 page, the locale picker is empty at first.
    - [ ] When you hit Command-F in Safari or resize the window, the quotes disappear until you scroll.    
    - [ ] On some window sizes, the green splash in the price section is not under a card which looks weird.
    - [ ] Website banner in Safari 'Suggestions' is just a blue splash
          -> Nobody except me will ever visit this site often enough to see that.
    - [ ] Why is spacing after 'Andriy Babkin' smaller than after other names?
          -> Doesn't happen in Chrome -> Safari rendering issue?
    - [x] I observed quote cards flickering when you close them because the video goes black immediately.
          (My gut feeling is that this might potentially only happen in locally hosted debug builds?)
          -> Randomly went away – Weird one-off Safari issue?
    - [x] The header text animations are choppy and shitty when using `#` links like http://localhost:3000/#price
          -> Randomly went away – Maybe my computer was overheated?
 -->

<template>
  <div ref="rootElement">

    <!-- Debug Stuff -->

    <!-- <div class="w-full h-[200px] bg-red-700">200px</div> -->

    <!-- Debug Buttons -->

    <p class="hidden fixed top-[15rem] w-full pointer-events-none">This is a work in progress. Visit <a href="https://mousefix.org" style="color:blue">mousefix.org</a></p>
    <div class="hidden items-end justify-center fixed left-0 top-[15rem] w-full h-[10rem] z-50">
      <div class="bg-red-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.killIntroAnimation()">
        <p class="text-white text-center">Kill Intro</p>
      </div>
      <div class="bg-green-500 rounded-[20px] w-fit h-fit py-[0px] px-[7px] m-[20px] cursor-pointer select-none z-50" @click="$refs.intro.recreateIntroAnimation()">
        <p class="text-white text-center">Reload Intro</p>
      </div>
    </div>

    <!-- Intro -->
    
    <Intro ref="intro"/>

    <!-- Post-intro --> 
    <!-- Initialize this to low opacity, to hide that scroll position changes twice - once to restore scroll position and another time after intro animation has loaded. 
            Edit: We're now delaying when the scroll position is set inside app/router.options.ts, so in most cases we don't need this. But there is one case: When we open a new tab in Chrome and then go to a hash link. In that case chrome goes to the hashlink immediately, and then a moment later, after the introAnimation as loaded, the vue router sets the proper scroll position. And if we don't hide the afterIntro content during this it looks janky Edit: In Safari on first page load the position never corrects to the proper one. Edit: By setting hashMode to false in the nuxt routerconfig, now it works I think. -->

    <div ref="afterIntro" class="opacity-0"> 

      <!-- Replaces Trackpad -->
      
      <div class="">

        <div class="relative">
          <!-- Section head -->
          <SectionHeader id="trackpad" class="strong:gradient-blue strong:filter strong:brightness-[1.0]">

            <template #title>
              <span class="fadeeet-trigger">
                <StringF>
                  {{ 
                  MFLocalizedString(
                    `
                    Macs Are Best
                    With a {dev}.
                    `,
                    'trackpad.intro.title',
                    `
                    {dev} is replaced with the trackpad.intro.title.device1 or trackpad.intro.title.device2 strings.
                    There will be a cool animation where the device1 string is replaced with the device2 string.
                    
                    Caution:
                    
                    Make sure the sentence is grammatically correct no matter if device1 or device2 is inserted for {dev}.

                    That means, if your language has gendered articles (like German "einem/einer"), include those articles in device1/device2. 
                    German example:
                    Main string: "Macs sind am besten mit {dev}."
                    device1: "einem **Trackpad**"
                    device2: "einer **Maus**"
                
                    If there are no such grammar rules, device1/device2 can just be the device terms.
                    English example:
                    Main string: "Macs Are Best With a {dev}."
                    device1: "**Trackpad**"
                    device2: "**Mouse**"
                
                    General Translation Tip:
                    If you sort the strings by their key, they will appear in the same order as they do on the website (macmousefix.com).
                    So you can easily use the website as a reference while translating.
                    (You might be translating a development version with some differences to the live website.)
                    `
                  ) 
                  /* Notes:
                    - Assumptions we're making:
                      [Mar 2025] I asked Claude to translate this to dozens of different languages, and:
                      1. the only part of the sentence that ever has to be replaced is Trackpad -> Mouse, plus, in some languages (like German and French), also the gendered article directly before Trackpad/Mouse.
                        -> If we had to swap out words not directly before/after the word Trackpad/Mouse, then our code probably won't work.
                      2. The translation for Trackpad is always longer than the translation for Mouse.
                        -> If a translation for Mouse is ever longer, then our animations will probably look janky.
                  */
                  }}
                  
                  <template #dev>
                    <div class="inline-grid justify-items-center overflow-visible">
                      <span class="col-start-1 col-end-1 row-start-1 row-end-1 overflow-visible text-nowrap flex justify-center replaceee-0">
                        <span class="strong:font-weight-inherit strong:text-gradient-to-l-block strong:gradient-blue strong:brightness-[1.43] strong:filter strong:hue-rotate-[0deg] strong:grayscale">
                          <StringF> 
                            {{ mdrf(MFLocalizedString('**Trackpad**', 'trackpad.intro.title.device1', '')) }}
                          </StringF>
                        </span>
                      </span>
                      <span class="col-start-1 col-end-1 row-start-1 row-end-1 replaceee-1">
                        <span class="strong:font-weight-inherit strong:text-gradient-to-l-block strong:gradient-blue strong:brightness-[1.43] strong:filter strong:hue-rotate-[0deg]">
                          <StringF> 
                            {{ mdrf(MFLocalizedString('**Mouse**', 'trackpad.intro.title.device2', '')) }}
                          </StringF>
                        </span>
                      </span>
                    </div>
                  </template>
                </StringF>
              </span>
            </template>

            <template #body>
              <span class="fadeeet fadeeet-trigger strong:text-gradient-to-l">
                <StringF>
                  {{ mdrf(MFLocalizedString(
                    `Times change. Mac Mouse Fix brings all features of an Apple Trackpad - and more - to your **precise** and **ergonomic** third-party mouse. And all interactions feel just as **smooth** and **natural** as they do on a Trackpad.`,
                    'trackpad.intro.body',
                    `
                    Background:
                    Text wrapped in **asterisks** will get a cool color highlight on the page! 
                    We use quite a lot of **asterisks** to make the page more colorful and visually interesting, but also to make the text easier to understand when the reader is just skimming through.
                    `,
                  )) }}
                </StringF>
              </span>
            </template>

          </SectionHeader>
          <!-- Color splash -->
          <div class="hidden absolute top-0 bottom-0 left-[50%] translate-x-[-50%] w-[100vw]">
            <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] relative left-[-15rem] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.7] filter hue-rotate-[0deg]"/>
          </div>
        </div>

        <CardContainer class="strong:text-gradient-to-l gradient-blue strong:filter ch-[.card-title_strong]:brightness-[1.15]" title-class="strong:filter strong:brightness-[1.2] strong:hue-rotate-[0deg]">

          <template #title>
            <span class="fadeeet">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `**Trackpad Gestures** that Mac Mouse Fix brings to your mouse`, 
                  'trackpad.gestures.header', 
                  ''
                )) }}
              </StringF>
            </span>
          </template>

          <template #disclaimer>
            {{ mdrf(MFLocalizedString(
              `
              Note: Mac Mouse Fix can bring these Trackpad features to your third-party mouse as described here, only if your mouse has at least 5 buttons. These 5 buttons are typically left-click, right-click, mouse-wheel click, and 2 side-buttons. If your mouse has fewer than 5 buttons, Mac Mouse Fix still provides rich functionality and a great experience, but some features will be less easy to access compared to a 5-button mouse. On certain mice designed to be used with proprietary driver software like Logitech Options, Mac Mouse Fix can't recognize all the buttons at the moment. Mac Mouse Fix does not currently support the Apple Magic Mouse.
              `, 
              'trackpad.gestures.disclaimer', 
              ''
              /* Note to self: Maybe we should have information about all these caveats on a more info page, instead of here. */
            )) }}
          </template>

          <div class="w-full flex justify-center">
            <div class="relative flex flex-col items-center w-fit">
              <div class="absolute inset-0 -z-10 pointer-events-none">
                <NuxtImg :src="colorSplashImagePath" ref="trackpadSplash1" alt="" class="f-w-[110rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]"/>
                <NuxtImg :src="colorSplashImagePath" ref="trackpadSplash2" alt="" class="f-w-[110rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8]"/>
              </div>

              <!-- <hr ref="trackpadRule" class="mb-[2.25rem] mx-[12px] border-neutral-950/[0.066]"> -->
              <div ref="trackpadCardsSection1" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] relative z-[10]">
                
                <!-- Trackpad cards pt 1 -->

                <NormalFeatureCard :videoPath="lookupDemoPath"               class="w-fit">
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Look up and Quick Look`, 'trackpad.gestures.lookup.title', '')) }}
                  </template>
                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        **Click button 4** on your mouse to look up a word in the dictionary, preview websites in Safari or files in Finder, and more.

                        It works just like tapping with 3 fingers or force clicking on an Apple Trackpad.
                        `, 
                        'trackpad.gestures.lookup.body', 
                        `Tip: For Apple-specific terms like 'Quick Look' or phrases like 'tapping with 3 fingers', you can usually find official translations on Apple's support pages, marketing sites or inside System Settings.`
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="missionControlDemoPath"       class="w-fit">
                  
                  <template #title>
                    {{ MFLocalizedString(`Mission Control`, 'trackpad.gestures.mission-control.title', '') }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 4** on your mouse, then **drag** the mouse **up** to see an overview of your open windows, applications, and desktops.

                        It works just like swiping up with four fingers on an Apple Trackpad.
                        `,
                        'trackpad.gestures.mission-control.body', 
                        ''
                      ), {}, false) }}
                    </StringF>  
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="moveDesktopsDemoPath"         class="w-fit">
                  <template #title>
                    {{ MFLocalizedString(`Move between desktops`, 'trackpad.gestures.spaces.title', '') }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 4** on your mouse, then **drag** the mouse **left** or **right** to move to another desktop or fullscreen-app.

                        It works just like swiping left or right with four fingers on an Apple Trackpad.
                        `,
                        'trackpad.gestures.spaces.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="appExposeDemoPath"            class="w-fit">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`App Exposé`, 'trackpad.gestures.app-expose.title', '')) }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 4** on your mouse, then **drag** the mouse **down** to see all windows of the app you're using.

                        It works just like swiping down with four fingers on an Apple Trackpad.
                        `,
                        'trackpad.gestures.app-expose.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="showDesktopDemoPath"          class="w-fit">
                  
                  <template #title>
                    {{ MFLocalizedString(`Show desktop`, 'trackpad.gestures.show-desktop.title', '') }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 4** on your mouse, then **scroll up** to show your desktop.

                        It works just like spreading your thumb and three fingers apart on an Apple Trackpad.
                        `,
                        'trackpad.gestures.show-desktop.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="launchpadDemoPath"            class="w-fit">
                  
                  <template #title>
                    {{ MFLocalizedString(`Launchpad`, 'trackpad.gestures.launchpad.title', '') }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 4** on your mouse, then **scroll down** to display Launchpad.

                        It works just like pinching your thumb and three fingers together on an Apple Trackpad.
                        `,
                        'trackpad.gestures.launchpad.body', 
                        ``
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>  
              </div>
              
              <!-- Trackpad cards separator -->
              <div class="w-full">
                <hr ref="trackpadRule" class="my-[2.25rem] mx-[2.5rem] border-t-[1px] border-neutral-950/[0.05]">
              </div>

              <div ref="trackpadCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] relative z-[9]">

                <!-- Trackpad cards pt 2 -->

                <NormalFeatureCard :videoPath="zoomDemoPath"                  class="">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Zoom in or out`, 'trackpad.gestures.zoom.title', '')) }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 5** on your mouse, then **scroll up** or **down** to zoom in or out in apps like Safari and Preview.

                        It works just like pinching with two fingers on an Apple Trackpad.
                        `, 
                        'trackpad.gestures.zoom.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="backAndForwardDemoPath"        class="">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Go back and forward`, 'trackpad.gestures.pages.title', '')) }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 5** on your mouse, then **drag** the mouse **left** or **right** to show the previous or next page in apps like Safari.

                        It works just like swiping left or right with two fingers on an Apple Trackpad.
                        `, 
                        'trackpad.gestures.pages.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="deleteMailsDemoPath"           class="">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Delete mails quickly and more`, 'trackpad.gestures.mail-actions.title', '')) }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 5** on your mouse, then **drag** the mouse **left** or **right** to delete messages in Mail, quickly reply to an iMessage, and more.

                        Any gesture you can perform inside an app by swiping on an Apple Trackpad works just as well using Mac Mouse Fix.
                        `, 
                        'trackpad.gestures.mail-actions.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="threeSixtyScrollDemoPath"      class="">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Precise 360° scrolling`, 'trackpad.gestures.free-scroll.title', '')) }}
                  </template>

                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Hold down **button 5** on your mouse, then **drag** the mouse in **any direction** to precisely scroll with 360° freedom and an intuitive inertial effect. So you can navigate the canvas with ease in pro apps like Excel or Affinity Photo.

                        It's just as easy and precise as scrolling on an Apple Trackpad.
                        `, 
                        'trackpad.gestures.free-scroll.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="smartZoomDemoPath"             class="">
                  
                  <template #title>
                    {{ mdrf(MFLocalizedString(`Smart zoom`, 'trackpad.gestures.smart-zoom.title', '')) }}
                  </template>
                  
                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        **Click button 5** on your mouse to zoom in and back out of a webpage or PDF.

                        It works just like double-tapping with two fingers on an Apple Trackpad.
                        `, 
                        'trackpad.gestures.smart-zoom.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      <!-- Scrolling -->
      <div class="strong:text-gradient-to-l">
        <SectionHeader id="scroll" class="gradient-violet" >
          
          <template #title>
            <span class="fadeeet-trigger">
              <StringF>
                {{ MFLocalizedString(
                  `
                  {accent}.
                  Smooth As Butter.
                  `,
                  'scroll.intro.title', 
                  '{accent} is replaced with the scroll.intro.body string'
                ) }}
                <template #accent>
                  <span class="move-righttt text-gradient-to-l-block filter brightness-[1.06]">
                    {{ MFLocalizedString(`Scrolling`, 'scroll.intro.title.accent', '') }}
                  </span>
                </template>
              </StringF>
            </span>
          </template>

          <template #body>
            <span class="fadeeet fadeeet-trigger">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `Scrolling with a third-party mouse on macOS can feel **stuttery** and **hard to control**. Well, not any more! Experience a **refined**, **momentum-based** scrolling algorithm that makes navigating your computer **effortless** and **natural**.`,
                  'scroll.intro.body',
                  ``,
                )) }}
              </StringF>
            </span>
          </template>

        </SectionHeader>
        
        <CardContainer class="gradient-violet var-[accent-rotate=30deg] strong:filter ch-[.card-sm_strong]:brightness-[0.93] mb-[5rem] z-[10]">

          <template #title>
            <span class="fadeeet">
              <StringF>{{ mdrf(MFLocalizedString(
                `Choose a **Scrolling Smoothness** ...`, 
                'scroll.smoothness.header', 
                `
                This forms sort of a sentence with the next header (scroll.more.header)
                
                You can see this in context at macmousefix.com/#scroll
                `
                )) }} </StringF>
            </span>
          </template>

          <div class="w-fit relative left-[50%] translate-x-[-50%] fadeeet-trigger">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[130rem] f-h-[70rem] absolute left-[25%] top-[40%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]"/>
            </div>
            <div ref="scrollingCardsSection1" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
              
              <NormalFeatureCard :videoPath="smoothnessHighDemoPath" class="">
                <template #title>
                <StringF>{{ mdrf(MFLocalizedString(`Smoothness: **High**`, 'scroll.smoothness.high.title', '')) }}</StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      With *Smoothness: High*, scrolling feels **incredibly smooth** - **just like a Trackpad**. Details like the subtle bounce at the end of a page make for a dynamic and pleasant feel. Still, scrolling is super responsive and easy to control. With this option, you can also scroll large distances very easily.
                      `,
                      'scroll.smoothness.high.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard :videoPath="smoothnessRegularDemoPath" class="">
                <template #title>
                  <StringF>{{ mdrf(MFLocalizedString(`Smoothness: **Regular**`, 'scroll.smoothness.regular.title', '')) }}</StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Choose *Smoothness: Regular* for **highly responsive** scrolling that **feels like you're directly pushing the page with your finger**. The short, momentum-based animations provide a refined feel.

                      This option feels similar to scrolling in Chrome or modern Windows apps.
                      `,
                      'scroll.smoothness.regular.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard :videoPath="smoothnessOffDemoPath" class="">
                <template #title>
                  <StringF>{{ mdrf(MFLocalizedString(`Smoothness: **Off**`, 'scroll.smoothness.off.title', '')) }} </StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      With *Smoothness: Off*, scrolling works as it normally does under macOS - **without any animation** or smoothing. But with one key difference: **One increment of the scroll wheel will scroll a set number of *lines***, rather than just a few pixels, making navigation more consistent and comfortable.

                      This is how scrolling also works in most apps on Windows and Linux, as well as older macOS versions.
                      `,
                      'scroll.smoothness.off.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

            </div>
          </div>
        </CardContainer>

        <CardContainer class="gradient-violet var-[accent-rotate=30deg] strong:filter ch-[.card-sm_strong]:brightness-[0.93] z-[9]">

          <template #title>
            <span class="fadeeet">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `... And **More**`, 
                  'scroll.more.header', 
                  ``
                )) }}
              </StringF>
            </span>
          </template>

          <div class="w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[130rem] f-h-[70rem] scale-[1] absolute left-[66%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.6] filter hue-rotate-[60deg]"/>
            </div>
            <div ref="scrollingCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] my-[0] w-fit">
              
              <NormalFeatureCard class="">
                <template #title>
                  {{ mdrf(MFLocalizedString(`Scrolling direction`, 'scroll.more.reverse.title', '')) }}
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Mac Mouse Fix lets you **change the scrolling direction** of your mouse - independently from your Trackpad or Magic Mouse.
                      `,
                      'scroll.more.reverse.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard class="">
                <template #title>
                  {{ mdrf(MFLocalizedString(`Keyboard modifiers`, 'scroll.more.modifiers.title', '')) }}
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Hold a keyboard modifier while scrolling to **scroll precisely**, **zoom in or out**, and more.
                      `,
                      'scroll.more.modifiers.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard class="">
                <template #title>
                  {{ mdrf(MFLocalizedString(`Simple yet powerful`, 'scroll.more.configurable.title', '')) }}
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      You can set up scrolling in Mac Mouse Fix in many different ways with just a few clicks. **All options you choose will feel great without fiddling**. Each scrolling enhancement provided by Mac Mouse Fix can also be turned off, if you prefer how things work natively in macOS.
                      `,
                      'scroll.more.configurable.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

            </div>
          </div>
        </CardContainer>
      </div>

      <!-- Action Table 
            Notes:
            - Thought about including a non-trackpad features section - but not enough features so far to warrant a whole section -->

      <div class="strong:text-gradient-to-l">
        <SectionHeader id="action_table"
                        class="gradient-red strong:filter strong:brightness-[1.0]" >
          
          <template #title>
            <span class="fadeeet-trigger">
              <StringF>
                {{ MFLocalizedString(
                  `
                  Amazingly {accent2}
                  {accent} Intuitive.
                  `,
                  'customization.intro.title', 
                  ''
                ) }}
                <template #accent>
                  <span class="italic"> 
                    {{ MFLocalizedString(`and`, 'customization.intro.title.accent', '') }} 
                  </span>
                </template>
                <template #accent2>
                  <span class="move-flexxx text-gradient-to-l-block filter brightness-[1.12] hue-rotate-[-0deg]">
                    {{ MFLocalizedString(`Flexible`, 'customization.intro.title.accent2', '') }}
                  </span>
                </template>
              </StringF>
            </span>
          </template>

          <template #body>
            <span class="fadeeet">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `Mac Mouse Fix lets you **do almost anything** you can think of - straight from your mouse! And yet, it's **remarkably easy** to use.`, 
                  'customization.intro.body', 
                  ``
                )) }}
              </StringF>
            </span>
          </template>

        </SectionHeader>


        <CardContainer class="gradient-red var-[accent-rotate=170deg] ch-[.card-title_strong]:brightness-[1.0] strong:brightness-[0.95]">
          <div class="relative">
            <div class="relative max-w-[70rem] left-[50%] translate-x-[-50%]">
              <div class="absolute inset-0 -z-10 pointer-events-none">
                  <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[75%] top-[25%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]"/>
                  <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[100rem] f-h-[80rem] absolute left-[25%] top-[75%] translate-x-[-50%] translate-y-[-50%] opacity-[0.9] filter hue-rotate-[120deg]"/>
              </div>
              <div ref="actionTableCardsSection" class="flex flex-col items-center gap-[5rem] py-[4.5rem]">

                <NormalFeatureCard :videoPath="actionTableDemoPath" class="w-full" content-class="par-[.isNotExpanded]:max-w-[50rem]" :image-path="actionTableImagePath" image-scaling-sizes="" image-class="w-[205%] sm:mt-[1rem] mt-[2rem] mr-[calc(-107%)] mb-[-35%] translate-x-[0rem]">
                  <template #title>
                    <span class="!font-[600]"><StringF>{{ mdrf(MFLocalizedString(`**Add Actions** to your mouse`, 'customization.action-table.title', '')) }}</StringF></span>
                  </template>
                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        To add an action to your mouse:

                        1. **Move** the mouse pointer inside the '+'-field. (Shown below)
                        2. **Click** the mouse button you want to assign an action to.
                        You can also Double Click, Click and Drag, and much more!
                        3. **Choose** an action, such as Smart Zoom.

                        And that's it!
                        `, 
                        'customization.action-table.body', 
                        `
                        Don't forget the linebreaks between the list-items, and inside the second list-item. 
                        That lets the website understand this is a list, and display it in a nice way. 

                        (Linebreaks can usually be entered with Option-Return, Shift-Return or just Return, depending on what program you're using.)
                        `
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

                <NormalFeatureCard :videoPath="keyboardShortcutDemoPath" class="w-full">
                  <template #expandButtonText>
                    {{ MFLocalizedString(`See How to Set It Up`, 'customization.keyboard-shortcuts.expand-button', '') }}
                  </template>
                  <template #title>
                    <span class="!font-[600]"><StringF>{{ mdrf(MFLocalizedString(`Use **Keyboard Shortcuts** from your mouse`, 'customization.keyboard-shortcuts.title', '')) }}</StringF></span>
                  </template>
                  <template #body>
                    <StringF>
                      {{ mdrf(MFLocalizedString(
                        `
                        Mac Mouse Fix lets you **do anything you can do with a keyboard shortcut** straight from your mouse. For example, you can copy and paste, change the audio volume, open a new tab in Safari, and much more.
                        `,
                        'customization.keyboard-shortcuts.body', 
                        ''
                      ), {}, false) }}
                    </StringF>
                  </template>
                </NormalFeatureCard>

              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      <!-- Price / Good Software -->

      <div class="strong:text-gradient-to-l ch-[a]:text-green-600 ch-[a]:font-[500]">
        <SectionHeader id="price" class="gradient-green strong:filter strong:brightness-[1.15]">
          
          <template #title>
            <span class="fadeeet-trigger">
              <StringF>
                {{ MFLocalizedString(
                  `
                  Great Software.
                  Great {accent2}.
                  `, 
                  'benefits.intro.title', 
                  ''
                ) }}
                <template #accent2>
                  <span class="move-growww text-gradient-to-l-block gradient-green filter brightness-[1.35]">
                    {{ MFLocalizedString('Price', 'benefits.intro.title.accent2', '') }}
                  </span>
                </template>
              </StringF>
            </span>
          </template>

          <template #body>
            <span class="fadeeet fadeeet-trigger">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `I strive to make Mac Mouse Fix a software that you can **feel great** about installing. I want to offer it as **cheaply** as possible, so you feel like you're getting a great deal and so that everyone can afford it. And ultimately, I hope to make this tiny corner of the world a little more **awesome** and nice!`, 
                  'benefits.intro.body', 
                  ''
                )) }}
              </StringF>
            </span>
          </template>

        </SectionHeader>
        
        <CardContainer class="gradient-green var-[accent-rotate=360deg] strong:filter ch-[.card-title_strong]:brightness-[1.2] ch-[.feature-card]:bg-neutral-50/[0.8] " title-class=" strong:filter strong:brightness-[1.2]">

          <template #title>
            <span class="fadeeet">
              <StringF>{{ mdrf(MFLocalizedString(
                `Great **Software** ...`, 
                'benefits.software.header', 
                `
                This forms sort of a sentence with the next header (benefits.pricing.header)
                
                You can see this in context at macmousefix.com/#price
                `)) }}</StringF>
            </span>
          </template>

          <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%] fadeeet-trigger">
            <div class="absolute inset-0 -z-10 pointer-events-none">
              <NuxtImg :src="colorSplashImagePath" alt="" class="f-h-[50rem] f-w-[100rem] absolute left-[33%] top-[33%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]"/>
            </div>
            <div ref="priceCardsSection1" class=" grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem] relative">
              
              <NormalFeatureCard class="">
                <template #title>
                  {{ mdrf(MFLocalizedString(`Unobtrusive. Lightweight. Beautiful.`, 'benefits.software.unobtrusive-lightweight.title', '')) }}
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Every detail of Mac Mouse Fix has been considered and optimized to give you the best possible experience while feeling like a **natural extension of your Mac**. I've invested countless hours to make sure that Mac Mouse Fix **uses no more battery or memory than absolutely necessary**. The goal is that you won't even notice Mac Mouse Fix on your computer - except of course, when using your mouse.
                      `,
                      'benefits.software.unobtrusive-lightweight.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard class="">
                <template #title>
                  {{ mdrf(MFLocalizedString(`Open source`, 'benefits.software.open-source.title', '')) }}
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      The source code of Mac Mouse Fix is available on GitHub, so everyone can see exactly how it works. This helps with the development, and it means you can be sure that Mac Mouse Fix is **secure** and **trustworthy**, that it protects your **privacy**, and that it doesn't do anything when it runs in the background - except bringing your mouse experience to the next level!
                      `,
                      'benefits.software.open-source.body', 
                      ''
                    ), {}, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

            </div>
          </div>
        </CardContainer>

        <CardContainer class="gradient-green var-[accent-rotate=360deg] strong:filter ch-[.card-title_strong]:brightness-[1.2] ch-[.feature-card]:bg-neutral-50/[0.8] mt-[5rem]"   title-class="strong:filter strong:brightness-[1.2]">
          
          <template #title>
            <span class="fadeeet">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `
                  ... Great **Price**
                  `, 
                  'benefits.pricing.header', 
                  ``
                )) }}
              </StringF>
            </span>
          </template>
          
          <template #disclaimer>
            <span id="price.disclaimer">
              <StringF>
                {{ mdrf(MFLocalizedString(
                  `
                  Note on price: The price of **{price}** does not include local taxes, which might have to be paid in your region. To see your total price, visit the [checkout page]({urlCheckoutPage}). If you pay on Gumroad.com via PayPal in a currency other than Euros, PayPal will charge an additional 4.5% currency conversion fee.

                  I would like to include these fees in the price - to make the buying experience simpler and clearer. But this is currently not possible due to limitations with the sales platform Gumroad.com. I hope the price still feels very fair and cheap.
                  `,
                  'benefits.pricing.disclaimer', 
                  ''
                ), { ...dynamicUIStrings, ...{ urlCheckoutPage: 'https://noahnuebling.gumroad.com/l/mmfinappusd?wanted=true::newTab' } }) }} <!-- Note: [Mar 2025] If you remove the space betwen the 3rd and 4th last closing braces, the whole app breaks! Webdev is crazyy. -->
              </StringF>
            </span> <!-- /* The price.disclaimer id lets us link to the disclaimer using macmousefix.com/#<disclaimerId> -->
          </template>

          <div class="flex justify-center w-fit relative left-[50%] translate-x-[-50%]">
            <div class="absolute inset-0 -z-10 pointer-events-none">
                <NuxtImg :src="colorSplashImagePath" alt="" class="f-w-[150rem] f-h-[75rem] absolute left-[75%] top-[66%] translate-x-[-50%] translate-y-[-50%] opacity-[0.8] filter invert hue-rotate-[125deg]"/>
            </div>
            <div ref="priceCardsSection2" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.5rem] pb-[4.5rem]">
              
              <NormalFeatureCard class="">
                <template #title>
                  <StringF>{{ mdrf(MFLocalizedString(`Free for **{trialDays} Days**`, 'benefits.pricing.free-days.title', ''), dynamicUIStrings) }}</StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Mac Mouse Fix is free for {trialDays} days. Your **free days are only used up when you actually use the app**. That way you can get the most out of your free days - without any stress.
                      `,
                      'benefits.pricing.free-days.body', 
                      ''
                    ), dynamicUIStrings, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard class="">
                <template #title>
                  <StringF>{{ mdrf(MFLocalizedString(
                    `**{price}** to own`, 
                    'benefits.pricing.price.title', 
                    ''
                  ), dynamicUIStrings) }}</StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Mac Mouse Fix costs {price} ([+ taxes]({urlTaxes})) to own - and that's it. There are no subscriptions or additional payments. I made sure the checkout experience is as **nice** and **quick** as possible, and you can even pay with **Apple Pay**!

                      To buy the app, click the button in the app, or click [here]({urlBuyApp}).
                      `,
                      'benefits.pricing.price.body', 
                      ''
                    ), { ...dynamicUIStrings, ...{ urlTaxes: '#price.disclaimer', urlBuyApp: 'https://noahnuebling.gumroad.com/l/mmfinappusd::newTab' } }, false) }}
                  </StringF>
                </template>
              </NormalFeatureCard>

              <NormalFeatureCard class="">
                <template #title>
                  <StringF>{{ mdrf(MFLocalizedString(`Better value than the **Alternatives**`, 'benefits.pricing.alternatives.title', ''), dynamicUIStrings) }}</StringF>
                </template>
                <template #body>
                  <StringF>
                    {{ mdrf(MFLocalizedString(
                      `
                      Mac Mouse Fix makes your $10 mouse better than a Logitech MX Master mouse or an Apple Trackpad. (These are considered some of the best input devices for Macs.)

                      And yet, Mac Mouse Fix is **[{priceFactorMXMaster}x]({urlMXMaster})** cheaper than an MX Master and **[{priceFactorTrackpad}x]({urlTrackpad})** cheaper than a Trackpad!
                      `,
                      'benefits.pricing.alternatives.body', 
                      `
                      {priceFactorMXMaster} will get replaced by how many times more expensive the MX Master is compared to Mac Mouse Fix.
                      
                      The 'x' right after stands for 'times'. E.g. '10x' means 'ten times'.
                      In other languages you'd use different symbols or words than 'x'.
                      E.g. '10x' is written as '10倍' in Chinese and '10 φορές' in Greek.
                      (Don't forget to add a space in languages like Greek, so it becomes '10 φορές' instead of '10φορές')
                      `
                      /* Note to self: I think it's grammatically wrong in English to capitalize 'Trackpad' in 'Apple Trackpad', but I think it looks better. */
                    ), dynamicUIStrings, false) 
                    }}
                  </StringF>
                </template>
              </NormalFeatureCard>


              <div class="hidden sm:col-span-1 md:col-span-2 col-span-3 w-full flex justify-center">
                <!-- Download counter was here -->
              </div> 
            </div>
          </div>
        </CardContainer>
      </div>

        <!-- 'alternatives.mx-master-rant'
          'pay-reason.pity'
          'pay-reason.open-source-indie' -->

      <!-- Bottom Nav
           Notes:
            - The hex colors used here are based on tailwinds green-500 with slight brightness adjustments using oklch.com
            - bottomNav should be in 'afterIntro', so it's hidden before the has loaded (since the whole layout shifts after the intro has loaded.)
      -->
      <BottomNav/>

    </div> <!-- End of 'afterIntro' div.  -->
  </div>
</template>

<script setup lang="ts">

import { roundTo } from "~/utils/util"
import licenseConfig from "~/assets/licenseinfo/config.json"

const MXMasterPrice = 99.99
const trackpadPrice = 129.00 

const priceRaw = licenseConfig["price"] / 100;

const price = '$' + String(priceRaw);
const trialDays = licenseConfig["trialDays"];

const priceFactorMXMaster = roundTo(MXMasterPrice / priceRaw, 5, 0, Math.floor);
const priceFactorTrackpad = roundTo(trackpadPrice / priceRaw, 5, 0, Math.floor);
const urlMXMaster = 'https://www.logitech.com/products/mice/mx-master-3s::newTab';    // Adding ::newTab to the end of the link makes the MMF Website open the link in a new tab!
const urlTrackpad = 'https://www.apple.com/shop/mac/accessories/mice-keyboards::newTab';
const taxEstimateLow = 0.05;
const taxEstimateHigh = 0.25;
const afterTaxPriceEstimateLow = roundTo(priceRaw * (1 + taxEstimateLow), 0.01, 2, Math.round);
const afterTaxPriceEstimateHigh = roundTo(priceRaw * (1 + taxEstimateHigh), 0.01, 2, Math.round);

const dynamicUIStrings = {
  price: price,
  trialDays: trialDays,
  urlMXMaster: urlMXMaster,
  urlTrackpad: urlTrackpad,
  priceFactorMXMaster: priceFactorMXMaster,
  priceFactorTrackpad: priceFactorTrackpad,
  taxEstimateLow: taxEstimateLow*100,
  taxEstimateHigh: taxEstimateHigh*100,
  afterTaxPriceEstimateLow: afterTaxPriceEstimateLow,
  afterTaxPriceEstimateHigh: afterTaxPriceEstimateHigh,
}

/* Import plugin stuff */
const { $gsap, $ScrollTrigger, $Power4, $Power3, $Power2, $Power1, Power0, $isFirefox } = useNuxtApp()

/* Import i18n stuff
    Note: Why can't we use $i18n in ts like we do in html? */

// const { setLocale, locale, defaultLocale } = useI18n() 
// const $mt = useMT()
// import { $mt } from '~/utils/markdownTranslate'

/* Import quote stuff */

import { getUsableQuotes } from "../utils/quotes"
const quotes = getUsableQuotes()

/* Import other stuff */

const { $coolI18n: { MFLocalizedString, mdrf } } = useNuxtApp();

import { remInPx } from '~/utils/util';
import { type Ref } from 'vue'
import { linearFadingEase, customInOutEase, criticalSpring, spring } from '~/utils/curves'

/* Manually import video assets
    Notes on manually importing assets:
    - We're manually importing the assets, because we need to store them in vars and pass them to children. When using a plaintext URL instead of a variable for the img tag's src, then nuxt seems to import that automatially. 
      - According to https://stackoverflow.com/a/75012154, we also don't need to manually import images for <NuxtImg>, but I haven't tested that so far.
    - I feel like this is way too cumbersome. oad We know in advance which videos to import anyways (so we don't need 'dynamic' imports which should make it even easier) so why do we have to manually import in code? It should automatically import the static assets we use.
    Also See: https://stackoverflow.com/questions/75218697/nuxt-dynamic-image-require-is-not-defined
*/

import threeSixtyScrollDemoPath from '../assets/video/demos/360-scroll.mp4'
import actionTableDemoPath from '../assets/video/demos/action-table.mp4'

import appExposeDemoPath from '../assets/video/demos/app-expose.mp4'
import backAndForwardDemoPath from '../assets/video/demos/back-and-forward.mp4'
import deleteMailsDemoPath from '../assets/video/demos/delete-mails.mp4'

import keyboardShortcutDemoPath from '../assets/video/demos/keyboard-shortcut.mp4'

import launchpadDemoPath from '../assets/video/demos/launchpad.mp4'
import lookupDemoPath from '../assets/video/demos/lookup.mp4'
import missionControlDemoPath from '../assets/video/demos/mission-control.mp4'
import moveDesktopsDemoPath from '../assets/video/demos/move-desktops.mp4'
import showDesktopDemoPath from '../assets/video/demos/show-desktop.mp4'

import smartZoomDemoPath from '../assets/video/demos/smart-zoom.mp4'
import smoothnessHighDemoPath from '../assets/video/demos/smoothness-high.mp4'
import smoothnessOffDemoPath from '../assets/video/demos/smoothness-off.mp4'
import smoothnessRegularDemoPath from '../assets/video/demos/smoothness-regular.mp4'
import zoomDemoPath from '../assets/video/demos/zoom.mp4'

/* Manually import image assets */

const actionTableImagePath = '/mmf-on-studio-display-5.png'
const colorSplashImagePath = '/color-splash.png'

/* Get global store */
import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()

/* Get refs */

const rootElement = ref<HTMLElement | null>(null);

const intro = ref<HTMLElement | null>(null);
const afterIntro = ref<HTMLElement | null>(null);

const trackpadCardsSection1 = ref<HTMLDivElement | null>(null);
const trackpadCardsSection2 = ref<HTMLDivElement | null>(null);
const trackpadSplash1 = ref<HTMLElement | null>(null);
const trackpadSplash2 = ref<HTMLElement | null>(null);
const trackpadRule = ref<HTMLElement | null>(null);

const scrollingCardsSection1 = ref<HTMLElement | null>(null);
const scrollingCardsSection2 = ref<HTMLElement | null>(null);
const actionTableCardsSection = ref<HTMLElement | null>(null);
const priceCardsSection1 = ref<HTMLElement | null>(null);
const priceCardsSection2 = ref<HTMLElement | null>(null);

/* Other vars */
const sectionToTimelineMap = new Map<Ref<HTMLElement | null>, gsap.core.Timeline>()
var fadeTimelines: Array<gsap.core.Timeline> = []

// Declare Elements that should get parallax effect
//  Don't do this on Firefox, because the framerate is super low when the Feature Cards are in view. Not sure if disabling parallax helps noticably.
var parallaxElements = $isFirefox ? [] : [trackpadCardsSection1, trackpadCardsSection2, scrollingCardsSection1, scrollingCardsSection2, actionTableCardsSection, priceCardsSection1, priceCardsSection2]

onMounted(() => {


  /*  Turn off scrolling 
        Notes: 
        - We already set `overflow-y-hidden` in tailwind.css, which turns off scrolling after the initial page load, but after a page transition (e.g. locale switch), we need to programmatically turn off scrolling.
  */
  if (import.meta.client) {
      document.documentElement.style.overflowY = 'hidden'; 
  };

  // Add parallaxElements
  //  Currently unused
  //  Not sure this is the best place to put this
  for (const element of Array.from(document.getElementsByClassName('parallax'))) {
    parallaxElements.push(ref(element as HTMLElement)) 
  } 

  console.debug(`Index: Setting up introAnimationId watcher...`);
  watch(() => global.introAnimationId, (newValue) => {

    console.debug(`Intro is ready: ${ newValue }`)

    if (newValue == 0) { return }

    requestAnimationFrame(() => { 
      
      // Discussion:
      //  - We delay using `requestAnimationFrame()` so the opacity is set to 1.0 after (instead of before) router.option.ts has set the scroll position. 
      //      Might need to change this if we update router.option.ts. Very hacky. 
      //  - Afaik, we turn off scrolling and hide everything before the intro is loaded, because the intro will change height after it's loaded.
      //      (that's because it dynamically calculates the structure and length of the scroll-linked intro animation)
      //      This shifts all the following content (Should be everything inside the `afterIntro` div) down. 
      //      A more elegant solution might be to - instead of hiding and locking everything - to simply shift the browser's scroll position after the intro has loaded,
      //      to compensate for the shift of the `afterIntro` content. (So that from the users perspective, they don't see the content moving around after the intro has loaded)
      //  - Based on looking at console-logs, the loading of the intro actually takes almost no time. The thing that's causing a noticable delay until the page is unhidden, and unlocked, 
      //      is that we're waiting for the page to be hydrated before the intro is loaded. So we're kind of undoing the benefits of nuxt's static site generation, by simply hiding all 
      //      the static, 'server-side generated' aka 'pre-rendered', aka 'SSG' content, and only showing stuff, once the 'client-side-rendering' has finished. 
      //      However, since we don't hide the intro itself, the big MMF logo with the download button at the very top of the page, is prerendered and shown to the user immediately after page-load, 
      //      so we do get some nuxt-SSG benefits there.
      
      // Make visible
      afterIntro.value!.style.opacity = '1.0';

      // Enable scrolling
      //  Note: `overflow-y-hidden` is set in tailwind.css
      document.documentElement.style.overflowY = 'scroll';
    });

    if (false /* newValue > 1 */) {
      // Refresh scrollTriggers
      // Discussion: In theory, we only have to refresh the scroll triggers when the intro animation updates (and changes height), but when we tried to refresh the scrollTriggers there was always a flicker or it didn't work at all. We tried doAfterRender() doBeforeRender() and gsap.ticker.add(..., true, false). So instead we're just completely recreating the animations every time now. That prevents the flicker. 
      //              -> Update! maybe setting invalidateOnRefresh on the scrollTriggers would prevent us from having to recreate the animations everytime
      $gsap.ticker.add(() => {
        for (const section of parallaxElements) {
          const tl = sectionToTimelineMap.get(section)
          if (tl != null) {
            tl.scrollTrigger!.refresh()
          }
        }
      }, true, false)
      return
    }

    /* Delete existing animations */

    for (const section of parallaxElements) {
      const tl = sectionToTimelineMap.get(section)
      if (tl != null) {
        killScrollTriggerAnimation(tl)
        sectionToTimelineMap.delete(section) // Not sure if necessary
      }
    }
    while (true) {
      if (fadeTimelines.length == 0) { break }
      const tl = fadeTimelines.pop()
      killScrollTriggerAnimation(tl)
    }

    /* Respect reduce motion */
    if (prefersReducedMotion()) { return }

    /* Create scroll-linked parallax animations for parallaxElements */
    
    const parallaxOffset = '4rem'

    for (const section of parallaxElements) {

      const tlTrack = $gsap.timeline({ scrollTrigger: {
        trigger: section.value!,
        pin: false,
        start: "top bottom", // Top of element, bottom of viewport
        end: `bottom top`,
        scrub: 0.0, // Smooth scrubbing, takes x second to "catch up" to the scrollbar
        markers: false, // Debug
      }})

      tlTrack.fromTo(section.value!,  { translateY: parallaxOffset }, { translateY: '-' + parallaxOffset, duration: 1, ease: 'linear' }, 0)

      sectionToTimelineMap.set(section, tlTrack)
    }

    /* Create fade-in animations for titles and bodys 
    
      Discussion: 
      - [Mar 2025] We used to use simple fade-in for everything. now we added cooler animations like the move-uppp, flexxx. But the fade animations still have some use.
      - One of the core ideas behind the website design is to only have one large piece of text shown at a time, almost like a video or presentation slides.
           This should guide the viewers attention and creates sort of a 'story-telling' or 'question-reveal' aspects to the website.
      - To achieve this we're only fading in the next text, once the previous piece of content has been scrolled past the center of the screen.
        This also has the nice effect that when you scroll the section titles (such as "Scrolling. Smooth as Butter") to the middle of the screen, there's nothing else on the screen, which looks really clean and like a presentation slide.
        - Alternative: We could also remove the fade-in but just space the content further apart based on screen-size, but that would require more scrolling, which might be annoying.
    
      Problems:
        - I felt like the text fade-in makes the website feel more 'fuzzy', less 'solid', maybe more mentally taxing to navigate. 
          It felt similar to having very low contrast, no/light shadows and thin lines for 'elegance' which also gives me this 'less solid' feel (the iOS 7 effect.)
          But as of [Mar 2025] I really like the fade-in again. (Seems to change from day-to-day) So I'll leave it for now.
      
      Notes:
        - `fadeeet` stands for: fade with separate (t)rigger
      */

    if ((true)) {
      
      const fadeTriggers: Array<Element> = Array.from(rootElement.value!.getElementsByClassName('fadeeet-trigger'))
      const toFade: Array<Element> = Array.from(rootElement.value!.getElementsByClassName('fadeeet'))
      let len = fadeTriggers.length;
      console.assert(fadeTriggers.length == toFade.length, `number of fade trigger elements (${fadeTriggers.length}) doesn't match number of faded elements (${toFade.length}).`)

      for (let i = 0; i < len; i++) {
        const tlFade = $gsap.timeline({ scrollTrigger: {
          trigger: fadeTriggers[i],
          pin: false,
          start: "bottom 50%", //  Note: [Mar 2025] We used to use "center 42.5%", but that kinda broke on mobile where the <NormalFeatureCard> containers wrap. Alternatively we could've set 'fadeeet-trigger' on the last feature card in the container instead of the entire container.-->
          end: "bottom 10%",
          scrub: false,
          toggleActions: 'play none none reverse', 
          markers: false,
        }})
        tlFade.fromTo(toFade[i], { opacity: '0' }, { opacity: '1', duration: 0.33, ease: linearFadingEase(1) }, 0)
        fadeTimelines.push(tlFade)

      }
    }

    /* Create move-up animations for subtitles 
        I'm not quite sure if these are obnoxious, but it is sorta cool.
        On the SectionHeaders we just have big text on white background, so we have to make the animations a little exaggerated to make them visible, but that is a little nauseating. 
        
        Note on hasLittleSpace:
         The fade-in starts 0.2s later into the animation if `hasLittleSpace` is active. That way we don't see the start of the animation, 
         which is nice if there's elements close to the animated element which would otherwise overlap during animation. 
         Actually, I think we should always turn this on, because if there aren't elements close by as visual reference points, 
         then we have to have an exxagerated, fast-moving animation for it to be visually striking, and that is a bit nauseating. 
         I think it's perhaps better to just avoid animations unless there's a visual reference point. We ended up creating visual reference points, 
         by only animating the emphasized words of the text.

        Note:
          Use inline-block (or text-gradient-to-l-block) to make the .move-uppp animation work. (display: block is necessary for transforms to work.)
        */

    // Use css query
    //  Note: 
    //  - Gets all elements which either:
    //    1. Have class `move-uppp`
    //    2. Have a parent with class `strong:move-uppp` and themselves have class `strong` 
    //        (Note how the strong:some-class syntax is usually a custom tailwind variant implemented in tailwind.config.js, but move-uppp is not a tailwind class, so here we're kinda 'misappropriating' this syntax.)
    var toMoveUp:         Array<Element> = Array.from(rootElement.value!.querySelectorAll('.move-uppp, .strong\\:move-uppp strong')); // The double backslash `\\` is so colon `:` is interpreted as part of the class name, instead of the start of a `:pseudo-class`.
    var toMoveRight:      Array<Element> = Array.from(rootElement.value!.querySelectorAll('.move-righttt'));
    var toFlex:           Array<Element> = Array.from(rootElement.value!.querySelectorAll('.move-flexxx'));
    var toGrow:           Array<Element> = Array.from(rootElement.value!.querySelectorAll('.move-growww'));
    var toReplace:        Array<Element> = Array.from(rootElement.value!.querySelectorAll('.replaceee-0'));
    var toMoveee:         Array<Element> = [...toMoveUp, ...toMoveRight, ...toFlex, ...toGrow, ...toReplace];
    
    console.debug(`index: toMoveUp elements: ${objectDescription(toMoveee)}`)

    const animationStartOffset = `${18 * remInPx()}px`;

    for (const [i, element] of toMoveee.entries()) {

      if (!(element instanceof HTMLElement)) { continue; }

      // Get info from element
      const cs = getComputedStyle(element);

      // Get triggerElement and compensation
      // Explanations:
      //  On inline-block: At the time of writing, we only move-uppp specific spans of text inside longer paragraphs. To apply a transform to a text-span, it has to be set to `display: inline-block` afaik. 
      //    For these cases, we want to start the animation based on the scroll position of the parent paragraph, so the user can read the paragraph and then the 'blanks' are filled in at a controlled point.
      //    That's why here, we set the 'triggerElement' to the parent if the element has display: inline-block.
      //  On animationStartOffsetCompensation: For the move-uppp animation, we start the animated element in a moved-down position, and then, after its scrolled into view, we animate it into its proper position in the layout.
      //    However, the element being moved-down initially, changes the scroll position where the animation is started, since that scroll position is calculated relative to the `triggerElement` which we set equal to the animated element by default.
      //    To Remove this shift in the animamtion-start-scroll-position, we use `animationStartOffsetCompensation`.
      var animationStartOffsetCompensation = `-${animationStartOffset}`;
      var triggerElement = element;
      if (cs.display == 'inline-block') {
        triggerElement = element.parentElement ?? element;
        animationStartOffsetCompensation = '0px';
      }

      // Create placeholder
      //  For the missing text, before it's faded in. So the layout doesn't look broken when parts of the paragraph are just missing.
      
       var placeholder: HTMLDivElement | null = null;
       if ((false)) { // Gave up on placeholders. Too janky, can't get it right.

        const rect = { left: element.offsetLeft, top: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight };

        const placeholderID = `moveUpppPlaceholder-${i}`;
        const oldPlaceholder = element.parentElement?.querySelector(`#${placeholderID}`)
        if (oldPlaceholder && (oldPlaceholder instanceof Node)) {
          element.parentElement?.removeChild(oldPlaceholder);
        };

        placeholder = document.createElement('div');
        placeholder.id = placeholderID;

        // Style the placeholder to match the target element
        const hAdj = rect.height * -0.0; // Adjust height
        const wAdj = rect.width * +0.00; // Adjust width

        // element.style.paddingLeft = `${wAdj/2}px`;
        // element.style.paddingRight = `${wAdj/2}px`;

        placeholder.style.position = 'absolute';  // Position it absolutely
        placeholder.style.width = `${rect.width+wAdj}px`;  // Match width
        placeholder.style.height = `${rect.height+hAdj}px`;  // Match height
        placeholder.style.left = `${rect.left-(wAdj/2)}px`;  // Adjust for scroll position
        placeholder.style.top = `${rect.top-(hAdj/2)}px`;  // Adjust for scroll position
        placeholder.style.backgroundImage = cs.backgroundImage;
        // placeholder.style.filter = cs.filter; // Copies over hue-rotate, brightness, etc. from our colorful text spans.
        placeholder.style.borderRadius = '0.3em';
        placeholder.style.zIndex = '-5';  // Ensure it's behind the target element

        element.parentElement?.appendChild(placeholder);
      }

      if ((0)) {}
      else if (toReplace.includes(element)) {
        
        // Constants
        const anDelay = 0.5;
        const anDur = 0.9;
        const star = (pstart: number) => { return (anDelay+pstart)*anDur; }                               // It's called star not start cause I'm too lazy to type t
        const dur = (pstart: number, pend: number) => { return (pend*anDur) - (pstart*anDur); } 

        // Find replacement
        const replacement: HTMLElement | undefined | null = element.parentElement?.parentElement?.querySelector('.replaceee-1') // [Mar 2025] This is very hardcoded to our usecase.

        if (!replacement) console.assert(false);
        else {

          const tlReplace = $gsap.timeline({ scrollTrigger: {
            trigger: replacement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 50%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none reverse',
            markers: false,
          }});
          
          // Fade in trackpad
          if ((0)) {
            const fadeStart = 0.0; const fadeEnd = 0.2;
            tlReplace.fromTo(element, {opacity: '0' }, { opacity: '1', duration: dur(fadeStart, fadeEnd), ease: linearFadingEase(1) }, star(fadeStart-anDelay))
          }

          // Fade out trackpad
          const fadeOutStart = 0, fadeOutEnd = 0.3
          tlReplace.fromTo(element, { opacity: '1' }, { opacity: '0', duration: dur(fadeOutStart, fadeOutEnd), ease: linearFadingEase(1) }, star(fadeOutStart))

          // Fade in mouse
          const fadeInStart = 0.4, fadeInEnd = 0.6;
          tlReplace.fromTo(replacement, { autoAlpha: '0' }, { autoAlpha: '1', duration: dur(fadeInStart, fadeInEnd), ease: linearFadingEase(1) }, star(fadeInStart)) // autoAlpha prevents text selection jank due to scaled up hidden element.

          // Slam mouse
          const fromScale = 2.0, toScale = 1.0;
          const slamStart = 0.2, slamEnd = 0.6
          const ease = (x: number) => { return linearScalingEase(fromScale)($Power2.easeIn(x)) }
          tlReplace.fromTo(replacement, { scale: fromScale }, { scale: toScale, duration: dur(slamStart, slamEnd), ease: ease }, star(slamStart))

          // Shrink slot
          const shrinkStart = 0.9, shrinkEnd = 1.7
          tlReplace.to(element, 
          { 
            width:        `${replacement.offsetWidth}px`,
            duration:     dur(shrinkStart, shrinkEnd),
            ease:         customInOutEase(),
          }, star(shrinkStart))

            // replacement!.textContent = "Ahhh";
            // replacement!.style.display = 'none';
          
          // Push timeline
          fadeTimelines.push(tlReplace)

          const tlImpactJiggle = $gsap.timeline({ scrollTrigger: {
            trigger: replacement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 50%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none none', // Don't play reverse jiggle
            markers: false,
          }})

          // Impact jiggle
          const jiggleFactor  = -1.8;
          const jiggleDur1    =  0.05;
          const jiggleDur2    =  1.4;
          tlImpactJiggle
          .to(replacement, {
            rotation: 2*jiggleFactor,  // Small rotation clockwise
            // scale: 1.0 + -(2)/100,  // Small rotation clockwise
            duration: jiggleDur1,
            ease: $Power1.easeOut,
          }, star(slamEnd))  // Start right after the slam
          .to(replacement, {
            rotation: 0,
            duration: jiggleDur2*0.85,
            ease: spring((0.2/jiggleDur1)*jiggleDur2, 0.16),
          })

          // Push timeline
          fadeTimelines.push(tlImpactJiggle);
        }

      }
      else if (toMoveUp.includes(element)) {

        // Animation duration
        const anDur = 0.8;

        // Create fade animation
        const tlFade = $gsap.timeline({scrollTrigger: {
          trigger: triggerElement,
          pin: false,
          start: `bottom+=${animationStartOffsetCompensation} 85%`,
          end: `bottom+=${animationStartOffsetCompensation} 10%`,
          scrub: false,
          toggleActions: 'restart none none reverse',
          markers: false,
        }})

        const hasLittleSpace = true;
                  tlFade.fromTo(element,      { opacity: '0' },   { opacity: '1', duration: anDur*0.4, ease: linearFadingEase(0) }, hasLittleSpace ? anDur*0.25 : 0.0); 
        if ((0))  tlFade.fromTo(placeholder,  { opacity: '0.1' }, { opacity: '0', duration: anDur*0.2, ease: linearFadingEase(0) }, hasLittleSpace ? anDur*0.0 : 0.0); 
        fadeTimelines.push(tlFade);

        // Create move-up animation

        const tlMoveUp = $gsap.timeline({ scrollTrigger: {
          trigger: triggerElement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 85%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none reverse',
            markers: false,
        }});
        // tlMoveUp.fromTo(element, { opacity: '0' }, { opacity: '1', duration: 0.33, ease: linearFadingEase(0) }, 0)
        // tlMoveUp.fromTo(element, { translateY: '18rem' }, { translateY: '0rem', duration: 0.75, ease: criticalSpring(5.0) /* $Power3.easeOut */ }, 0);
        // tlMoveUp.fromTo(element, { translateY: '12rem' }, { translateY: '0rem', duration: 0.55, ease: criticalSpring(6.0) }, 0);
        tlMoveUp.fromTo(element, { translateY: animationStartOffset }, { translateY: '0rem', duration: anDur, ease: criticalSpring(6.0) }, 0);
        fadeTimelines.push(tlMoveUp);

      } 
      else if (toMoveRight.includes(element)) {

        // Note: [Mar 2025] Right-to-Left languages
        //  We should probably turn this into a move*Left* animation for rtl languages.
        //  Implementation thoughts: We could spot rtl languages using Babel in our python script and export that into Localizable.js. Or use a dynamic technique like `window.getComputedStyle(document.body).direction === 'rtl'` (might be more robust in case some strings of the rtl language fall back to English – a ltr language.)

        // Animation duration
        const anDur = 1.2;

        // Create fade animation
        const tlFade = $gsap.timeline({scrollTrigger: {
          trigger: triggerElement,
          pin: false,
          start: `bottom+=${animationStartOffsetCompensation} 85%`,
          end: `bottom+=${animationStartOffsetCompensation} 10%`,
          scrub: false,
          toggleActions: 'restart none none reverse',
          markers: false,
        }})

        const fadeStart = 0.0;
        const fadeEnd = 0.4;
        tlFade.fromTo(element, { opacity: '0' }, { opacity: '1', duration: fadeEnd-fadeStart, ease: linearFadingEase(0) }, fadeStart); 
        fadeTimelines.push(tlFade);

        // Create move-right animation

        const tlMoveUp = $gsap.timeline({ scrollTrigger: {
          trigger: triggerElement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 85%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none reverse',
            markers: false,
        }});
        tlMoveUp.fromTo(element, { translateX: '-18rem' }, { translateX: '0rem', duration: anDur, ease: criticalSpring(6.0) }, 0);
        fadeTimelines.push(tlMoveUp);

      } 
      else if (toFlex.includes(element)) {

          // Animation duration
          const anDur = 1.2;
          const anDurExt = 1.0; // Hacks
          const anDelay = 0.3;

          // Create fade animation
          const tlFade = $gsap.timeline({scrollTrigger: {
            trigger: triggerElement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 85%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none reverse',
            markers: false,
          }})

          const fadeStart = 0.0;
          const fadeEnd = 0.2;
          tlFade.fromTo(element, { opacity: '0' }, { opacity: '1', duration: fadeEnd-fadeStart, ease: linearFadingEase(0) }, anDelay + fadeStart); 
          fadeTimelines.push(tlFade);

          // Create flex animation

          const tlMoveUp = $gsap.timeline({ scrollTrigger: {
            trigger: triggerElement,
              pin: false,
              start: `bottom+=${animationStartOffsetCompensation} 85%`,
              end: `bottom+=${animationStartOffsetCompensation} 10%`,
              scrub: false,
              toggleActions: 'restart none none reverse',
              markers: false,
          }});
          element.style.transformOrigin = 'bottom center';
          // element.style.borderWidth = '2px'
          // element.style.borderColor = 'black'
          tlMoveUp.fromTo(element, { transform: 'scale(1.0,1.75)' }, { transform: 'scale(1.0,1.0)', duration: anDur*anDurExt, ease: spring(4.0, 0.4/anDurExt) }, anDelay);
          fadeTimelines.push(tlMoveUp);

      } 
      else if (toGrow.includes(element)) {

          // Animation duration
          const anDur = 0.5;
          const anDelay = 1.0;

          // Create fade animation
          const tlFade = $gsap.timeline({scrollTrigger: {
            trigger: triggerElement,
            pin: false,
            start: `bottom+=${animationStartOffsetCompensation} 85%`,
            end: `bottom+=${animationStartOffsetCompensation} 10%`,
            scrub: false,
            toggleActions: 'restart none none reverse',
            markers: false,
          }})

          const fadeStart = 0.0;
          const fadeEnd = 0.2;
          tlFade.fromTo(element, { opacity: '0' }, { opacity: '1', duration: fadeEnd-fadeStart, ease: linearFadingEase(0) }, fadeStart); 
          fadeTimelines.push(tlFade);

          // Create grow animation

          const tlGrow = $gsap.timeline({ scrollTrigger: {
            trigger: triggerElement,
              pin: false,
              start: `bottom+=${animationStartOffsetCompensation} 85%`,
              end: `bottom+=${animationStartOffsetCompensation} 10%`,
              scrub: false,
              toggleActions: 'restart none none reverse',
              markers: false,
          }});
          element.style.transformOrigin = 'center 80%';
          // element.style.borderWidth = '2px'
          // element.style.borderColor = 'black'
          tlGrow.fromTo(element, { transform: 'scale(0.5,0.5)' }, { transform: 'scale(1.0,1.0)', duration: anDur, ease: criticalSpring(4.0) }, anDelay);
          fadeTimelines.push(tlGrow);
      }
    }
  })
})

function killScrollTriggerAnimation(tl: gsap.core.Timeline | undefined | null, reset: boolean = false) {

  // Mostly copied from Intro.vue

  if (tl != null) {
    tl!.scrollTrigger!.kill(true, false)
    tl!.pause(reset ? 0 : undefined).kill()
    tl = null // Not sure if setting to null like this works
  }
}

</script>

<style lang="postcss" scoped>

html {
 
}

</style>