import { businessInfo } from '../../data/businessInfo';
import Modal from '../common/Modal';

/**
 * TODO: valós cégadatokkal kitölteni (üzemeltető neve, székhely, adószám,
 * cégjegyzékszám / nyilvántartási szám, e-mail, tárhelyszolgáltató adatai).
 */
const IMPRESSUM_ROWS = [
  ['Üzemeltető', '[Cégnév / egyéni vállalkozó neve]'],
  ['Székhely', '[Székhely címe]'],
  ['Adószám', '[Adószám]'],
  ['Nyilvántartási szám', '[Cégjegyzékszám / EV nyilvántartási szám]'],
  ['Telefon', businessInfo.phone.display],
  ['E-mail', '[E-mail cím]'],
  ['Tárhelyszolgáltató', '[Tárhelyszolgáltató neve, címe, elérhetősége]'],
];

export default function ImpressumModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Impresszum">
      <dl className="grid gap-3 text-sm">
        {IMPRESSUM_ROWS.map(([label, value]) => (
          <div key={label} className="grid gap-0.5 border-b border-steel pb-3 sm:grid-cols-[10rem_1fr]">
            <dt className="font-condensed uppercase tracking-widest text-ash">{label}</dt>
            <dd className="text-bone">{value}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
