import React, { useState, useEffect } from "react";

const moods = [
  { label: "Exploding", color: "bg-red-700", hint: "爆炸" },
  { label: "Angry", color: "bg-red-500", hint: "愤怒" },
  { label: "Irritated", color: "bg-orange-400", hint: "烦躁" },
  { label: "Anxious", color: "bg-yellow-300", hint: "焦虑" },
  { label: "Helpless", color: "bg-gray-500", hint: "无奈" },
  { label: "Disappointed", color: "bg-purple-400", hint: "失望" },
  { label: "Sad", color: "bg-blue-500", hint: "伤心" },
  { label: "Bored", color: "bg-gray-300", hint: "无聊" },
  { label: "Calm", color: "bg-green-300", hint: "平和" },
  { label: "Smug", color: "bg-lime-300", hint: "得瑟" },
  { label: "Proud", color: "bg-sky-300", hint: "骄傲" },
  { label: "Sneaky Joy", color: "bg-pink-300", hint: "窃喜" },
  { label: "Happy", color: "bg-emerald-400", hint: "开心" },
  { label: "Ecstatic", color: "bg-pink-500", hint: "狂喜" },
  { label: "Blissful", color: "bg-yellow-500", hint: "幸福" }
];

export default function VibeDiary() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("vibeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("vibeHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = () => {
    if (!selectedMood) return;
    const entry = {
      mood: selectedMood,
      note,
      timestamp: new Date().toLocaleString()
    };
    setHistory([entry, ...history]);
    setSelectedMood(null);
    setNote("");
  };

  return (
    <div className="min-h-screen p-4 bg-zinc-100 text-zinc-800">
      <h1 className="text-3xl font-bold mb-4 text-center">Vibe Diary</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">My Mood Today</h2>
        <div className="grid grid-cols-3 gap-2">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m)}
              className={`text-white p-2 rounded-xl ${m.color} ${selectedMood?.label === m.label ? 'ring-4 ring-black/30' : ''}`}
              title={`\"${m.label}\" means \"${m.hint}\" in Chinese`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <textarea
          placeholder="Write about your day..."
          className="w-full p-3 rounded-lg border border-zinc-300"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded-full w-full"
      >
        Save Entry
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My Vibe History</h2>
        <div className="space-y-3">
          {history.map((entry, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl text-white ${entry.mood.color}`}
            >
              <div className="font-bold text-lg">{entry.mood.label}</div>
              <div className="text-sm italic">{entry.timestamp}</div>
              <p className="mt-2">{entry.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}