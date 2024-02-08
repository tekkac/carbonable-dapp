interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const footerCssClass = 'rounded-xl flex justify-center p-2 items-center justify-center text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 ';
const secondaryButton = 'font-inter uppercase rounded-lg px-4 py-2 text-xs text-neutal-100 border border-opacityLight-10 tracking-wide bg-opacityLight-5 hover:bg-opacityLight-10 md:px-6 md:py-3 xl:text-sm  ';
const greenActionButton = 'font-inter uppercase rounded-full p-4 text-sm text-neutral-100 bg-greenish-600 text-center hover:bg-greenish-500 ';

export function LinkFooter({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={footerCssClass + className} rel="noreferrer">{children}</a>;
}

export function LinkSecondary({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={secondaryButton + className} rel="noreferrer">{children}</a>;
}

export function GreenLinkButton({ href, children, className }: LinkButtonProps) {
    return <a href={href} className={greenActionButton + className}>{children}</a>;
}

export function FarmingGreenLinkButton({ href, children, className}: LinkButtonProps) {
    return <a href={href} className={`font-inter text-white text-sm rounded-lg bg-greenish-600 px-4 py-3 hover:bg-greenish-500 ` + className}>{children}</a>;
}

