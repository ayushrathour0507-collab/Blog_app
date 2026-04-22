import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiErrorMessage, getFastApiFieldErrors } from '../api/errors'
import { createPost } from '../api/posts'
import { FormSkeleton } from '../components/LoadingSkeleton'
import PostForm from '../components/PostForm'
import { ErrorState, SuccessState } from '../components/StateCard'
import { useToast } from '../hooks/useToast'

const initialValues = { title: '', content: '', tags: '', author_id: '' }

export default function NewPostPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    const payload = {
      title: values.title,
      content: values.content,
      tags: values.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      author_id: Number(values.author_id),
    }

    try {
      const response = await createPost(payload)
      const postId = response.data?.id ?? response.data?._id
      setSuccess('Post created successfully.')
      showToast('Post created successfully.')
      navigate(postId ? `/posts/${postId}` : '/posts')
    } catch (err) {
      const fieldErrors = getFastApiFieldErrors(err)
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
      }
      const message = getApiErrorMessage(err, 'Unable to create post.')
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Create New Post
      </h1>

      {loading ? <FormSkeleton /> : null}
      {error ? <ErrorState message={error} /> : null}
      {success ? <SuccessState message={success} /> : null}
      {!loading ? (
        <PostForm
          values={values}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Publish Post"
          showAuthorId
        />
      ) : null}
    </section>
  )
}
