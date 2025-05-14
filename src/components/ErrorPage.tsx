import { useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p className="text-lg mb-4">Something went wrong.</p>
      <p className="text-sm text-muted-foreground mb-6">
        {error?.message || 'An unexpected error occurred. Please try again later.'}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>Refresh</Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
