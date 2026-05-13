import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ConfessionForm({ onSubmit }) {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [text, setText] = useState('');

  const charCount = text.length;
  const isOverLimit = charCount >= 280;
  
  const isDisabled = text.trim() === '' || charCount > 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    onSubmit({
      nickname: nickname.trim() || 'Anonymous',
      gender,
      text: text.trim(),
    });
    
    setText('');
    setNickname('');
    setGender('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-warm-200 mb-8 transition-all hover:shadow-2xl">
      <div className="mb-5">
        <label htmlFor="nickname" className="block text-sm font-semibold text-warm-700 mb-2">
          Nickname (Optional)
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Anonymous"
          className="w-full px-4 py-3 rounded-2xl bg-warm-50 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition-all placeholder:text-warm-300"
          maxLength={50}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="gender" className="block text-sm font-semibold text-warm-700 mb-2">
          I am a…
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-warm-50 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition-all text-warm-800 appearance-none cursor-pointer"
        >
          <option value="">Prefer not to say</option>
          <option value="He">He (Male)</option>
          <option value="She">She (Female)</option>
        </select>
      </div>

      <div className="mb-6 relative">
        <label htmlFor="confession" className="block text-sm font-semibold text-warm-700 mb-2">
          Your Confession
        </label>
        <textarea
          id="confession"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's weighing on your soul?"
          className="w-full px-4 py-4 rounded-2xl bg-warm-50 border border-warm-200 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition-all resize-none min-h-[140px] placeholder:text-warm-300 pb-8"
        />
        <div className={`absolute bottom-3 right-4 text-xs font-bold tracking-wider ${isOverLimit ? 'text-red-500' : 'text-warm-400'}`}>
          {charCount} / 280
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isDisabled}
          className="flex items-center gap-2 bg-warm-800 hover:bg-warm-900 text-warm-50 px-8 py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
        >
          <span>Confess</span>
          <Send size={18} />
        </button>
      </div>
    </form>
  );
}
