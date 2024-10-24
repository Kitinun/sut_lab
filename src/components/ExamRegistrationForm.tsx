"use client";

import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  school: string;
  grade: string;
  examCenter: string;
  subjects: {
    mathematics: boolean;
    physics: boolean;
    chemistry: boolean;
    biology: boolean;
  };
}

const ExamRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    school: "",
    grade: "ม.4",
    examCenter: "นครราชสีมา",
    subjects: {
      mathematics: false,
      physics: false,
      chemistry: false,
      biology: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit registration");
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        school: "",
        grade: "ม.4",
        examCenter: "นครราชสีมา",
        subjects: {
          mathematics: false,
          physics: false,
          chemistry: false,
          biology: false,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          สมัครสอบสำเร็จ!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ข้อมูลส่วนตัว */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              นามสกุล
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* โรงเรียนและระดับชั้น */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              โรงเรียน
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับชั้น
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ม.4">มัธยมศึกษาปีที่ 4</option>
              <option value="ม.5">มัธยมศึกษาปีที่ 5</option>
              <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
            </select>
          </div>
        </div>

        {/* วิชาที่สมัครสอบ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            วิชาที่ต้องการสอบ (เลือกอย่างน้อย 1 วิชา)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="mathematics"
                checked={formData.subjects.mathematics}
                onChange={handleSubjectChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">คณิตศาสตร์</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="physics"
                checked={formData.subjects.physics}
                onChange={handleSubjectChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">ฟิสิกส์</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="chemistry"
                checked={formData.subjects.chemistry}
                onChange={handleSubjectChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">เคมี</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="biology"
                checked={formData.subjects.biology}
                onChange={handleSubjectChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">ชีววิทยา</span>
            </label>
          </div>
        </div>

        {/* สนามสอบ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สนามสอบ
          </label>
          <select
            name="examCenter"
            value={formData.examCenter}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="นครราชสีมา">นครราชสีมา</option>
            <option value="สุรินทร์">สุรินทร์</option>
            <option value="บุรีรัมย์">บุรีรัมย์</option>
            <option value="ชัยภูมิ">ชัยภูมิ</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
        >
          {loading ? "กำลังส่งข้อมูล..." : "สมัครสอบ"}
        </button>
      </form>
    </div>
  );
};

export default ExamRegistrationForm;
