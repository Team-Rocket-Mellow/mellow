import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  password: string
  re_password: string
}

function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => alert(JSON.stringify(data))

  return ( 
    <>
      <h4>Welcome to Mellow</h4>
      <form>
        <input {...register('name')} placeholder='name' />
        <input {...register('email')} placeholder='email' />
        <input {...register('password')} placeholder='password' />
        <input {...register('re_password')} placeholder='re-enter password ' />
        <button onClick={handleSubmit(onSubmit)}>Register</button>
      </form>
    </>
  )
}

export default SignUp

