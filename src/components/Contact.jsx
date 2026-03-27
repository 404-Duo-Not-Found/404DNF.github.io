import { useTranslation } from 'react-i18next'
import SectionTitle from './SectionTitle'
import EmailModal from './EmailModal'
import { FaGithub } from 'react-icons/fa'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-400/10 via-white/5 to-fuchsia-500/10 p-8 md:p-12 h-full flex flex-col justify-between">
      <SectionTitle
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.description')}
      />

      <div className="mt-8 flex flex-wrap gap-4 text-slate-200">
        <a
          className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950 cursor-not-allowed opacity-50 hover:opacity-50"
          href="mailto:404.duo.dev@gmail.com"
          onClick={(e) => e.preventDefault()}
        >
          {t('contact.email')}
        </a>

        <EmailModal triggerText="Send an email from website"/>

        <a
          className="rounded-xl border border-white/15 px-5 py-3 font-medium transition hover:bg-white/5"
          href="https://github.com/orgs/404-Duo-Not-Found"
          target="_blank"
        >
          <FaGithub size={25} />
        </a>
      </div>
    </div>
  )
}