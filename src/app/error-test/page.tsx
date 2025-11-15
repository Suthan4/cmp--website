// app/test-error/page.tsx
import BuggyComponent from "@/components/buggyComponent";

export default function TestErrorPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">ErrorBoundary Test Page</h1>
      <BuggyComponent />
    </div>
  );
}
