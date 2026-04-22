import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getApiErrorMessage, getFastApiFieldErrors } from '../api/errors'
import { getPostById, updatePost } from '../api/posts'
import { FormSkeleton } from '../components/LoadingSkeleton'
import PostForm from '../components/PostForm'
import { EmptyState, ErrorState, SuccessState } from '../components/StateCard'
import { useToast } from '../hooks/useToast'

export default function EditPostPage() {
  const { id } = useParams()
  const [values, setValues] = useState({ title: '', content: '', tags: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { showToast } = useToast()

  const fetchPost = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getPostById(id)
      setValues({
        title: response.data?.title || '',
        content: response.data?.content || '',
        tags: (response.data?.tags ?? []).join(', '),
      })
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load post.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPost()
  }, [fetchPost])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    const payload = {
      title: values.title,
      content: values.content,
      tags: values.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    try {
      await updatePost(id, payload)
      setSuccess('Post updated successfully.')
      showToast('Post updated successfully.')
      navigate(`/posts/${id}`)
    } catch (err) {
      const fieldErrors = getFastApiFieldErrors(err)
      if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors)
      const message = getApiErrorMessage(err, 'Unable to update post.')
      setError(message)
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <FormSkeleton />
  if (error && !values.title && !values.content) {
    return <ErrorState message={error} onRetry={fetchPost} />
  }
  if (!values.title && !values.content) {
    return (
      <EmptyState
        title="Nothing to edit yet"
        description="This post appears empty. Add a title and content to continue."
      />
    )
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Edit Post
      </h1>
      {error ? <ErrorState message={error} /> : null}
      {success ? <SuccessState message={success} /> : null}
      <PostForm
        values={values}
        errors={errors}
        loading={submitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </section>
  )
}
