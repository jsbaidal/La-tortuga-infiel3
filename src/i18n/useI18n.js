import { useI18nContext } from './I18nProvider.jsx';

export default function useI18n() {
  const ctx = useI18nContext();
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
