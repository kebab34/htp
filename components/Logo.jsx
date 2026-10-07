// Logo HTP redessiné en vectoriel d'après la plaquette (immeubles dorés + socle).

export const LOGO_PATH =
  'M86 143L107 134V331H86ZM114 134L135 122V331H114ZM143 121L164 113V331H143ZM171 110L192 101V331H171ZM199 100L221 89V331H199ZM238 7L257 16V331H238ZM266 19L286 30V331H266ZM294 31L314 38V331H294ZM323 41L343 51V331H323ZM351 53L371 61V331H351ZM39 337H414V340H39ZM0 344H456V351H0Z';

export const GOLD = '#e3b22c';

export function LogoMark({ className, color = GOLD }) {
  return (
    <svg className={className} viewBox="0 0 456 352" aria-hidden="true">
      <path d={LOGO_PATH} fill={color} />
    </svg>
  );
}

export default function Logo({ slogan = true, className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <LogoMark className="brand-mark" />
      <span className="brand-text">
        <b>HTP</b>
        {slogan && <small>Votre projet, notre mission !</small>}
      </span>
    </span>
  );
}
