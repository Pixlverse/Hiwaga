import { useEffect, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
  GripVertical,
  Heading2,
  Pilcrow,
  Quote,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import adminApi, { apiError } from '@/lib/adminApi'

const categories = [
  'Strategy',
  'Video',
  'Personal Branding',
  'OOH',
  'Social Media',
  'Performance',
  'Branding',
]

const statusStyles = {
  published: 'bg-emerald-400/10 text-emerald-300',
  draft: 'bg-neutral-400/10 text-neutral-300',
  scheduled: 'bg-blue-400/10 text-blue-300',
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
}

const emptyPost = () => ({
  _id: null,
  slug: '',
  title: '',
  excerpt: '',
  cover: '',
  author: { name: '', initials: '' },
  category: 'Strategy',
  status: 'draft',
  publishedOn: '',
  readingTime: '',
  views: 0,
  content: [],
})

// Strip Mongo metadata to match form schema
function toFormShape(post) {
  if (!post) return null
  return {
    _id: post._id,
    slug: post.slug || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    cover: post.cover || '',
    author: {
      name: post.author?.name || '',
      initials: post.author?.initials || '',
    },
    category: post.category || 'Strategy',
    status: post.status || 'draft',
    publishedOn: post.publishedOn ? post.publishedOn.split('T')[0] : '',
    readingTime: post.readingTime || '',
    views: post.views || 0,
    content: post.content || [],
  }
}

function BlockEditor({ blocks, onChange }) {
  const typeOpts = [
    { value: 'p', label: 'Paragraph', icon: Pilcrow },
    { value: 'h2', label: 'Heading', icon: Heading2 },
    { value: 'quote', label: 'Quote', icon: Quote },
  ]

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <p className="rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center text-xs text-neutral-500">
          No content yet. Add a block to start writing.
        </p>
      )}

      {blocks.map((b, i) => {
        const opt = typeOpts.find((o) => o.value === b.type)
        const Icon = opt?.icon || Pilcrow
        return (
          <div
            key={i}
            className="group relative rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-3.5 w-3.5 text-neutral-600" />
                <select
                  value={b.type}
                  onChange={(e) =>
                    onChange(
                      blocks.map((bb, idx) =>
                        idx === i ? { ...bb, type: e.target.value } : bb,
                      ),
                    )
                  }
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-300 focus:border-[#FFD700]/60 focus:outline-none"
                >
                  {typeOpts.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Icon className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    if (i === 0) return
                    const n = [...blocks]
                    ;[n[i], n[i - 1]] = [n[i - 1], n[i]]
                    onChange(n)
                  }}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (i === blocks.length - 1) return
                    const n = [...blocks]
                    ;[n[i], n[i + 1]] = [n[i + 1], n[i]]
                    onChange(n)
                  }}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(blocks.filter((_, idx) => idx !== i))
                  }
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-rose-400/10 hover:text-rose-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <textarea
              value={b.text}
              onChange={(e) =>
                onChange(
                  blocks.map((bb, idx) =>
                    idx === i ? { ...bb, text: e.target.value } : bb,
                  ),
                )
              }
              rows={b.type === 'p' ? 3 : 2}
              placeholder={
                b.type === 'h2'
                  ? 'Section heading…'
                  : b.type === 'quote'
                    ? 'A short quoted line…'
                    : 'Paragraph text…'
              }
              className="mt-2 w-full resize-none rounded-md border border-white/10 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>
        )
      })}

      <div className="flex flex-wrap gap-2 pt-1">
        {typeOpts.map((o) => {
          const Icon = o.icon
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange([...blocks, { type: o.value, text: '' }])}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              <Plus className="h-3 w-3" strokeWidth={2} />
              <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Field({ label, required, hint, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
        {label}
        {required && <span className="ml-1 text-[#FFD700]">*</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs text-neutral-500">{hint}</span>
      )}
    </label>
  )
}

function PostForm({ initial, onSave, onCancel, submitting }) {
  const [post, setPost] = useState(initial || emptyPost())
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug)
  const [authorInitialsTouched, setAuthorInitialsTouched] = useState(
    !!initial?.author?.initials,
  )
  const [uploadingCover, setUploadingCover] = useState(false)
  const [coverError, setCoverError] = useState('')

  const set = (k, v) => setPost((p) => ({ ...p, [k]: v }))
  const setAuthor = (k, v) =>
    setPost((p) => ({ ...p, author: { ...p.author, [k]: v } }))

  const handleCoverFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setCoverError('Please choose an image file.')
      return
    }
    setCoverError('')
    setUploadingCover(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const { data } = await adminApi.post('/uploads/image', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      set('cover', data.url)
    } catch (err) {
      setCoverError(apiError(err))
    } finally {
      setUploadingCover(false)
    }
  }

  const onTitleChange = (e) => {
    const title = e.target.value
    setPost((p) => ({
      ...p,
      title,
      slug: slugTouched ? p.slug : slugify(title),
    }))
  }

  const onAuthorNameChange = (e) => {
    const name = e.target.value
    setPost((p) => ({
      ...p,
      author: {
        ...p.author,
        name,
        initials: authorInitialsTouched
          ? p.author.initials
          : initialsOf(name),
      },
    }))
  }

  const submit = (statusOverride) => (e) => {
    if (e) e.preventDefault()
    onSave({
      ...post,
      status: statusOverride || post.status,
      slug: post.slug || slugify(post.title),
      author: {
        name: post.author.name,
        initials: post.author.initials || initialsOf(post.author.name),
      },
    })
  }

  return (
    <form
      onSubmit={submit()}
      className="space-y-6 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.03] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">
          {initial?._id ? 'Edit post' : 'New post'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="space-y-4 lg:col-span-2">
          <Field label="Title" required>
            <input
              type="text"
              required
              value={post.title}
              onChange={onTitleChange}
              className="input"
            />
          </Field>

          <Field
            label="Slug"
            hint="URL-friendly identifier. Auto-generated from title."
          >
            <input
              type="text"
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true)
                set('slug', e.target.value)
              }}
              className="input"
            />
          </Field>

          <Field label="Excerpt" hint="2–3 lines that appear in listings.">
            <textarea
              rows={2}
              value={post.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              className="input resize-none"
            />
          </Field>

          <Field
            label="Cover Image"
            required
            hint="JPG, PNG, WEBP, GIF or AVIF — up to 5 MB."
          >
            {post.cover ? (
              <div className="mt-2 space-y-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
                  <img
                    src={post.cover}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.3'
                    }}
                  />
                  {uploadingCover && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <Loader2 className="h-5 w-5 animate-spin text-[#FFD700]" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white">
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleCoverFile(e.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => set('cover', '')}
                    className="rounded-md border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 transition-colors hover:bg-rose-400/10 hover:text-rose-300"
                  >
                    Remove
                  </button>
                  <span className="ml-1 truncate text-[11px] text-neutral-500">
                    {post.cover}
                  </span>
                </div>
              </div>
            ) : (
              <label
                className={`mt-2 flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-white/[0.02] transition-colors ${
                  uploadingCover
                    ? 'border-[#FFD700]/40 bg-[#FFD700]/[0.04]'
                    : 'border-white/15 hover:border-[#FFD700]/40 hover:bg-white/[0.04]'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCoverFile(e.target.files?.[0])}
                />
                {uploadingCover ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-[#FFD700]" />
                    <span className="text-xs text-neutral-400">
                      Uploading…
                    </span>
                  </>
                ) : (
                  <>
                    <ImageIcon
                      className="h-6 w-6 text-neutral-500"
                      strokeWidth={1.4}
                    />
                    <span className="text-sm font-medium text-neutral-300">
                      Click to browse
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Drop is also supported by your OS picker
                    </span>
                  </>
                )}
              </label>
            )}

            {coverError && (
              <p className="mt-2 text-xs text-rose-300">{coverError}</p>
            )}
          </Field>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
              Content
            </p>
            <BlockEditor
              blocks={post.content}
              onChange={(c) => set('content', c)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Category" required>
            <select
              required
              value={post.category}
              onChange={(e) => set('category', e.target.value)}
              className="input"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={post.status}
              onChange={(e) => set('status', e.target.value)}
              className="input"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <Field label="Publish Date">
            <input
              type="date"
              value={post.publishedOn || ''}
              onChange={(e) => set('publishedOn', e.target.value)}
              className="input"
            />
          </Field>

          <Field label="Reading Time">
            <input
              type="text"
              value={post.readingTime}
              onChange={(e) => set('readingTime', e.target.value)}
              placeholder="6 min read"
              className="input"
            />
          </Field>

          <Field label="Author Name" required>
            <input
              type="text"
              required
              value={post.author.name}
              onChange={onAuthorNameChange}
              className="input"
            />
          </Field>

          <Field label="Author Initials">
            <input
              type="text"
              maxLength={3}
              value={post.author.initials}
              onChange={(e) => {
                setAuthorInitialsTouched(true)
                setAuthor('initials', e.target.value.toUpperCase())
              }}
              className="input"
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submit('draft')}
          disabled={submitting}
          className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/[0.08] disabled:opacity-60"
        >
          Save Draft
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 hover:bg-[#FFE57A] disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {initial?._id ? 'Update Post' : 'Publish Post'}
        </button>
      </div>

      <style>{`
        .input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.10);
          background-color: rgba(255,255,255,0.03);
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color .3s, background-color .3s;
        }
        .input::placeholder { color: rgb(115 115 115); }
        .input:focus {
          border-color: rgba(255,215,0,0.6);
          background-color: rgba(255,255,255,0.06);
        }
      `}</style>
    </form>
  )
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminApi.get('/blogs')
      setBlogs(data.data || [])
    } catch (err) {
      setError(apiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = blogs.filter((b) => {
    if (filter !== 'all' && b.status !== filter) return false
    if (
      query &&
      !b.title.toLowerCase().includes(query.toLowerCase()) &&
      !b.author?.name?.toLowerCase().includes(query.toLowerCase())
    )
      return false
    return true
  })

  const handleSave = async (post) => {
    setSubmitting(true)
    try {
      // Strip empty publishedOn so server doesn't reject the cast
      const payload = { ...post }
      if (!payload.publishedOn) delete payload.publishedOn
      if (!payload._id) {
        const { _id, views, ...createBody } = payload
        const { data } = await adminApi.post('/blogs', createBody)
        setBlogs((p) => [data.data, ...p])
      } else {
        const { data } = await adminApi.patch(`/blogs/${payload._id}`, payload)
        setBlogs((p) => p.map((b) => (b._id === payload._id ? data.data : b)))
      }
      setEditing(null)
    } catch (err) {
      alert(apiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await adminApi.delete(`/blogs/${id}`)
      setBlogs((p) => p.filter((b) => b._id !== id))
    } catch (err) {
      alert(apiError(err))
    }
  }

  return (
    <AdminLayout
      title="Blogs"
      description="Write, edit and publish blog posts."
      actions={
        !editing && (
          <button
            type="button"
            onClick={() => setEditing(emptyPost())}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] sm:text-[13px]"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Post
          </button>
        )
      }
    >
      {editing ? (
        <PostForm
          initial={editing._id ? toFormShape(editing) : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
          submitting={submitting}
        />
      ) : (
        <>
          {error && (
            <div className="mb-5 rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="search"
                placeholder="Search by title or author…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              {['all', 'published', 'draft', 'scheduled'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest transition-colors ${
                    filter === f
                      ? 'bg-[#FFD700] text-neutral-900'
                      : 'border border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="hidden grid-cols-12 items-center gap-4 border-b border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:grid sm:px-6">
              <span className="col-span-5">Title</span>
              <span className="col-span-2">Category</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-1">Views</span>
              <span className="col-span-2 text-right">Actions</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-neutral-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading posts…
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-neutral-400">No posts found.</p>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-white/[0.06]">
                {filtered.map((blog) => (
                  <li
                    key={blog._id}
                    className="grid grid-cols-1 items-center gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-12 sm:px-6"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:col-span-5">
                      <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md border border-white/10 bg-neutral-900 sm:h-12 sm:w-16">
                        {blog.cover ? (
                          <img
                            src={blog.cover}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-neutral-600">
                            <ImageIcon className="h-4 w-4" strokeWidth={1.6} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {blog.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                          /blog/{blog.slug}
                        </p>
                        <p className="mt-1 text-[11px] text-neutral-500">
                          By {blog.author?.name} · {blog.readingTime}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:col-span-2 sm:block">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-neutral-300">
                        {blog.category}
                      </span>
                    </div>

                    <div className="hidden sm:col-span-2 sm:block">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${statusStyles[blog.status]}`}
                      >
                        {blog.status}
                      </span>
                    </div>

                    <div className="hidden text-xs tabular-nums text-neutral-400 sm:col-span-1 sm:block">
                      {(blog.views || 0).toLocaleString()}
                    </div>

                    <div className="flex items-center justify-end gap-1.5 sm:col-span-2">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Preview"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setEditing(blog)}
                        aria-label="Edit"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                      >
                        <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog._id)}
                        aria-label="Delete"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-rose-400/10 hover:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}
