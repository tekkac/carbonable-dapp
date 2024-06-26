import { XMarkIcon } from "@heroicons/react/24/outline";
import { slide as Menu } from 'react-burger-menu';
import NavMenu from "./NavMenu";

export default function NavMenuMobile({menuOpen, handleStateChange, closeMenu, canClose}: any) {

    return ( 
        <Menu 
            customBurgerIcon={ false }
            customCrossIcon={ canClose ? <XMarkIcon className="text-neutral-200" /> : false }
            pageWrapId={ "page-wrap" }
            outerContainerId={"outer-container"}
            isOpen={menuOpen}
            onStateChange={(state) => handleStateChange(state)}
            onClose={closeMenu}
            className="bg-black bg-navigation"
            >
            <NavMenu closeMenu={closeMenu} />
        </Menu>
    )
}