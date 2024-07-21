import { menuItems } from '../menuItems';
import { menuItemUser } from '../menuItemUser';
import MenuItems from './MenuItems';
const Navbar = () => {
  if (localStorage.getItem('tipo')=="admin") {
    return (
      <nav>
        <ul className="menus">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
              />
            );
          })}
        </ul>
      </nav>
    ); 
  }else{
    return (
      <nav>
        <ul className="menus">
          {menuItemUser.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
              />
            );
          })}
        </ul>
      </nav>
    ); 
  }
};
export default Navbar;
