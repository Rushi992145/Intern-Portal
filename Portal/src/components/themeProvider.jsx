import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  // Apply the appropriate theme classes based on the theme state
  return (
    <div
      className={`${
        theme === 'dark' 
          ? 'dark bg-[#1E1E2F] text-gray-300 border-gray-700 accent-[#5B8CFF]' 
          : 'light bg-white text-gray-800 border-gray-300 accent-blue-500'
      } min-h-screen`}
    >
      {children}
    </div>
  );
}
