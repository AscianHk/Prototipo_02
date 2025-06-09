// JavaScript separado para la homepage

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar iconos de Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Smooth scroll para los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in")
      }
    })
  }, observerOptions)

  // Observar secciones para animaciones
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Funcionalidad de carrusel con botones
  function initCarousel(carouselSelector) {
    const carousel = document.querySelector(carouselSelector)
    if (!carousel) return

    const scrollAmount = 200

    // Crear botones de navegación
    const prevBtn = document.createElement("button")
    prevBtn.innerHTML = '<i data-lucide="chevron-left"></i>'
    prevBtn.className = "carousel-btn carousel-prev"

    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = '<i data-lucide="chevron-right"></i>'
    nextBtn.className = "carousel-btn carousel-next"

    // Agregar event listeners
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    })

    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" })
    })

    // Insertar botones
    const container = carousel.parentElement
    container.style.position = "relative"
    container.appendChild(prevBtn)
    container.appendChild(nextBtn)

    // Actualizar iconos
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  // Inicializar carruseles
  initCarousel(".scrollbar-hide")

  // Efecto parallax para el hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero-section")
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Contador animado para estadísticas
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      element.textContent = Math.floor(start)

      if (start >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Activar contadores cuando sean visibles
  const counters = document.querySelectorAll(".counter")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => counterObserver.observe(counter))

  // Funciones para interacciones de libros
  window.addToFavorites = (bookId) => {
    console.log("Añadiendo a favoritos:", bookId)
    // Aquí iría la lógica AJAX para añadir a favoritos
    showNotification("Libro añadido a favoritos")
  }

  window.addToWantToRead = (bookId) => {
    console.log("Añadiendo a quiero leer:", bookId)
    // Aquí iría la lógica AJAX
    showNotification('Libro añadido a "Quiero leer"')
  }

  // Sistema de notificaciones
  function showNotification(message, type = "success") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Búsqueda en tiempo real (si hay campo de búsqueda)
  const searchInput = document.querySelector("#search-input")
  if (searchInput) {
    let searchTimeout

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout)
      const query = this.value.trim()

      if (query.length >= 3) {
        searchTimeout = setTimeout(() => {
          performSearch(query)
        }, 300)
      }
    })
  }

  function performSearch(query) {
    // Aquí iría la lógica de búsqueda AJAX
    console.log("Buscando:", query)
  }

  // Gestión de favoritos local (localStorage)
  const favoriteButtons = document.querySelectorAll(".favorite-btn")
  favoriteButtons.forEach((btn) => {
    const bookId = btn.dataset.bookId
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (favorites.includes(bookId)) {
      btn.classList.add("active")
    }

    btn.addEventListener("click", function (e) {
      e.preventDefault()
      toggleFavorite(bookId, this)
    })
  })

  function toggleFavorite(bookId, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (favorites.includes(bookId)) {
      favorites = favorites.filter((id) => id !== bookId)
      button.classList.remove("active")
      showNotification("Libro eliminado de favoritos")
    } else {
      favorites.push(bookId)
      button.classList.add("active")
      showNotification("Libro añadido a favoritos")
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
})

// Funciones globales para compatibilidad
window.viewAllBooks = (category) => {
  console.log("Ver todos los libros de:", category)
  // Redirigir a página de categoría
  window.location.href = `/categoria/${category}`
}

window.viewBookDetails = (bookId) => {
  console.log("Ver detalles del libro:", bookId)
  window.location.href = `/libro/${bookId}`
}
