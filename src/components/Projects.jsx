import { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'
import { useTranslation } from 'react-i18next'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import projects from '../data/projects'
import ProjectCardCarousel from './ProjectCardCarousel'

export default function Projects() {
  const { t } = useTranslation()
  const safeProjectItems = Array.isArray(projects) ? projects : []

  const [cardsPerView, setCardsPerView] = useState(3)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)

    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const shouldUseCarousel = safeProjectItems.length > cardsPerView
  const maxIndex = Math.max(0, safeProjectItems.length - cardsPerView)
  const gapRem = 1.5

  useEffect(() => {
    if (index > maxIndex) {
      setIndex(0)
    }
  }, [index, maxIndex])

  const next = () => {
    if (index < maxIndex) {
      setIndex(index + 1)
    }
  }

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  if (!safeProjectItems.length) return null

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <SectionTitle
        eyebrow={t('projetos.eyebrow')}
        title={t('projetos.title')}
        description={t('projetos.description')}
      />

      {!shouldUseCarousel ? (
        <div
          className={`mt-10 grid gap-6 ${
            cardsPerView === 1
              ? 'grid-cols-1'
              : cardsPerView === 2
              ? 'grid-cols-2'
              : 'md:grid-cols-3'
          }`}
        >
          {safeProjectItems.map((item) => (
            <ProjectCardCarousel 
              tag={t(`projects.${item.id}.tag`)}
              title={t(`projects.${item.id}.title`)}
              description={t(`projects.${item.id}.description`)}
              id={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${index} * ((100% - ${
                  gapRem * (cardsPerView - 1)
                }rem) / ${cardsPerView} + ${gapRem}rem)))`,
              }}
            >
              {safeProjectItems.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 shrink-0"
                  style={{
                    width: `calc((100% - ${gapRem * (cardsPerView - 1)}rem) / ${cardsPerView})`,
                  }}
                >
                  <ProjectCardCarousel 
                    tag={t(`projects.${item.id}.tag`)}
                    title={t(`projects.${item.id}.title`)}
                    description={t(`projects.${item.id}.description`)}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Projeto anterior"
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition ${
                index === 0
                  ? 'cursor-not-allowed opacity-30'
                  : 'bg-white/10 text-white hover:scale-105 hover:bg-white/20'
              }`}
            >
              <ChevronLeft />
            </button>

            <div className="flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={index === maxIndex}
              aria-label="Próximo projeto"
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition ${
                index === maxIndex
                  ? 'cursor-not-allowed opacity-30'
                  : 'bg-white/10 text-white hover:scale-105 hover:bg-white/20'
              }`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}