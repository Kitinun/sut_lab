import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "กรุณากรอกรหัสนักเรียน"],
  },
  firstName: {
    type: String,
    required: [true, "กรุณากรอกชื่อ"],
  },
  lastName: {
    type: String,
    required: [true, "กรุณากรอกนามสกุล"],
  },
  email: {
    type: String,
    required: [true, "กรุณากรอกอีเมล"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "กรุณากรอกอีเมลให้ถูกต้อง"],
  },
  phone: {
    type: String,
    required: [true, "กรุณากรอกเบอร์โทรศัพท์"],
    match: [/^[0-9]{10}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"],
  },
  school: {
    type: String,
    required: [true, "กรุณากรอกชื่อโรงเรียน"],
  },
  grade: {
    type: String,
    required: [true, "กรุณาเลือกระดับชั้น"],
    enum: ["ม.4", "ม.5", "ม.6"],
  },
  examCenter: {
    type: String,
    required: [true, "กรุณาเลือกสนามสอบ"],
    enum: ["นครราชสีมา", "สุรินทร์", "บุรีรัมย์", "ชัยภูมิ"],
  },
  subjects: {
    mathematics: { type: Boolean, default: false },
    physics: { type: Boolean, default: false },
    chemistry: { type: Boolean, default: false },
    biology: { type: Boolean, default: false },
  },
  status: {
    type: String,
    default: "รอการชำระเงิน",
    enum: ["รอการชำระเงิน", "ชำระเงินแล้ว", "ยกเลิก"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
