// src/app/page.tsx
import ExamRegistrationTable from "../components/ExamRegistration";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            ระบบสมัครสอบออนไลน์
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            การสอบวัดระดับความสามารถ
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            วิชาวิทยาศาสตร์และคณิตศาสตร์ สำหรับนักเรียนชั้นมัธยมศึกษาตอนปลาย
          </p>
        </div>
        <ExamRegistrationTable />
      </main>
    </div>
  );
}
