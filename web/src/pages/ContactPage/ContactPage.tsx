import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  Form,
  TextField,
  Submit,
  SubmitHandler,
  TextAreaField,
  FieldError,
  Label,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      name
      email
      message
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT_MUTATION, {
    onCompleted: () => {
      toast.success('Thanks for your submission')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({
      variables: {
        input: data,
      },
    })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      <h1>ContactPage</h1>
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Submit</Submit>
      </Form>
    </>
  )
}

export default ContactPage
