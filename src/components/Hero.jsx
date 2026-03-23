import {useTranslation} from 'react-i18next'
import { ShieldCheck,Zap,Proportions,Wrench,Component,ChevronsUp } from 'lucide-react'

const iconComponents = {
  '<ShieldCheck />': ShieldCheck,
  ShieldCheck,
  '<Zap />': Zap,
  Zap,
  '<Proportions />': Proportions,
  Proportions,
  '<Wrench />': Wrench,
  Wrench,
  '<Component />': Component,
  Component,
  '<ChevronsUp />': ChevronsUp,
  ChevronsUp
}

function renderSidePanelIcon(icon) {
  if (!icon) return null

  const IconComponent = iconComponents[icon]

  if (IconComponent) {
    return <IconComponent size={20} className="text-sky-300" aria-hidden="true" />
  }

  return <span aria-hidden="true">{icon}</span>
}

export default function Hero() {
  const {t} = useTranslation()
  const sidePanelTitle = t('hero.side_panel.title', {defaultValue: ''})
  const sidePanelItems = t('hero.side_panel.items', {returnObjects: true, defaultValue: []})
  const safeSidePanelItems = Array.isArray(sidePanelItems) ? sidePanelItems : []

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.14),transparent_30%)]" />
      
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-300">
            {t('hero.eyebrow')}
          </p>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {t('hero.title')}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
            >
              {t('hero.projects')}
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/5"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          {sidePanelTitle && <h2 className="mb-4 text-2xl font-bold text-white">{sidePanelTitle}</h2>}

          <div className="grid gap-4 sm:grid-cols-2">
            {safeSidePanelItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 
                "
              >
                <div className="text-sm ">{renderSidePanelIcon(item.icon)}</div>
                <p className="mt-2 text-xl font-bold text-white ">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}