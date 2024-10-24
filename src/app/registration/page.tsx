// src/app/registration/page.tsx
import ExamRegistrationForm from "../../components/ExamRegistrationForm";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">สมัครสอบ</h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            กลับหน้าหลัก
          </Link>
        </div>
        <ExamRegistrationForm />
      </div>
    </div>
  );
}
