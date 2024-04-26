import { Link, LinkProps } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLik(props: NavLinkProps){
    return (
        <Link className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground" 
            {...props}
        />
    )
}