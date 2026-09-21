import { useCallback, useEffect, useRef, useState } from 'react'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, Minus, Plus } from 'lucide-react'

const MAX_DPR = 2

type RenderTask = ReturnType<PDFPageProxy['render']>

/** 单页：滚到附近才渲染，未渲染时按宽高比占位 */
function PdfPage({
  doc,
  pageNumber,
  cssWidth,
  registerRef,
}: {
  doc: PDFDocumentProxy
  pageNumber: number
  cssWidth: number
  registerRef: (n: number, el: HTMLDivElement | null) => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderTaskRef = useRef<RenderTask | null>(null)
  const [near, setNear] = useState(pageNumber <= 2) // 前两页立即渲染，其余滚动到附近再渲染
  const [aspect, setAspect] = useState(1.414) // 默认按 A4 竖版占位
  const [rendered, setRendered] = useState(false)

  // 接近视口才开始渲染（提前 600px 预加载）
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setNear(true),
      { root: el.closest('[data-pdf-scroll]'), rootMargin: '600px 0px' },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  useEffect(() => {
    if (!near || cssWidth <= 0) return
    let cancelled = false
    ;(async () => {
      const page = await doc.getPage(pageNumber)
      if (cancelled) return
      const base = page.getViewport({ scale: 1 })
      setAspect(base.height / base.width)
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const viewport = page.getViewport({ scale: (cssWidth / base.width) * dpr })
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      renderTaskRef.current?.cancel()
      // intent: 'print' → 不用 requestAnimationFrame 调度，后台/被节流的标签页（如微信内置浏览器）也能渲染完成
      const task = page.render({ canvas, canvasContext: ctx, viewport, intent: 'print' })
      renderTaskRef.current = task
      try {
        await task.promise
        if (!cancelled) setRendered(true)
      } catch {
        /* 重复渲染被取消，忽略 */
      }
    })()
    return () => {
      cancelled = true
      renderTaskRef.current?.cancel()
    }
  }, [near, doc, pageNumber, cssWidth])

  return (
    <div
      ref={(el) => {
        wrapRef.current = el
        registerRef(pageNumber, el)
      }}
      className="relative mx-auto bg-white shadow-sm"
      style={{ width: cssWidth || '100%', height: cssWidth ? cssWidth * aspect : undefined }}
      data-page={pageNumber}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {!rendered && (
        <div className="absolute inset-0 flex items-center justify-center text-stone-300">
          <Loader2 className="animate-spin" size={22} />
        </div>
      )}
      <span className="absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white">
        {pageNumber}
      </span>
    </div>
  )
}

export default function PdfViewer({ url }: { url: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pageEls = useRef<(HTMLDivElement | null)[]>([])
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [current, setCurrent] = useState(1)
  const [width, setWidth] = useState(0)

  // 加载文档（pdf.js 按需动态加载，不拖慢首屏）
  useEffect(() => {
    let cancelled = false
    let destroy: (() => void) | null = null
    setDoc(null)
    setFailed(false)
    setProgress(0)
    setCurrent(1)
    ;(async () => {
      try {
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
        if (cancelled) return
        const task = pdfjs.getDocument({ url })
        destroy = () => task.destroy()
        task.onProgress = (p: { loaded: number; total?: number }) => {
          if (p.total) setProgress(p.loaded / p.total)
        }
        const d = await task.promise
        if (cancelled) return
        setDoc(d)
        setNumPages(d.numPages)
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
      destroy?.()
    }
  }, [url])

  // 测量可用宽度
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const measure = () => setWidth(Math.max(0, el.clientWidth - 24)) // 两侧各 12px 内边距
    measure()
    const ob = new ResizeObserver(measure)
    ob.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ob.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [doc])

  const registerRef = useCallback((n: number, el: HTMLDivElement | null) => {
    pageEls.current[n - 1] = el
  }, [])

  // 滚动时更新当前页码
  const handleScroll = useCallback(() => {
    const sc = scrollRef.current
    if (!sc) return
    const top = sc.scrollTop + 80
    let cur = 1
    pageEls.current.forEach((el, idx) => {
      if (el && el.offsetTop <= top) cur = idx + 1
    })
    setCurrent(cur)
  }, [])

  const goToPage = (n: number) => {
    const sc = scrollRef.current
    const el = pageEls.current[n - 1]
    if (!sc || !el) return
    sc.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' })
  }

  const cssWidth = Math.round(width * zoom)

  if (failed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-stone-100 p-8 text-center">
        <AlertTriangle size={28} className="text-amber-600" />
        <p className="text-sm text-stone-600">在线加载失败，可尝试新窗口打开或下载后查看</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          新窗口打开
        </a>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-stone-100">
        <Loader2 className="animate-spin text-teal-800" size={28} />
        <p className="text-sm text-stone-500">
          报告加载中{progress > 0 ? ` ${Math.round(progress * 100)}%` : '…'}（文件较大时请稍候）
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 工具栏 */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-stone-200 bg-white px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(Math.max(1, current - 1))}
            disabled={current <= 1}
            className="rounded p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
            aria-label="上一页"
          >
            <ChevronLeft size={17} />
          </button>
          <span className="min-w-16 text-center text-xs tabular-nums text-stone-600">
            {current} / {numPages}
          </span>
          <button
            onClick={() => goToPage(Math.min(numPages, current + 1))}
            disabled={current >= numPages}
            className="rounded p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
            aria-label="下一页"
          >
            <ChevronRight size={17} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
            disabled={zoom <= 0.5}
            className="rounded p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
            aria-label="缩小"
          >
            <Minus size={15} />
          </button>
          <span className="min-w-11 text-center text-xs tabular-nums text-stone-600">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
            disabled={zoom >= 3}
            className="rounded p-1.5 text-stone-600 transition hover:bg-stone-100 disabled:opacity-30"
            aria-label="放大"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* 页面滚动区 */}
      <div
        ref={scrollRef}
        data-pdf-scroll
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-auto bg-stone-200/70 px-3 py-3"
      >
        <div className="relative flex flex-col gap-3">
          {Array.from({ length: numPages }, (_, i) => (
            <PdfPage
              key={i + 1}
              doc={doc}
              pageNumber={i + 1}
              cssWidth={cssWidth}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
