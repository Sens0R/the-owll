export function tabs() {
  const tabsInstances = document.querySelectorAll('[data-tabs]')

  tabsInstances.forEach(tabsInstance => {
    const tabsInstanceName = tabsInstance.dataset.tabs
    const tabButtons = Array.from(tabsInstance.querySelectorAll('[role="tab"'))
    const firstTabButton = tabButtons.at(0)
    const lastTabButton = tabButtons.at(-1)
    const tabPanels = tabsInstance.querySelectorAll('[role="tabpanel"')

    let manualTabs
    if (tabsInstance.hasAttribute('data-tabs-manual')) manualTabs = true

    tabButtons.forEach((tabButton, i) => {
      i = 1 + i++

      if (!tabButton.hasAttribute('aria-selected')) tabButton.setAttribute('aria-selected', 'false')
      tabButton.setAttribute('aria-controls', `tabpanel-${tabsInstanceName}-${i}`)
      tabButton.id = `tab-${tabsInstanceName}-${i}`
      tabButton.setAttribute('tabindex', '-1')

      tabButton.addEventListener('click', () => {
        tabButtons.forEach(tabButton => {
          tabButton.setAttribute('aria-selected', 'false')
          tabButton.setAttribute('tabindex', '-1')
        })

        tabPanels.forEach(tabPanel => tabPanel.classList.remove('active'))
        tabButton.setAttribute('aria-selected', 'true')
        tabButton.removeAttribute('tabindex')
        const activeTab = tabsInstance.querySelector('[aria-selected="true"]')
        document.getElementById(activeTab.getAttribute('aria-controls')).classList.add('active')
      })

      // if AUTOMATIC focus and then auto-click

      tabButton.addEventListener('keydown', e => {
        // vertical tabs
        if (tabsInstance.hasAttribute('aria-orientation', 'vertical')) {
          //arrow down > next tab
          if (e.keyCode === 40) {
            e.preventDefault()
            if (!tabButton.nextElementSibling) {
              firstTabButton.focus()
              if (!manualTabs) firstTabButton.click()
              return
            }
            tabButton.nextElementSibling.focus()
            if (!manualTabs) tabButton.nextElementSibling.click()
          }

          //arrow up > prev tab
          if (e.keyCode === 38) {
            e.preventDefault()
            if (!tabButton.previousElementSibling) {
              lastTabButton.focus()
              if (!manualTabs) lastTabButton.click()
              return
            }
            tabButton.previousElementSibling.focus()
            if (!manualTabs) tabButton.previousElementSibling.click()
          }
          return
        }

        //arrow left > prev tab
        if (e.keyCode === 39) {
          if (!tabButton.nextElementSibling) {
            firstTabButton.focus()
            if (!manualTabs) firstTabButton.click()
            return
          }
          tabButton.nextElementSibling.focus()
          if (!manualTabs) tabButton.nextElementSibling.click()
        }

        //arrow right > next tab
        if (e.keyCode === 37) {
          if (!tabButton.previousElementSibling) {
            lastTabButton.focus()
            if (!manualTabs) lastTabButton.click()
            return
          }
          tabButton.previousElementSibling.focus()
          if (!manualTabs) tabButton.previousElementSibling.click()
        }
      })
    })

    firstTabButton.removeAttribute('tabindex')

    tabPanels.forEach((tabPanel, i) => {
      i = 1 + i++
      tabPanel.id = `tabpanel-${tabsInstanceName}-${i}`
      tabPanel.setAttribute('aria-labelledby', `tab-${tabsInstanceName}-${i}`)
      tabPanel.setAttribute('tabindex', '0')
    })
  })
}
