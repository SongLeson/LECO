let lenis: any = null

export const initSmoothScroll = () => {
  if (typeof window !== 'undefined' && !lenis) {
    import('lenis').then((Lenis) => {
      try {
        lenis = new Lenis.default({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        })

        function raf(time: number) {
          if (lenis) {
            lenis.raf(time)
            requestAnimationFrame(raf)
          }
        }

        requestAnimationFrame(raf)
      } catch (error) {
        console.log('Smooth scroll initialization failed:', error)
      }
    }).catch((error) => {
      console.log('Failed to load Lenis:', error)
    })
  }
}

export const scrollTo = (target: string | number) => {
  if (lenis) {
    lenis.scrollTo(target)
  }
}

export const destroySmoothScroll = () => {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}
