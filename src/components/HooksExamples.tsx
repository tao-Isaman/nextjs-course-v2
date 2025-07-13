'use client';

import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

// ===== useContext Example =====
// สร้าง Context สำหรับจัดการข้อมูลผู้ใช้
const UserContext = createContext<{
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
}>({
  user: null,
  setUser: () => {},
});

// Provider Component สำหรับ Context
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Component ที่ใช้ useContext
const UserProfile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser({ name: 'สมชาย ใจดี', email: 'somchai@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="p-4 border rounded-lg bg-blue-50 text-black">
      <h3 className="text-lg font-bold mb-2">useContext Example - ข้อมูลผู้ใช้</h3>
      {user ? (
        <div>
          <p>ชื่อ: {user.name}</p>
          <p>อีเมล: {user.email}</p>
          <button 
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <div>
          <p>ยังไม่ได้เข้าสู่ระบบ</p>
          <button 
            onClick={handleLogin}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      )}
    </div>
  );
};

// ===== useState Example =====
const Counter: React.FC = () => {
  // useState สำหรับเก็บค่า counter
  const [count, setCount] = useState<number>(0);
  
  // useState สำหรับเก็บข้อความ
  const [message, setMessage] = useState<string>('เริ่มต้นที่ 0');

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    setMessage(`เพิ่มเป็น ${count + 1}`);
  };

  const times = () => {
    setCount(prevCount => prevCount * 2);
    setMessage(`คูณด้วย 2 เป็น ${count * 2}`);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
    setMessage(`ลดเป็น ${count - 1}`);
  };

  const reset = () => {
    setCount(0);
    setMessage('รีเซ็ตเป็น 0');
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50 text-black">
      <h3 className="text-lg font-bold mb-2">useState Example - ตัวนับ</h3>
      <div className="text-2xl font-bold mb-2">{count}</div>
      <p className="text-sm text-gray-600 mb-4">{message}</p>
      <div className="flex gap-2">
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ลด
        </button>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          รีเซ็ต
        </button>
        <button 
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          เพิ่ม
        </button>
        <button 
          onClick={times}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          คูณ
        </button>
      </div>
    </div>
  );
};

// ===== useEffect Example =====
const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // useEffect สำหรับจัดการ timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // Cleanup function - จะทำงานเมื่อ component unmount หรือ dependency เปลี่ยน
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // dependency array - useEffect จะทำงานใหม่เมื่อ isRunning เปลี่ยน

  // useEffect สำหรับแสดงข้อความเมื่อ time เปลี่ยน
  useEffect(() => {
    if (time > 0 && time % 10 === 0) {
      console.log(`ผ่านไปแล้ว ${time} วินาที`);
    }
  }, [time]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50 text-black">
      <h3 className="text-lg font-bold mb-2">useEffect Example - ตัวจับเวลา</h3>
      <div className="text-3xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex gap-2">
        <button 
          onClick={startTimer}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          เริ่ม
        </button>
        <button 
          onClick={stopTimer}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
        >
          หยุด
        </button>
        <button 
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          รีเซ็ต
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        เปิด Developer Console เพื่อดูข้อความทุก 10 วินาที
      </p>
    </div>
  );
};

// ===== useRef Example =====
const FocusInput: React.FC = () => {
  // useRef สำหรับอ้างอิง DOM element
  const inputRef = useRef<HTMLInputElement>(null);
  
  // useRef สำหรับเก็บค่า previous count
  const prevCountRef = useRef<number>(0);
  const [count, setCount] = useState<number>(0);

  const focusInput = () => {
    // ใช้ ref เพื่อ focus ที่ input
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const addName = () => {
    if (inputRef.current) {
      inputRef.current.value = 'สมชาย ใจดี';
    }
  }

  const incrementCount = () => {
    setCount(prev => {
      prevCountRef.current = prev; // เก็บค่า previous
      return prev + 1;
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50 text-black">
      <h3 className="text-lg font-bold mb-2">useRef Example - การจัดการ Input</h3>
      
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="พิมพ์ข้อความที่นี่..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={focusInput}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Focus Input
        </button>
        <button 
          onClick={clearInput}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          ล้างข้อความ
        </button>
        <button 
          onClick={addName}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          เพิ่มชื่อ
        </button>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-bold mb-2">ตัวอย่างการเก็บค่า Previous:</h4>
        <p>ค่าปัจจุบัน: {count}</p>
        <p>ค่าเดิม: {prevCountRef.current}</p>
        <button 
          onClick={incrementCount}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          เพิ่มค่า
        </button>
      </div>
    </div>
  );
};

// ===== Main Component =====
const HooksExamples: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">ตัวอย่าง React Hooks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Counter />
        <Timer />
        <FocusInput />
        <UserProvider>
          <UserProfile />
        </UserProvider>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">คำอธิบาย React Hooks</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-blue-600">useState</h3>
            <p className="text-sm">
              ใช้สำหรับจัดการ state ใน functional component เก็บข้อมูลที่สามารถเปลี่ยนแปลงได้ 
              และทำให้ component re-render เมื่อ state เปลี่ยน
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-green-600">useEffect</h3>
            <p className="text-sm">
              ใช้สำหรับจัดการ side effects เช่น การเรียก API, การตั้งค่า timer, 
              การ subscribe/unsubscribe จาก external data source
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-purple-600">useRef</h3>
            <p className="text-sm">
              ใช้สำหรับอ้างอิง DOM elements หรือเก็บค่าที่ไม่ทำให้ component re-render 
              เมื่อเปลี่ยน เช่น การ focus input หรือเก็บค่า previous
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-orange-600">useContext</h3>
            <p className="text-sm">
              ใช้สำหรับเข้าถึง Context ที่สร้างไว้ เพื่อส่งข้อมูลผ่าน component tree 
              โดยไม่ต้องส่ง props ผ่านหลายระดับ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksExamples; 