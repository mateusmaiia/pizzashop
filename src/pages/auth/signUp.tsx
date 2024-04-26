import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import {useForm} from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpForm = z.object({
  email: z.string().email()
})

type signUpForm = z.infer<typeof signUpForm>


export function SignUp() {
  const {register,  handleSubmit, formState: {isSubmitting}} = useForm()

  async function handleSignUp(data: signUpForm){
    
    try {
      console.log(data)
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Enviamos um link de confirmação no seu e-mail", {
        action: {
        label: "Reenviar",
        onClick: () => handleSignUp(data)
        }
      })
    } catch (error) {
      toast.error('Credencias inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div className="w-[350px] flex-col justify-center Cap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta gŕatis
            </h1>
            <p className="text-sm text-muted-foreground">
                Seja um parceiro e comece suas vendas!k
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit" {...register("submit")}>
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
