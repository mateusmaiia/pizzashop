import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLik(props: NavLinkProps){
    const {pathname} = useLocation()

    return (
        <Link 
            //data-attributes recebem valores true ou false;
            //Se o pathname for igual ao props.to === true;
            //props.to === rota que o link está enviando.
            //pathname === rota atual.
            data-current={pathname === props.to }
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground" 
            {...props}
        />
    )
}