import { useMemo, useState } from 'react'
import { cases, CATEGORIES, type CaseItem } from '@/data/cases'
import { X, FileText, ExternalLink, Mail } from 'lucide-react'

const caseUrl = (file: string) => `cases/${encodeURI(file)}`
const coverUrl = (file: string) => `covers/${encodeURI(file.replace(/\.pdf$/, '.png'))}`

function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#0f2e2b] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #2dd4bf 0, transparent 40%), radial-gradient(circle at 85% 70%, #f59e0b 0, transparent 35%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <p className="mb-4 text-sm font-medium tracking-[0.3em] text-teal-300">USER RESEARCH PORTFOLIO</p>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          闫婷婷
          <span className="mt-3 block text-xl font-normal text-teal-100/90 md:text-2xl">
            资深用户研究工程师 · 教育行业 5 年
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-teal-50/80">
          先后在好未来负责脑认知赋能、智能教辅（图书 / 阅读器 / 内容产品）与学而思网校英语业务的用户研究。
          擅长把用户声音转化为产品决策：从 NPS 体系搭建、用户画像与需求洞察，到转化留存归因、竞品研究与课程测试，
          全流程独立交付调研项目 100+ 个。
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ['100+', '独立交付调研项目'],
            ['5 年', '教育行业用研经验'],
            ['22 个', '精选案例（本站）'],
            ['10+', '定量与定性研究方法'],
          ].map(([num, label]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-3xl font-bold text-teal-300">{num}</div>
              <div className="mt-1 text-sm text-teal-50/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

function MethodStrip() {
  const methods = [
    'NPS 体系搭建', '归因建模（随机森林）', 'MOT 关键时刻分析', 'K 值聚类 / 用户分群',
    '问卷设计', '深度访谈', '焦点小组', '入户观察', '城市走访', '测课 / 概念测试', '语料分析', 'AI 辅助研究',
  ]
  return (
    <section className="border-b border-stone-200 bg-[#faf8f4]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-5 text-sm font-semibold tracking-widest text-stone-500">研究方法</h2>
        <div className="flex flex-wrap gap-2.5">
          {methods.map((m) => (
            <span
              key={m}
              className="rounded-full border border-teal-800/20 bg-white px-4 py-1.5 text-sm text-teal-900"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ item, onOpen }: { item: CaseItem; onOpen: (c: CaseItem) => void }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={coverUrl(item.file)}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {item.date}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-teal-800/10 px-3 py-0.5 text-xs font-medium text-teal-900">
          {item.category}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-stone-900">{item.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.methods.map((m) => (
            <span key={m} className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
              {m}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function CaseModal({ item, onClose }: { item: CaseItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 p-5">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-stone-500">
              <span className="rounded-full bg-teal-800/10 px-2.5 py-0.5 font-medium text-teal-900">{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
            <p className="mt-1 text-sm text-amber-700">★ {item.highlight}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={caseUrl(item.file)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-teal-800 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              <ExternalLink size={15} /> 新窗口打开
            </a>
            <button
              onClick={onClose}
              className="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-100"
              aria-label="关闭"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <iframe src={caseUrl(item.file)} title={item.title} className="h-full w-full flex-1 bg-stone-100" />
      </div>
    </div>
  )
}

export default function Home() {
  const [cat, setCat] = useState<string>('全部')
  const [active, setActive] = useState<CaseItem | null>(null)

  const filtered = useMemo(
    () => (cat === '全部' ? cases : cases.filter((c) => c.category === cat)),
    [cat],
  )

  return (
    <div className="min-h-screen bg-[#faf8f4] font-sans text-stone-900">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0f2e2b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 font-semibold text-white">
            <FileText size={18} className="text-teal-300" /> 闫婷婷 · 用户研究作品集
          </span>
          <a href="#cases" className="text-sm text-teal-100/80 transition hover:text-white">
            精选案例
          </a>
        </div>
      </nav>

      <Hero />
      <MethodStrip />

      <main id="cases" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">精选案例</h2>
            <p className="mt-2 text-stone-500">
              来自好未来英语与智能教辅业务线的真实项目，点击卡片可在线阅读完整报告。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  cat === c
                    ? 'bg-teal-800 font-medium text-white'
                    : 'border border-stone-300 bg-white text-stone-600 hover:border-teal-700 hover:text-teal-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <CaseCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </div>
      </main>

      <footer className="bg-[#0f2e2b] text-teal-50/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold text-white">闫婷婷 · 资深用户研究工程师</p>
            <p className="mt-1 text-sm">求职意向：资深用户研究岗</p>
          </div>
          <a
            href="mailto:tingyan90@163.com"
            className="flex items-center gap-2 rounded-lg border border-teal-300/30 px-4 py-2 text-sm text-teal-100 transition hover:bg-white/10"
          >
            <Mail size={16} /> tingyan90@163.com
          </a>
        </div>
      </footer>

      {active && <CaseModal item={active} onClose={() => setActive(null)} />}
    </div>
  )
}
