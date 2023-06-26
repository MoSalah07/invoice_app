import React from "react";
import './sidebar.css';
import Logo from './Logo';
import SwitchIcons from './SwitchIcons';
import PortFolio from './PortFolio';
import useWindowDeimensions from "../../CustomHook/useWindowDeimensions";
import { CTXTheme } from '../../Context/ContextTheme';
function Sidebar({setShowProfile}) {
  const { width } = useWindowDeimensions();
  const { theme } = CTXTheme();
    return <aside className={`sidebar ${width < 991 ? 'mobile' : ''} ${theme ? 'light' : ''}`}>
        <Logo />
        <SwitchIcons />
      <PortFolio setShowProfile={setShowProfile}/>
  </aside>;
}

export default Sidebar;
