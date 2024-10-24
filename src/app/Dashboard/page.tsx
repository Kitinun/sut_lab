"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Registration {
  id: number;
  examId: string;
  title: string;
  firstName: string;
  lastName: string;
  grade: string;
  school: string;
  examCenter: string;
  subjects: {
    mathematics: boolean;
    physics: boolean;
    chemistry: boolean;
    biology: boolean;
  };
  status: string;
  createdAt: string;
}

interface Stats {
  totalRegistrations: number;
  byGrade: {
    [key: string]: number;
  };
  byExamCenter: {
    [key: string]: number;
  };
  bySubject: {
    mathematics: number;
    physics: number;
    chemistry: number;
    biology: number;
  };
}

const Dashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    byGrade: {},
    byExamCenter: {},
    bySubject: {
      mathematics: 0,
      physics: 0,
      chemistry: 0,
      biology: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/registrations");
      const data = await response.json();
      setRegistrations(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const stats: Stats = {
      totalRegistrations: data.length,
      byGrade: {},
      byExamCenter: {},
      bySubject: {
        mathematics: 0,
        physics: 0,
        chemistry: 0,
        biology: 0,
      },
    };

    data.forEach((reg) => {
      // นับตามระดับชั้น
      stats.byGrade[reg.grade] = (stats.byGrade[reg.grade] || 0) + 1;

      // นับตามสนามสอบ
      stats.byExamCenter[reg.examCenter] =
        (stats.byExamCenter[reg.examCenter] || 0) + 1;

      // นับตามวิชา
      if (reg.subjects.mathematics) stats.bySubject.mathematics++;
      if (reg.subjects.physics) stats.bySubject.physics++;
      if (reg.subjects.chemistry) stats.bySubject.chemistry++;
      if (reg.subjects.biology) stats.bySubject.biology++;
    });

    setStats(stats);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">สมัครสอบ</h1>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          กลับหน้าหลัก
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dashboard ข้อมูลการสมัครสอบ
      </h1>

      {/* สรุปข้อมูลภาพรวม */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            จำนวนผู้สมัครทั้งหมด
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalRegistrations} คน
          </p>
        </div>
        {/* สถิติอื่นๆ ที่น่าสนใจ */}
      </div>

      {/* แผนภูมิและกราฟ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* จำนวนผู้สมัครตามระดับชั้น */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            จำนวนผู้สมัครตามระดับชั้น
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.byGrade).map(([grade, count]) => (
              <div key={grade} className="flex items-center">
                <span className="w-20">{grade}</span>
                <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${(count / stats.totalRegistrations) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right">{count} คน</span>
              </div>
            ))}
          </div>
        </div>

        {/* จำนวนผู้สมัครตามสนามสอบ */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            จำนวนผู้สมัครตามสนามสอบ
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.byExamCenter).map(([center, count]) => (
              <div key={center} className="flex items-center">
                <span className="w-32">{center}</span>
                <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${(count / stats.totalRegistrations) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right">{count} คน</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* จำนวนผู้สมัครตามวิชา */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          จำนวนผู้สมัครตามวิชา
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-600 mb-2">คณิตศาสตร์</h4>
            <p className="text-2xl font-bold text-blue-600">
              {stats.bySubject.mathematics} คน
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-600 mb-2">ฟิสิกส์</h4>
            <p className="text-2xl font-bold text-green-600">
              {stats.bySubject.physics} คน
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-600 mb-2">เคมี</h4>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.bySubject.chemistry} คน
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-600 mb-2">ชีววิทยา</h4>
            <p className="text-2xl font-bold text-purple-600">
              {stats.bySubject.biology} คน
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
