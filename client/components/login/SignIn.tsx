import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

function SignIn() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => alert(JSON.stringify(data))
  const onRegister = (data: FormValues) => alert(JSON.stringify(data))

  return ( 
    <>
      <div id='intro_1'>
        <div>
          <h3>Ready to get started?</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <button className="start-trial-button" onClick={handleSubmit(onRegister)}>Start Trial</button>
        </div>
      </div>

      <div id='intro_2'>
        <form>
          <h4>Already a user?</h4>
          <input className="email-input" {...register('email')} placeholder='email' />
          <input className="password-input" {...register('password')} placeholder='password' />
          <button className="sign-in-button" onClick={handleSubmit(onSubmit)}>Sign In</button>
        </form>
      </div>
    </>
  )
}

export default SignIn
