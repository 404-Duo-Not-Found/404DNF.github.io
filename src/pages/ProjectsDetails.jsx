import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import projects from '../data/projects'

import Header from '../components/Header'
import Footer from '../components/footer'

export default function ProjectDetail() {
  const { id } = useParams()
  const { t } = useTranslation()

  const content = t(`projects.${id}.content`, {
    returnObjects: true,
    defaultValue: [],
  })

  const content_values =
    Array.isArray(content) && content.length > 0 && typeof content[0] === 'object'
      ? Object.values(content[0])
      : []

  const project = projects.find((item) => item.id === id)

  if (!project) {
    return (
      <>
        <Header />
        <section className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-3xl font-bold text-white">Project not found</h1>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
        {t(`projects.${project.id}.tag`)}
      </span>

      <h1 className="mt-4 text-4xl font-bold text-white">
        {t(`projects.${project.id}.title`)}
      </h1>

      <p className="mt-4 text-lg text-slate-300">
        {t(`projects.${project.id}.description`)}
      </p>

      {project.app_Image.status === true && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <img
            src={project.app_Image.image}
            alt={t(`projects.${project.id}.title`)}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mt-8 space-y-4">
        {content_values.map((paragraph, index) => (
          <p key={index} className="leading-7 text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {project.demo.status === true && (
          <a
            href={project.demo.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
          >
            Live demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/5"
          >
            GitHub
          </a>
        )}
      </div>

      {project.video.status === true && (
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <iframe
            className="aspect-video w-full"
            src={project.video.video}
            title={t(`projects.${project.id}.title`)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {project.extra && (
        <div className="mt-8">
          <p className="leading-7 text-slate-300">
            *{t(`projects.${project.id}.extra`)}
          </p>
        </div>
      )}
    </section>
  )
}