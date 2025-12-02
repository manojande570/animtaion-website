'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState({})

  useEffect(() => {
    const initCursor = () => {
      // Remove any existing cursors first
      document.querySelectorAll('.liquid-cursor').forEach(el => el.remove())
      
      // Simple cursor system with trail dots
      const cursor = document.createElement('div')
      cursor.className = 'liquid-cursor'
      cursor.id = 'main-cursor'
      document.body.appendChild(cursor)
      
      return cursor
    }
    
    // Initialize immediately and also with timeout
    const cursor = initCursor()
    setTimeout(() => {
      if (!document.getElementById('main-cursor')) {
        initCursor()
      }
    }, 100)

    const trail = []
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div')
      dot.className = 'trail-dot'
      document.body.appendChild(dot)
      trail.push({ element: dot, x: 0, y: 0 })
    }

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, isMoving = false
    let moveTimeout
    
    // Initialize cursor position and visibility
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
    cursor.style.opacity = '1'
    cursor.style.visibility = 'visible'
    cursor.style.display = 'block'
    cursor.style.zIndex = '99999'
    cursor.style.position = 'fixed'
    cursor.style.width = '20px'
    cursor.style.height = '20px'
    cursor.style.background = '#00d4ff'
    cursor.style.borderRadius = '50%'
    cursor.style.pointerEvents = 'none'
    cursor.style.transform = 'translate(-50%, -50%)'
    cursor.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.8)'

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
      
      isMoving = true
      clearTimeout(moveTimeout)
      
      // Show trail dots when moving
      trail.forEach((dot, i) => {
        setTimeout(() => {
          dot.x = mouseX
          dot.y = mouseY
          dot.element.style.left = dot.x + 'px'
          dot.element.style.top = dot.y + 'px'
          dot.element.style.opacity = '0.7'
          
          setTimeout(() => {
            dot.element.style.opacity = '0'
          }, 100 + i * 50)
        }, i * 30)
      })
      
      moveTimeout = setTimeout(() => {
        isMoving = false
      }, 100)
    }

    const addCursorEffect = () => cursor.classList.add('cursor-click')
    const removeCursorEffect = () => cursor.classList.remove('cursor-click')
    const addHoverEffect = () => cursor.classList.add('morphing')
    const removeHoverEffect = () => cursor.classList.remove('morphing')

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', addCursorEffect)
    document.addEventListener('mouseup', removeCursorEffect)
    
    document.querySelectorAll('a, button, .service-card, .product-card').forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect)
      el.addEventListener('mouseleave', removeHoverEffect)
    })
    // Create floating particles
    const particlesContainer = document.getElementById('particles')
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.width = Math.random() * 10 + 5 + 'px'
        particle.style.height = particle.style.width
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 20 + 's'
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's'
        particlesContainer.appendChild(particle)
      }
    }

    // Enhanced scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          
          // Special animations for services
          if (entry.target.classList.contains('service-card')) {
            setTimeout(() => {
              entry.target.style.transform = 'translateY(-10px) rotateY(5deg)'
            }, 200)
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right, .scroll-scale, .rotate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    // Animated counter
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number')
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0')
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0

        const updateCounter = () => {
          current += step
          if (current < target) {
            counter.textContent = Math.floor(current) + '+'
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target + '+'
          }
        }

        const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter()
              counterObserver.unobserve(entry.target)
            }
          })
        }, { threshold: 0.5 })

        counterObserver.observe(counter)
      })
    }

    animateCounters()

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href') || '')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.hero-visual, .about-image')
      parallaxElements.forEach(el => {
        const speed = 0.5
        ;(el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)

    // Service cards stagger animation
    const serviceCards = document.querySelectorAll('.service-card')
    serviceCards.forEach((card, index) => {
      ;(card as HTMLElement).style.transitionDelay = `${index * 0.1}s`
    })

    // Product cards stagger animation
    const productCards = document.querySelectorAll('.product-card')
    productCards.forEach((card, index) => {
      ;(card as HTMLElement).style.transitionDelay = `${index * 0.15}s`
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', addCursorEffect)
      document.removeEventListener('mouseup', removeCursorEffect)
      cursor?.remove()
      trail.forEach(t => t.element?.remove())
    }
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <div className="animated-bg"></div>
      <div className="particles" id="particles"></div>

      <nav>
        <div className="container">
          <div className="logo">BNS</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Leading <span>IT Staffing</span> & <span>Software Development</span></h1>
            <p>Leveraging ten years of experience in staffing and consulting to deliver client-centric, cost-effective, and process-driven quality solutions.</p>
            <a href="#services" className="cta-button">Explore Services</a>
          </div>
          <div className="hero-visual">
            <div className="image-container">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Team Collaboration" 
                className={`hero-image lazy-image ${imageLoaded['hero'] ? 'loaded' : ''}`}
                width={800}
                height={600}
                loading="lazy"
                onLoad={() => setImageLoaded(prev => ({...prev, hero: true}))}
              />
              {!imageLoaded['hero'] && <div className="image-skeleton"></div>}
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <h2 className="section-title scroll-animate">About BNS International</h2>
        <p className="section-subtitle scroll-animate">Your trusted partner in IT solutions and staffing</p>
        <div className="about-content">
          <div className="about-text scroll-left bounce-in">
            <div className="text-reveal">
              <p>BNS International Inc is a leading IT staffing and Software Development Company located in USA. Leveraging ten years of staffing and consulting experience, we have pioneered in the field of IT and outsourcing services.</p>
            </div>
            <div className="text-reveal" style={{animationDelay: '0.2s'}}>
              <p>With a wide range of project execution models and costing models, our solutions are very client-centric, cost-effective and process driven quality solutions. Our solutions aim to provide high value by optimizing cost of ownership of technology investments for customers.</p>
            </div>
            <div className="text-reveal" style={{animationDelay: '0.4s'}}>
              <p>We focus exclusively on maximizing client returns from outsourcing and off-shoring. Our wide range of customized models, scalability, and immense talent pool enable us to reliably serve customer needs.</p>
            </div>
          </div>
          <div className="scroll-right image-float">
            <div className="image-container">
              <Image 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop" 
                alt="Professional Team" 
                className={`about-image lazy-image ${imageLoaded['about'] ? 'loaded' : ''}`}
                width={800}
                height={600}
                loading="lazy"
                onLoad={() => setImageLoaded(prev => ({...prev, about: true}))}
              />
              {!imageLoaded['about'] && <div className="image-skeleton"></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item scroll-scale">
            <div className="stat-number" data-target="10">0</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item scroll-scale">
            <div className="stat-number" data-target="500">0</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item scroll-scale">
            <div className="stat-number" data-target="200">0</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item scroll-scale">
            <div className="stat-number" data-target="50">0</div>
            <div className="stat-label">Team Members</div>
          </div>
        </div>
      </section>

      <section id="services">
        <h2 className="section-title scroll-animate">Our Services</h2>
        <p className="section-subtitle scroll-animate">Comprehensive IT solutions tailored to your needs</p>
        <div className="services-grid">
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-drafting-compass"></i></div>
            <h3>Architecture</h3>
            <p>BNS International Inc has spent the last few years compiling best practices in architecture design.</p>
            <ul>
              <li>Industry Research</li>
              <li>Modular Design</li>
              <li>Implementation Strategy</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-mobile-alt"></i></div>
            <h3>App Development</h3>
            <p>We use state-of-the-art technologies in Applications Development to deliver cutting-edge solutions.</p>
            <ul>
              <li>Product Development</li>
              <li>Customized Development</li>
              <li>New Application Development</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-laptop-code"></i></div>
            <h3>IT Consulting</h3>
            <p>We provide IT consulting services to assist our clients with strategic technology decisions.</p>
            <ul>
              <li>App Portfolio Rationalization</li>
              <li>Service Oriented Architecture</li>
              <li>Business Process Management</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-users"></i></div>
            <h3>IT Staffing</h3>
            <p>Experienced consultants to help identify and attract the right workforce for your company.</p>
            <ul>
              <li>Contract Staffing</li>
              <li>Permanent Placement</li>
              <li>Executive Search</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-search"></i></div>
            <h3>Executive Search</h3>
            <p>Leadership and highly sought after management professionals for your organization.</p>
            <ul>
              <li>Leadership Positions</li>
              <li>Management Roles</li>
              <li>C-Level Executives</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
          <div className="service-card scroll-animate rotate-on-scroll">
            <div className="service-icon rotate-icon"><i className="fas fa-handshake"></i></div>
            <h3>Recruitment Process</h3>
            <p>Solutions for recruitment processes outsourced to us for onsite or offshore models.</p>
            <ul>
              <li>Onsite Recruitment</li>
              <li>Offshore Solutions</li>
              <li>Full Cycle Hiring</li>
            </ul>
            <a href="#" className="service-link">Learn More →</a>
          </div>
        </div>
      </section>

      <section className="video-section">
        <h2 className="section-title scroll-animate">See Us In Action</h2>
        <p className="section-subtitle scroll-animate">Experience innovation and excellence</p>
        <div className="video-container scroll-scale">
          <video autoPlay loop muted playsInline>
            <source src="https://cdn.pixabay.com/video/2022/02/21/108762-681672186_large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section id="products">
        <h2 className="section-title scroll-animate">Our Products</h2>
        <p className="section-subtitle scroll-animate">Integrated technology solutions for modern businesses</p>
        <div className="products-grid">
          <div className="product-card scroll-animate">
            <div className="product-icon">🚀</div>
            <h3>e-Business Solutions</h3>
            <p>Comprehensive digital transformation for your business</p>
          </div>
          <div className="product-card scroll-animate">
            <div className="product-icon">🔧</div>
            <h3>Infrastructure Management</h3>
            <p>Reliable and scalable IT infrastructure solutions</p>
          </div>
          <div className="product-card scroll-animate">
            <div className="product-icon">💡</div>
            <h3>Consultancy Services</h3>
            <p>Expert guidance for technology strategy</p>
          </div>
          <div className="product-card scroll-animate">
            <div className="product-icon">📱</div>
            <h3>Product Development</h3>
            <p>Custom software products built for success</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-content">
          <div className="logo" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>BNS</div>
          <p style={{color: '#888', marginBottom: '2rem'}}>Leading IT Staffing & Software Development Company</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <p style={{color: '#555'}}>© 2024 BNS International Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}