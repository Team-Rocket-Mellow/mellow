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
    <div id="SignUp">
      <h3 className="welcome-intro" >Welcome to Mellow</h3>
      <form className="sign-up-form">
        <input className="sign-up-name" {...register('name')} placeholder='name' />
        <input className="sign-up-email" {...register('email')} placeholder='email' />
        <input className="sign-up-password" {...register('password')} placeholder='password' />
        <input className="sign-up-reenter" {...register('re_password')} placeholder='re-enter password ' />
        <button className="register-button" onClick={handleSubmit(onSubmit)}>Register</button>
      </form>
    </div>
  )
}

export default SignUp

