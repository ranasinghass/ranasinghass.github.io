document.addEventListener('DOMContentLoaded', function(){
  const themeToggle = document.getElementById('themeToggle')
  const printBtn = document.getElementById('printBtn')
  const yearSpan = document.getElementById('year')
  const navLinks = document.querySelectorAll('.main-nav a')


  // set year
  if(yearSpan) yearSpan.textContent = new Date().getFullYear()

  // theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const root = document.documentElement
  const saved = localStorage.getItem('theme')
  if(saved === 'dark' || (!saved && prefersDark)) root.classList.add('dark')

  function updateButton(){
    const isDark = root.classList.contains('dark')
    themeToggle.setAttribute('aria-pressed', String(isDark))
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode'
  }
  updateButton()

  themeToggle.addEventListener('click', function(){
    root.classList.toggle('dark')
    const isDark = root.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    updateButton()
  })

  printBtn.addEventListener('click', function(){
    window.print()
  })

  // Active nav on scroll
  function setActiveNav(){
    const fromTop = window.scrollY + 80
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash)
      if(!section) return
      if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }
  setActiveNav()
  window.addEventListener('scroll', setActiveNav)

  // Smooth scroll for nav clicks (offset for sticky header)
  navLinks.forEach(a => {
    a.addEventListener('click', function(e){
      // let browser handle hash if external
      if(this.hash && document.querySelector(this.hash)){
        e.preventDefault()
        const el = document.querySelector(this.hash)
        const top = el.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({top, behavior:'smooth'})
        history.replaceState(null, '', this.hash)
      }
    })
  })
})
