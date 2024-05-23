import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from './ui/dialog'

export function StoreProfileDialog(){
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" type='button'>Cancelar</Button>
                <Button type='submit' variant='success'>Salvar</Button>
            </DialogFooter>
        </DialogContent>
    )
}