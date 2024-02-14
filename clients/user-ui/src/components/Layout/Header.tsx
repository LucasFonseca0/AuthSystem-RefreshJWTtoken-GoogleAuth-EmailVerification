import styles from '@/src/utils/style'
import NavItems from "../NavItems"
import  ProfileDropdown  from '../ProfileDropdown'


const Header = () => {
  return (
    <header className='w-full  bg-[#0F1524] '>
     
        <div className="w-[90%] h-[80px] m-auto flex items-center justify-between" >
            <h1 className={`${styles.logo}`}>
                Becodemy
            </h1>
            <NavItems/>
            <ProfileDropdown/>
        </div>
        
    </header>
  )
}

export default Header
