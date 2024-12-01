import { Select, SelectOption } from './SimpleSelect';
import { useThemeContext } from '../hooks/useTheme';

type Language = 'python' | 'javascript' | 'c';

type LanguageSelectProps = {
  selectedLanguage: Language;
  onLanguageChange: (value: Language) => void;
};

const LanguageSelect = ({ selectedLanguage = 'python', onLanguageChange }: LanguageSelectProps) => {
  const { systemTheme } = useThemeContext();
  return (
    <Select 
      value={selectedLanguage} 
      onChange={(value) => onLanguageChange(value as Language)}
      style={{
        backgroundColor: systemTheme.background.secondary,
        color: systemTheme.text.secondary,
      }}
      className="rounded-lg p-3 font-mono text-lg lg:text-xl"
    >
      <SelectOption value="python">Python</SelectOption>
      <SelectOption value="javascript">JavaScript</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export default LanguageSelect;