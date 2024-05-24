import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function StoreProfileDialog(){
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <form >
                <div className='space-y-y py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='name'>
                            Nome
                        </Label>
                        <Input className='col-span-3' id='name'/>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='description'>
                            Descrição
                        </Label>
                        <Input className='col-span-3' id='description'/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" type='button'>Cancelar</Button>
                    <Button type='submit' variant='success'>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}