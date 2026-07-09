"use client";
'use client';

import { useMemo, useState } from 'react';

type CourseOption = {
  id: string;
  title: string;
  instructor_name?: string | null;
  instructor_2_name?: string | null;
};

type CourseRegistrationFormProps = {
  courses: CourseOption[];
};

export default function CourseRegistrationForm({ courses }: CourseRegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses?.[0]?.id ?? '');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [courses, selectedCourseId],
  );

  const instructorOptions = useMemo(() => {
    const options: string[] = [];
    if (selectedCourse?.instructor_name) options.push(selectedCourse.instructor_name);
    if (selectedCourse?.instructor_2_name) options.push(selectedCourse.instructor_2_name);
    return options.length > 0 ? options : ['Not specified'];
  }, [selectedCourse]);

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    const course = courses.find((courseItem) => courseItem.id === value);
    const firstInstructor = course?.instructor_name || course?.instructor_2_name || '';
    setSelectedInstructor(firstInstructor);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const payload = {
      fullName,
      fatherName,
      email,
      phone,
      courseId: selectedCourseId,
      courseTitle: selectedCourse?.title || 'Unknown course',
      instructor: selectedInstructor,
      page: 'Courses Listing',
    };

    try {
      const response = await fetch('/api/telegram/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to send registration');
      }

      setStatus('success');
      setMessage('Registration request sent successfully. Our team will contact you soon!');
      setFullName('');
      setFatherName('');
      setEmail('');
      setPhone('');
      setSelectedCourseId(courses?.[0]?.id ?? '');
      setSelectedInstructor(courses?.[0]?.instructor_name || courses?.[0]?.instructor_2_name || '');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <section className="mt-24 rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">Register Now</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Join a course in one click</h2>
          <p className="mt-4 max-w-2xl text-neutral-400 leading-7">
            Select the course and instructor, submit your details, and we will confirm your registration through Telegram immediately.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-yellow-500 px-8 py-4 text-base font-extrabold text-black shadow-[0_20px_60px_rgba(234,179,8,0.3)] transition-all duration-300 hover:bg-yellow-400"
        >
          {isOpen ? 'Close Form' : 'Open Registration'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-neutral-300">Full Name</span>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
              placeholder="Your full name"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-300">Father's Name</span>
            <input
              required
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
              placeholder="Father's name"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-300">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-neutral-300">Phone Number</span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
              placeholder="+44 7123 456789"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-neutral-300">Which course are you interested in?</span>
            <select
              required
              value={selectedCourseId}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id} className="bg-neutral-950 text-white">
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-neutral-300">Select Instructor</span>
            <select
              required
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
            >
              {instructorOptions.map((instructor) => (
                <option key={instructor} value={instructor} className="bg-neutral-950 text-white">
                  {instructor}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-neutral-300">Additional Notes</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-3 h-28 w-full rounded-3xl border border-white/10 bg-neutral-900/80 px-5 py-4 text-white outline-none transition-all duration-200 focus:border-yellow-500"
              placeholder="Any extra details or questions..."
            />
          </label>

          <div className="sm:col-span-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-4 text-base font-extrabold text-black transition-all duration-300 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending...' : 'Place Your Order'}
            </button>
            {status === 'success' && (
              <p className="text-sm text-emerald-400">Your registration has been sent to Telegram successfully.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">{message || 'Failed to send registration. Please try again.'}</p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
