# ระบบสมัครสอบวัดระดับความสามารถทางวิทยาศาสตร์และคณิตศาสตร์

ระบบจัดการการสมัครสอบสำหรับนักเรียนชั้นมัธยมศึกษาตอนปลาย พัฒนาด้วย Next.js, TypeScript และ Tailwind CSS

## คุณสมบัติหลัก

- 📝 ระบบลงทะเบียนสมัครสอบ
- 📊 Dashboard แสดงภาพรวมข้อมูล
- 📋 ตารางแสดงรายชื่อผู้สมัคร
- 🗑️ ระบบจัดการข้อมูลผู้สมัคร
- 📱 Responsive Design รองรับทุกอุปกรณ์

## เทคโนโลยีที่ใช้

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Hooks

- **Backend:**
  - Next.js API Routes
  - PostgreSQL
  - Prisma ORM

## การติดตั้ง

1. Clone โปรเจค:
```bash
git clone <repository-url>
cd <project-name>
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. ตั้งค่าไฟล์ .env:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

4. สร้างฐานข้อมูลและ Prisma client:
```bash
npx prisma migrate dev
npx prisma generate
```

5. รันโปรเจคในโหมด development:
```bash
npm run dev
```

## การใช้งานระบบ

### การสมัครสอบ
1. กรอกข้อมูลส่วนตัว:
   - ชื่อ-นามสกุล
   - ระดับชั้น
   - ข้อมูลโรงเรียน

2. เลือกวิชาที่ต้องการสอบ:
   - คณิตศาสตร์
   - ฟิสิกส์
   - เคมี
   - ชีววิทยา

3. เลือกสนามสอบ:
   - นครราชสีมา
   - สุรินทร์
   - บุรีรัมย์
   - ชัยภูมิ

### การจัดการข้อมูล
1. Dashboard:
   - แสดงภาพรวมจำนวนผู้สมัคร
   - สถิติแยกตามระดับชั้น
   - สถิติแยกตามสนามสอบ
   - สถิติแยกตามวิชา

2. ตารางข้อมูล:
   - แสดงรายชื่อผู้สมัครทั้งหมด
   - ค้นหาและกรองข้อมูล

## API Endpoints

### GET /api/registrations
- ดึงข้อมูลผู้สมัครทั้งหมด

### POST /api/registrations
- สร้างข้อมูลการสมัครใหม่

## การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ สามารถติดต่อได้ที่:
- Email: [kitinun.khonson@gmail.com]

## License

[MIT License](LICENSE)
