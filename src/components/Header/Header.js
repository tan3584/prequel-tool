import React from 'react';
import './header.css';

const Header = () => {

    return (
        <header className='absolute top-0 left-0 z-40 w-full tablet:fixed header-cont opacity-0'>
            <div className="bg-black bg-opacity-[0.6] mx-100 h-[99px] px-40 flex items-center justify-between tablet:hidden">
                <div className="flex flex-shrink-0 items-center">
                    <a href="#">
                        <img alt="Soul Knight Prequel" src={require(`../../public/img/logo.png`)} ></img>
                    </a>
                </div>
                <div className="flex">
                    <div className="flex mr-10 items-center">
                        <a className="bold text-white cursor-pointer mx-8 font-22px relative style_menu-list__0g2n_  laptop:text-[20px]">Boss Timer</a>
                        <a className="bold text-white cursor-pointer mx-8 font-22px relative style_menu-list__0g2n_  laptop:text-[20px]">Fate Bounds</a>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;