import ThemeTest from '@/components/ThemeTest';

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Theme System Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing the ThemeContext implementation
          </p>
        </div>
        
        <ThemeTest />
      </div>
    </div>
  );
}
