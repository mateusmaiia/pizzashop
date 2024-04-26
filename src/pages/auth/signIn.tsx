import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signInForm = z.object({

  email: z.string().email(),
})

type signInForm = z.infer<typeof signInForm>


export function SignIn() {
  const {register,  handleSubmit, formState: {isSubmitting}} = useForm()

  async function handleSignIn(data: signInForm){
    try {
      console.log(data)
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Enviamos um link de confirmação no seu e-mail")
    } catch (error) {
      toast.error('Credencias inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild variant="ghost" className='absolute right-8 top-8'>
            <Link to="/sign-up" className='k'>
                Novo estabelecimento
            </Link>
        </Button>
        <div className="w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel parceiro! 
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register("email")}/>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit" {...register("submit")}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
