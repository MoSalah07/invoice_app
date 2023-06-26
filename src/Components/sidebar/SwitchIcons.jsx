import React,{memo} from "react";
import { MdOutlineLogout, MdLightMode, MdDarkMode } from "react-icons/md";
import { CTXAuth } from "../../Context/ContextProviderAuth";
import { useNavigate } from "react-router-dom";
import { CTXTheme } from "../../Context/ContextTheme";
function SwitchIcons() {
  const { logout } = CTXAuth();
  const navigate = useNavigate();
  const { changeTheme, theme} = CTXTheme();
  const logoutAccount = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="switch-icons">
      <div className="flex-center">
        <MdOutlineLogout onClick={logoutAccount} />
      </div>
      <div onClick={changeTheme} className="flex-center">
        {theme ? <MdLightMode /> : <MdDarkMode />}
      </div>
    </div>
  );
}

export default memo(SwitchIcons);
