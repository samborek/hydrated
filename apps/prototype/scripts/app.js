const app = document.querySelector('.app')
const active = app?.dataset.active || ''

const navItems = [
  { id: 'overview', label: 'Overview', href: 'index.html' },
  { id: 'trade', label: 'Trade', href: 'trade.html' },
  { id: 'liquidity', label: 'Liquidity', href: 'liquidity.html' },
  { id: 'wallet', label: 'Wallet', href: 'wallet.html' },
  { id: 'staking', label: 'Staking', href: 'staking.html' },
  { id: 'borrow', label: 'Borrow', href: 'borrow.html' },
  { id: 'stats', label: 'Stats', href: 'stats.html', badge: 'New' },
  { id: 'storybook', label: 'Components', href: 'http://localhost:6006', external: true },
]

const sidebar = document.querySelector('.sidebar')
const topbar = document.querySelector('.topbar')

const renderNav = () => {
  const items = navItems
    .map((item) => {
      const isActive = item.id === active
      const classes = ['nav-link']
      if (isActive) classes.push('is-active')
      if (item.external) classes.push('is-external')
      return `
        <a class="${classes.join(' ')}" href="${item.href}">
          <span>${item.label}</span>
          ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
          ${item.external ? '<span class="nav-external">↗</span>' : ''}
        </a>
      `
    })
    .join('')

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="brand-mark">H</div>
      <div>
        <div class="brand-title">Hydration</div>
        <div class="brand-subtitle">Prototype</div>
      </div>
    </div>
    <nav class="nav">${items}</nav>
    <div class="sidebar-footer">
      <div class="pill">Network: Core</div>
      <div class="pill">Build: Static</div>
    </div>
  `
}

const renderTopbar = () => {
  topbar.innerHTML = `
    <div class="topbar-left">
      <div class="search">
        <input type="text" placeholder="Search pools, assets, addresses" />
      </div>
    </div>
    <div class="topbar-right">
      <button class="btn ghost" data-theme-toggle>Toggle Theme</button>
      <button class="btn primary">Connect Wallet</button>
    </div>
  `
}

const setTheme = (theme) => {
  document.body.classList.remove('theme-light', 'theme-dark')
  document.body.classList.add(theme)
  localStorage.setItem('hydration-proto-theme', theme)
}

const initTheme = () => {
  const stored = localStorage.getItem('hydration-proto-theme')
  if (stored === 'theme-dark' || stored === 'theme-light') {
    setTheme(stored)
    return
  }
  setTheme('theme-light')
}

const bindThemeToggle = () => {
  const btn = document.querySelector('[data-theme-toggle]')
  if (!btn) return
  btn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark')
    setTheme(isDark ? 'theme-light' : 'theme-dark')
  })
}

renderNav()
renderTopbar()
initTheme()
bindThemeToggle()
