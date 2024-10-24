"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// กำหนด interface สำหรับข้อมูลการลงทะเบียน
interface Registration {
  id: number;
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
  status: string;
  createdAt: string;
}

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Registration | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/registrations");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ฟังก์ชันสำหรับการค้นหา
  const filteredData = registrations.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ฟังก์ชันสำหรับการเรียงลำดับ
  const handleSort = (field: keyof Registration) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // ฟังก์ชันสำหรับการเรียงลำดับข้อมูล
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // คำนวณข้อมูลสำหรับการแบ่งหน้า
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">เกิดข้อผิดพลาด: {error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Cards Grid */}
      <div className="flex">
        {/* Card 2: สมัครสอบ */}
        <div className="mt-4 mr-4">
          <Link
            href="/Dashboard"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Dashboard
          </Link>
        </div>
        <div className="mt-4">
          <Link
            href="/registration"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            สมัครสอบ
          </Link>
        </div>
      </div>
      <div className="p-6">
        {/* ส่วนค้นหา */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ตาราง */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("firstName")}
                >
                  ชื่อ{" "}
                  {sortField === "firstName" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("lastName")}
                >
                  นามสกุล{" "}
                  {sortField === "lastName" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("school")}
                >
                  โรงเรียน{" "}
                  {sortField === "school" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("grade")}
                >
                  ระดับชั้น{" "}
                  {sortField === "grade" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("examCenter")}
                >
                  สนามสอบ{" "}
                  {sortField === "examCenter" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-4 py-2">วิชาที่สมัคร</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.firstName}</td>
                  <td className="px-4 py-2">{item.lastName}</td>
                  <td className="px-4 py-2">{item.school}</td>
                  <td className="px-4 py-2">{item.grade}</td>
                  <td className="px-4 py-2">{item.examCenter}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {item.subjects.mathematics && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          คณิตศาสตร์
                        </span>
                      )}
                      {item.subjects.physics && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          ฟิสิกส์
                        </span>
                      )}
                      {item.subjects.chemistry && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          เคมี
                        </span>
                      )}
                      {item.subjects.biology && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                          ชีววิทยา
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded disabled:bg-gray-200 disabled:text-gray-400"
          >
            ก่อนหน้า
          </button>
          <span className="text-gray-600">
            หน้า {currentPage} จาก {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded disabled:bg-gray-200 disabled:text-gray-400"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </>
  );
};

export default RegistrationTable;
