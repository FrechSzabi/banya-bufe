import { useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';
import Button from '../common/Button';
import FormField, { inputClasses } from '../common/FormField';
import NeonWordmark from '../common/NeonWordmark';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await onLogin(password);
    } catch (loginError) {
      setError(loginError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-svh place-items-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border-4 border-mustard bg-coal corrugated">
        <div aria-hidden="true" className="hazard h-2" />
        <div className="flex flex-col gap-6 p-6">
          <div>
            <NeonWordmark size="sm" />
            <h1 className="mt-3 flex items-center gap-2 font-condensed text-lg font-semibold uppercase tracking-[0.25em] text-ash">
              <LockKeyhole aria-hidden="true" className="size-4" /> Rendeléskezelő
            </h1>
          </div>

          <FormField label="Jelszó" error={error} required>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses}
            />
          </FormField>

          <Button type="submit" size="lg" disabled={isSubmitting || !password}>
            {isSubmitting && <Loader2 aria-hidden="true" className="size-5 animate-spin" />}
            Belépés
          </Button>
        </div>
      </form>
    </div>
  );
}
