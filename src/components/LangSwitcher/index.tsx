import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/lang";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const LangSwitcher: FC<{ style?: any }> = ({ style }) => {
  const dispatch = useDispatch();
  const language = useSelector((state: any) => state.language.language);
  const { i18n } = useTranslation();

  const handleChangeLanguage = () => {
    if (language === "en") {
      i18n.changeLanguage("ar");
      dispatch(setLanguage("ar"));
    } else {
      i18n.changeLanguage("en");
      dispatch(setLanguage("en"));
    }
  };

  return (
    <div style={{ ...style, zIndex: "100", cursor: "pointer" }}>
      <button
        onClick={() => {
          handleChangeLanguage();
        }}
      >
        {language === "en" ? (
          <span className="fi fi-sa" style={{ fontSize: "1.5rem" }}></span>
        ) : (
          <span className="fi fi-us" style={{ fontSize: "1.5rem" }}></span>
        )}
      </button>
    </div>
  );
};

export default LangSwitcher;
