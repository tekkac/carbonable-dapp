import { Link } from "@remix-run/react";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const footerCssClass = 'text-black/50 rounded-xl flex align-center justify-center p-2 bg-white flex items-center justify-center hover:bg-gradient-to-r from-green to-lightblue  '
const footerCssClass2 = 'text-black/50 rounded-xl flex align-center justify-center p-2 bg-white flex items-center justify-center hover:bg-gradient-to-r from-green to-lightblue  '
const defaultCssClass = 'font-inter uppercase rounded-3xl text-black/50 px-4 py-2 text-sm flex items-center justify-center hover:bg-gradient-to-r from-green to-lightblue ';


export function LinkFooter({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={footerCssClass + className} rel="noreferrer">{children}</a>;
}

export default function LinkButton({ href, children, className }: LinkButtonProps) {
    return <Link to={href} className={defaultCssClass + className}>{children}</Link>;
}

export function LinkOutsideButton({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={defaultCssClass + className} rel="noreferrer">{children}</a>;
}

