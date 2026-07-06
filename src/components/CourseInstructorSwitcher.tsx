'use client';

import { useState } from 'react';

type Instructor = {
  name: string;
  bio: string;
  imageUrl?: string | null;
};

type CourseInstructorSwitcherProps = {
  primary: Instructor;
  secondary?: Instructor | null;
};

export default function CourseInstructorSwitcher({
  primary,
  secondary,
}: CourseInstructorSwitcherProps) {
  const [activeInstructor, setActiveInstructor] = useState<'primary' | 'secondary'>('primary');

  const instructors = secondary
    ? [
        { id: 'primary' as const, label: 'Instructor 1', data: primary },
        { id: 'secondary' as const, label: 'Instructor 2', data: secondary },
      ]
    : [{ id: 'primary' as const, label: 'Instructor', data: primary }];

  const currentInstructor = instructors.find((item) => item.id === activeInstructor)?.data ?? primary;

  return (
    <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-7 shadow-[0_35px_100px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      {secondary && (
        <div className="mb-6 flex rounded-full border border-white/10 bg-white/5 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {instructors.map((item) => {
            const isActive = item.id === activeInstructor;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveInstructor(item.id)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                    : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex w-full max-w-[260px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-yellow-500/20 via-neutral-900 to-neutral-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {currentInstructor.imageUrl ? (
            <img
              src={currentInstructor.imageUrl}
              alt={currentInstructor.name}
              className="max-h-[320px] w-full rounded-[1.35rem] object-contain"
            />
          ) : (
            <span className="text-5xl font-black text-yellow-400">
              {currentInstructor.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
          Course Instructor
        </p>
        <h3 className="text-2xl font-bold text-white">{currentInstructor.name}</h3>
        <p className="mt-3 text-sm leading-7 text-neutral-300">{currentInstructor.bio}</p>
      </div>
    </div>
  );
}
