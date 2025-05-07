// hooks/useProfileLang.ts
import { profileData, ProfileData } from '../data/profile.data';
import { useLangStore } from '../store/useLangStore';

export function useProfileLang(): ProfileData {
  const lang = useLangStore((state) => state.lang);
  return profileData[lang];
}
