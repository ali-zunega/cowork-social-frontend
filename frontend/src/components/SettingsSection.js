import React from "react";
import "./SettingsSection.css";

const SettingsSection = ({ title, icon, children }) => {
  return (
    <section className="settings-section">
      <div className="settings-header">
        {icon && <span className="settings-icon">{icon}</span>}
        <h3 className="settings-title">{title}</h3>
      </div>
      <div className="settings-content">{children}</div>
    </section>
  );
};

export default SettingsSection;
